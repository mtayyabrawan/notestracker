import { Router } from "express";
import { body, validationResult } from "express-validator";

import asyncWrapper from "../utils/asyncWraper.util.js";
import verifyLogin from "../middlewares/verifyLogin.middleware.js";
import Note from "../models/note.model.js";
import { decryptNotes, encryptNote } from "../utils/encryption.util.js";

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

notesRouter.get(
  "/all",
  verifyLogin,
  asyncWrapper(async (req, res) => {
    const notes = await Note.find({ author: req.user._id }).select([
      "-author",
      "-__v",
    ]);
    if (!notes.length)
      return res
        .status(404)
        .json({ resStatus: false, message: "No notes found" });
    const decryptedNotes = decryptNotes(notes);
    res.status(200).json({ resStatus: true, notes: decryptedNotes });
  }),
);

export default notesRouter;
