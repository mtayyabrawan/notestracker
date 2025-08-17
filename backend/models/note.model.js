import { model, Schema } from "mongoose";

const noteSchema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  date: { type: String, required: true, trim: true },
  tag: { type: String, required: true, trim: true },
  author: { type: Schema.Types.ObjectId, ref: "user" },
});

const Note = model("Note", noteSchema);

export default Note;
