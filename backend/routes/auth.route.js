import { Router } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import asyncWrapper from "../utils/asyncWraper.util.js";

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
    const userExist = await User.findOne({ username: username, email: email });
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

export default authRouter;
