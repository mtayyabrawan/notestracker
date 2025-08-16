import { Router } from "express";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { body, validationResult } from "express-validator";

import verifyLogin from "../middlewares/verifyLogin.middleware.js";
import asyncWrapper from "../utils/asyncWraper.util.js";
import User from "../models/user.model.js";
import { encrypt } from "../utils/encryption.util.js";
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
    if (user.twoFA === "enabled" || user.twoFA === "pending")
      return res
        .status(400)
        .json({ resStatus: false, message: "2FA is already enabled" });
    const twoFASecret = speakeasy.generateSecret({
      length: 20,
      name: `Notestaker (${user.email})`,
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

export default twoFARouter;
