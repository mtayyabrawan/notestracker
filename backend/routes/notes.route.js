import { Router } from "express";
import { body, validationResult } from "express-validator";

import asyncWrapper from "../utils/asyncWraper.util.js";
import verifyLogin from "../middlewares/verifyLogin.middleware.js";
import Note from "../models/note.model.js";
import { encryptNote } from "../utils/encryption.util.js";

const notesRouter = Router();

notesRouter.post(
  "/create",
  verifyLogin,
  [
    body("title")
      .isString()
      .matches(/^[a-zA-Z0-9 ]+$/)
      .isLength({ min: 1, max: 100 }),
    body("content")
      .isString()
      .matches(/^[a-zA-Z0-9.,!?() ]+$/)
      .isLength({ min: 1, max: 1000 }),
    body("tag")
      .isString()
      .matches(/^[a-zA-Z]+$/)
      .isLength({ min: 1, max: 20 }),
  ],
  asyncWrapper(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).json({ resStatus: false, errors: result.array() });
    const { title, content, tag } = req.body;
    const encrypted = encryptNote(title, content, tag);
    const data = {
      date: new Date().toLocaleString(),
      author: req.user._id,
      ...encrypted,
    };
    await Note.create(data);
    res
      .status(201)
      .json({ resStatus: true, message: "Note created successfully" });
  }),
);

export default notesRouter;
