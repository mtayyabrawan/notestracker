import { createContext } from "react";

const NotesContext = createContext<{
  notes: {
    _id: string;
    title: string;
    content: string;
    tag: string;
    date: string;
  }[];
  updateNotes: () => void;
}>({ notes: [], updateNotes: () => {} });

export default NotesContext;
