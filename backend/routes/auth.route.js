import { Router } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import asyncWrapper from "../utils/asyncWraper.util.js";
import mailor from "../utils/mailor.util.js";
import { genLoginToken, genVerificationToken } from "../utils/tokenGen.util.js";

const baseUrl = process.env.BASE_URL;

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
          text: `Please verify your email by clicking on the following link: ${baseUrl}/auth/verify-email/${validationToken}`,
        },
        (error, msg) => {
          if (error)
            return res
              .status(500)
              .json({ resStatus: false, error: error.message });
          return res.json({
            resStatus: true,
            message:
              "Your account not verified. verify it by clicking the link sent to your email now",
          });
        },
      );
    }
    const notestraker_login_token = genLoginToken(
      userExist._id.toString(),
      userExist.email,
    );
    res.cookie("notestraker_login_token", notestraker_login_token, {
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({ resStatus: true, message: "Login successful" });
  }),
);

export default authRouter;
