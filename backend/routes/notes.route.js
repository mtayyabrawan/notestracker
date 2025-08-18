import { Router } from "express";
import { body, param, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import asyncWrapper from "../utils/asyncWraper.util.js";
import verifyLogin from "../middlewares/verifyLogin.middleware.js";
import Note from "../models/note.model.js";
import {
  decryptNote,
  decryptNotes,
  encryptNote,
} from "../utils/encryption.util.js";
import User from "../models/user.model.js";

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
        .json({ resStatus: false, error: "No notes found" });
    const decryptedNotes = decryptNotes(notes);
    res.status(200).json({ resStatus: true, notes: decryptedNotes });
  }),
);

notesRouter.delete(
  "/all",
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
        .json({ resStatus: false, error: "Invalid password" });
    await Note.deleteMany({ author: req.user._id }).select(["-author", "-__v"]);
    res
      .status(200)
      .json({ resStatus: true, message: "All notes deleted successfully" });
  }),
);

notesRouter.get(
  "/:id",
  verifyLogin,
  param("id").isMongoId(),
  asyncWrapper(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).json({ resStatus: false, errors: result.array() });
    const note = await Note.findOne({
      author: req.user._id,
      _id: req.params.id,
    }).select(["-author", "-__v"]);
    if (!note)
      return res.status(404).json({ resStatus: false, error: "No note found" });
    const decryptedNote = {
      _id: note._id,
      ...decryptNote(note.title, note.content, note.tag),
      date: note.date,
    };
    res.status(200).json({ resStatus: true, note: decryptedNote });
  }),
);

notesRouter.delete(
  "/:id",
  verifyLogin,
  param("id").isMongoId(),
  asyncWrapper(async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty())
      return res.status(400).json({ resStatus: false, errors: result.array() });
    const note = await Note.findOneAndDelete({
      author: req.user._id,
      _id: req.params.id,
    }).select(["-author", "-__v"]);
    if (!note)
      return res.status(404).json({ resStatus: false, error: "No note found" });
    res
      .status(200)
      .json({ resStatus: true, message: "Note deleted successfully" });
  }),
);

export default notesRouter;
