import { Router } from "express";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { body, validationResult } from "express-validator";

import verifyLogin from "../middlewares/verifyLogin.middleware.js";
import asyncWrapper from "../utils/asyncWraper.util.js";
import User from "../models/user.model.js";
import { decrypt, encrypt } from "../utils/encryption.util.js";
import TwoFA from "../models/2FA.model.js";

const twoFARouter = Router();

twoFARouter.post(
  "/enable",
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
    const user = await User.findById(req.user.id);
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword)
      return res
        .status(401)
        .json({ resStatus: false, message: "Invalid password" });
    if (user.twoFA === "enabled")
      return res
        .status(400)
        .json({ resStatus: false, message: "2FA is already enabled" });
    if (user.twoFA === "pending") {
      const user2FA = await TwoFA.findOne({ userId: user._id });
      const decryptedSecret = decrypt(user2FA.secret);
      const otpAuthURL = speakeasy.otpauthURL({
        secret: decryptedSecret,
        label: `Notestaker (${user.email})`,
        issuer: "Notestaker",
        encoding: "base32",
      });
      const qrcodeUrl = await qrcode.toDataURL(otpAuthURL);
      return res.status(200).json({ resStatus: true, qrcodeUrl });
    }
    const twoFASecret = speakeasy.generateSecret({
      length: 20,
      name: `Notestaker (${user.email})`,
      issuer: "Notestaker",
    });
    const encryptedSecret = encrypt(twoFASecret.base32);
    user.twoFA = "pending";
    await TwoFA.create({
      userId: user._id,
      secret: encryptedSecret,
    });
    await user.save();
    const qrcodeUrl = await qrcode.toDataURL(twoFASecret.otpauth_url);
    res.status(200).json({ resStatus: true, qrcodeUrl });
  }),
);

twoFARouter.post(
  "/verify-2fa",
  verifyLogin,
  body("otpCode")
    .isNumeric({ no_symbols: true })
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP code must be a 6-digit number"),
  asyncWrapper(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).json({ resStatus: false, errors: result.array() });
    const user = await User.findById(req.user.id);
    if (user.twoFA === "enabled")
      return res
        .status(400)
        .json({ resStatus: false, message: "2FA is already enabled" });
    if (user.twoFA === "disabled")
      return res
        .status(400)
        .json({ resStatus: false, message: "2FA is not enabled" });
    const { otpCode } = req.body;
    const user2FA = await TwoFA.findOne({ userId: user._id });
    const decryptedSecret = decrypt(user2FA.secret);
    const verified = speakeasy.totp.verify({
      secret: decryptedSecret,
      encoding: "base32",
      token: otpCode,
    });
    if (!verified)
      return res
        .status(400)
        .json({ resStatus: false, message: "Invalid OTP code" });
    user.twoFA = "enabled";
    user2FA.status = "verified";
    await user2FA.save();
    await user.save();
    res
      .status(200)
      .json({ resStatus: true, message: "2FA enabled successfully" });
  }),
);

twoFARouter.post(
  "/disable",
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
    const user = await User.findById(req.user.id);
    if (user.twoFA === "disabled")
      return res
        .status(400)
        .json({ resStatus: false, message: "2FA is already disabled" });
    const { password } = req.body;
    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword)
      return res
        .status(401)
        .json({ resStatus: false, message: "Invalid password" });
    user.twoFA = "disabled";
    await TwoFA.findOneAndDelete({ userId: user._id });
    await user.save();
    res
      .status(200)
      .json({ resStatus: true, message: "2FA disabled successfully" });
  }),
);

export default twoFARouter;
