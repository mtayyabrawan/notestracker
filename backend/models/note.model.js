import { model, Schema } from "mongoose";

const noteSchema = new Schema({
  title: { type: Object, required: true },
  content: { type: Object, required: true },
  tag: { type: Object, required: true },
  date: { type: String, required: true, trim: true },
  author: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

const Note = model("Note", noteSchema);

export default Note;
