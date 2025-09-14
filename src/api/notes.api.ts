import api_uri from "../constants/getURI.constant";
import type { NoteSchema } from "../schemas/noteSchema";
import errohan from "../utils/errohan.util";

async function getNotes() {
  return errohan(`${api_uri}/notes/all`, {
    method: "GET",
    credentials: true,
  });
}

async function createNote(data: NoteSchema) {
  return errohan(`${api_uri}/notes/create`, {
    method: "POST",
    credentials: true,
    body: { title: data.title, content: data.content, tag: data.tag },
  });
}

const notesAPI = { getNotes, createNote };

export default notesAPI;
