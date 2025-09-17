import { Router } from "express";
import { body, param, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import asyncWrapper from "../utils/asyncWraper.util.js";
import mailor from "../utils/mailor.util.js";
import {
  gen2FALoginToken,
  genLoginToken,
  genResetToken,
  genVerificationToken,
} from "../utils/tokenGen.util.js";
import {
  verifyResetToken,
  verifyValidationToken,
} from "../utils/verifyTokens.util.js";
import verifyLogin from "../middlewares/verifyLogin.middleware.js";
import TwoFA from "../models/2FA.model.js";
import BackupCode from "../models/backupCode.model.js";
import Note from "../models/note.model.js";
import cloudinary from "../utils/cloudinary.util.js";
import uploadSingleAvatar from "../middlewares/upload.middleware.js";

const baseUrl = process.env.BASE_URL;
const cloudinaryFolder = process.env.CLOUDINARY_FOLDER;

const authRouter = Router();

authRouter.post(
  "/register",
  [
    body("name")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Name must contain only letters and spaces"),
    body("username")
      .matches(/^[a-z0-9]+$/)
      .withMessage("Username must be lowercase alphanumeric"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 4,
        minUppercase: 1,
        minNumbers: 2,
        minSymbols: 1,
      })
      .withMessage(
        "Password must be at least 8 characters long consisting of at least 4 lowercase letters, 1 uppercase letter, 2 numbers, and 1 symbol",
      ),
    body("gender")
      .isIn(["male", "female"])
      .withMessage("Gender must be male or female"),
    body("birthdate").isString().withMessage("Invalid birthdate format"),
  ],
  asyncWrapper(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).json({ resStatus: false, errors: result.array() });
    const { name, username, email, password, gender, birthdate } = req.body;
    const data = { name, username, email, password, gender, birthdate };
    const userExist = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (userExist)
      return res
        .status(409)
        .json({ resStatus: false, error: "User already exists" });
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    data.password = hashedPassword;
    const newUser = await User.create(data);
    res
      .status(200)
      .json({ resStatus: true, message: "Your account created successfully" });
  }),
);

authRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 4,
        minUppercase: 1,
        minNumbers: 2,
        minSymbols: 1,
      })
      .withMessage(
        "Password must be at least 8 characters long consisting of at least 4 lowercase letters, 1 uppercase letter, 2 numbers, and 1 symbol",
      ),
  ],
  asyncWrapper(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).json({ resStatus: false, errors: result.array() });
    const { email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (!userExist)
      return res
        .status(400)
        .json({ resStatus: false, error: "User not found" });
    const comparePassword = bcrypt.compareSync(password, userExist.password);
    if (!comparePassword)
      return res
        .status(400)
        .json({ resStatus: false, error: "Invalid credentials provided" });
    if (!userExist.isVerified) {
      const validationToken = genVerificationToken(userExist._id.toString());
      return mailor.sendMail(
        {
          from: process.env.GMAIL_USER,
          to: userExist.email,
          subject: "Verify your email",
          html: `<p>Please verify your email by clicking on the following link: ${baseUrl}/auth/verify-email/${validationToken}<br>This link expires in 1 Day<p>`,
        },
        (error, msg) => {
          if (error)
            return res
              .status(500)
              .json({ resStatus: false, error: error.message });
          return res.json({
            resStatus: false,
            error:
              "Your account not verified. verify it by clicking the link sent to your email now",
          });
        },
      );
    }
    if (userExist.twoFA === "enabled") {
      const notestraker_2fa_login_token = gen2FALoginToken(
        userExist._id.toString(),
      );
      res.cookie("notestraker_2fa_login_token", notestraker_2fa_login_token, {
        httpOnly: true,
        secure: true,
      });
      return res.status(200).json({
        resStatus: true,
        twoFA: true,
        message: "Enter OTP for 2FA using your authenticator app",
      });
    }
    const notestraker_login_token = genLoginToken(
      userExist._id.toString(),
      userExist.email,
    );
    res.cookie("notestraker_login_token", notestraker_login_token, {
      httpOnly: true,
      secure: true,
    });
    res
      .status(200)
      .json({ resStatus: true, twoFA: false, message: "Login successful" });
  }),
);

authRouter.get(
  "/verify-email/:token",
  param("token").isJWT().withMessage("Token is required"),
  asyncWrapper(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).json({ resStatus: false, errors: result.array() });
    const { token } = req.params;
    const decoded = verifyValidationToken(token);
    if (!decoded || decoded instanceof Error) {
      return res.status(400).json({ resStatus: false, error: "Invalid token" });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(404)
        .json({ resStatus: false, error: "User not found" });
    }
    if (user.isVerified)
      return res
        .status(400)
        .json({ resStatus: false, error: "User already verified" });
    user.isVerified = true;
    await user.save();
    res
      .status(200)
      .json({ resStatus: true, message: "Email verified successfully" });
  }),
);

authRouter.get(
  "/logout",
  verifyLogin,
  asyncWrapper(async (req, res) => {
    res.clearCookie("notestraker_login_token");
    res.status(200).json({ resStatus: true, message: "Logout successful" });
  }),
);

authRouter.delete(
  "/delete-account",
  verifyLogin,
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 4,
      minUppercase: 1,
      minNumbers: 2,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 8 characters long consisting of at least 4 lowercase letters, 1 uppercase letter, 2 numbers, and 1 symbol",
    ),
  asyncWrapper(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).json({ resStatus: false, errors: result.array() });
    const { password } = req.body;
    const userId = req.user.id;
    const user = await User.findById(req.user.id);
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword)
      return res
        .status(401)
        .json({ resStatus: false, error: "Invalid password" });
    await TwoFA.findOneAndDelete({ userId: userId });
    await BackupCode.findOneAndDelete({ userId: userId });
    await Note.deleteMany({ author: userId });
    await User.findByIdAndDelete(userId);
    res.clearCookie("notestraker_login_token");
    res
      .status(200)
      .json({ resStatus: true, message: "Account deleted successfully" });
  }),
);

authRouter.post(
  "/forgot-password",
  body("email").isEmail().withMessage("Invalid email format"),
  asyncWrapper(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).json({ resStatus: false, errors: result.array() });
    const { email } = req.body;
    const userExist = await User.findOne({ email: email });
    if (!userExist)
      return res
        .status(404)
        .json({ resStatus: false, error: "User not found" });
    const resetToken = genResetToken(userExist.email);
    return mailor.sendMail(
      {
        to: userExist.email,
        subject: "Reset your password",
        html: `<p>Please reset your password by clicking on the following link: <a href="${baseUrl}/auth/reset-password/${resetToken}">Reset Password</a><br>This Link Expires in 1 Hour</p>`,
      },
      (error, msg) => {
        if (error)
          return res
            .status(500)
            .json({ resStatus: false, error: error.message });
        return res.json({
          resStatus: true,
          message:
            "Password reset link sent to your email. Please check your inbox.",
        });
      },
    );
  }),
);

authRouter.post(
  "/reset-password/:token",
  [
    param("token").isJWT().withMessage("Token is required"),
    body("password")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 4,
        minUppercase: 1,
        minNumbers: 2,
        minSymbols: 1,
      })
      .withMessage(
        "Password must be at least 8 characters long consisting of at least 4 lowercase letters, 1 uppercase letter, 2 numbers, and 1 symbol",
      ),
  ],
  asyncWrapper(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).json({ resStatus: false, errors: result.array() });
    const { token } = req.params;
    const { password } = req.body;
    const decoded = verifyResetToken(token);
    if (!decoded || decoded instanceof Error) {
      return res.status(400).json({ resStatus: false, error: "Invalid token" });
    }
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res
        .status(404)
        .json({ resStatus: false, error: "User not found" });
    }
    const compareOldPassword = bcrypt.compareSync(password, user.password);
    if (compareOldPassword) {
      return res.status(400).json({
        resStatus: false,
        error: "New password cannot be same as old password",
      });
    }
    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await user.save();
    res
      .status(200)
      .json({ resStatus: true, message: "Password reset successful" });
  }),
);

authRouter.post(
  "/change-password",
  verifyLogin,
  [
    body("oldPassword")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 4,
        minUppercase: 1,
        minNumbers: 2,
        minSymbols: 1,
      })
      .withMessage(
        "Old Password must be at least 8 characters long consisting of at least 4 lowercase letters, 1 uppercase letter, 2 numbers, and 1 symbol",
      ),
    body("newPassword")
      .isStrongPassword({
        minLength: 8,
        minLowercase: 4,
        minUppercase: 1,
        minNumbers: 2,
        minSymbols: 1,
      })
      .withMessage(
        "New Password must be at least 8 characters long consisting of at least 4 lowercase letters, 1 uppercase letter, 2 numbers, and 1 symbol",
      ),
  ],
  asyncWrapper(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).json({ resStatus: false, errors: result.array() });
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    const compareOldPassword = bcrypt.compareSync(oldPassword, user.password);
    const compareNewPassword = bcrypt.compareSync(newPassword, user.password);
    if (!compareOldPassword)
      return res
        .status(401)
        .json({ resStatus: false, error: "Invalid current password" });
    if (compareNewPassword)
      return res.status(400).json({
        resStatus: false,
        error: "New password cannot be same as current password",
      });
    user.password = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
    await user.save();
    res
      .status(200)
      .json({ resStatus: true, message: "Password changed successfully" });
  }),
);

authRouter.post(
  "/upload-profile-picture",
  verifyLogin,
  uploadSingleAvatar,
  asyncWrapper(async (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ resStatus: false, error: "No file uploaded" });
    }
    const user = await User.findById(req.user.id);
    cloudinary.uploader
      .upload_stream(
        {
          folder: cloudinaryFolder,
          resource_type: "image",
          public_id: user.username,
        },
        async (error, result) => {
          if (error) {
            console.log(error);
            return res
              .status(500)
              .json({ resStatus: false, error: "Upload failed" });
          }
          user.profilePicture = result.secure_url;
          await user.save();
          res.status(200).json({
            resStatus: true,
            message: "Profile picture uploaded successfully",
          });
        },
      )
      .end(req.file.buffer);
  }),
);

authRouter.delete(
  "/profile-picture",
  verifyLogin,
  asyncWrapper(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user.profilePicture)
      return res
        .status(400)
        .json({ resStatus: false, error: "No profile picture found" });
    cloudinary.uploader.destroy(
      `${cloudinaryFolder}/${user.username}`,
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ resStatus: false, error: "Delete failed" });
        }
        user.profilePicture =
          "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg";
        user.save();
        res.status(200).json({
          resStatus: true,
          message: "Profile picture deleted successfully",
        });
      },
    );
  }),
);

authRouter.get(
  "/get-login",
  verifyLogin,
  asyncWrapper(async (req, res) => {
    const userData = await User.findById(req.user.id).select([
      "-__v",
      "-_id",
      "-password",
    ]);
    res.status(200).json({ resStatus: true, userData });
  }),
);

export default authRouter;
