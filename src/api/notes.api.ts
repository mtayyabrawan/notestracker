import api_uri from "../constants/getURI.constant";
import type { NoteSchema } from "../schemas/noteSchema";
import type { ResetPasswordSchema } from "../schemas/resetPasswordSchema";
import errohan from "../utils/errohan.util";

async function getNotes() {
  return errohan(`${api_uri}/notes/all`, {
    method: "GET",
    credentials: true,
  });
}

async function deleteNotes(data: ResetPasswordSchema) {
  return errohan(`${api_uri}/notes/all`, {
    method: "DELETE",
    credentials: true,
    body: { password: data.password },
  });
}

async function createNote(data: NoteSchema) {
  return errohan(`${api_uri}/notes/create`, {
    method: "POST",
    credentials: true,
    body: { title: data.title, content: data.content, tag: data.tag },
  });
}

async function updateNote(data: NoteSchema, id: string) {
  return errohan(`${api_uri}/notes/${id}`, {
    method: "PUT",
    credentials: true,
    body: { title: data.title, content: data.content, tag: data.tag },
  });
}

async function getNoteById(id: string) {
  return errohan(`${api_uri}/notes/${id}`, {
    method: "GET",
    credentials: true,
  });
}

async function deleteById(id: string) {
  return errohan(`${api_uri}/notes/${id}`, {
    method: "DELETE",
    credentials: true,
  });
}

const notesAPI = {
  getNotes,
  createNote,
  deleteNotes,
  getNoteById,
  deleteById,
  updateNote,
};

export default notesAPI;
