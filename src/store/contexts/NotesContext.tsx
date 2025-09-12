import { createContext } from "react";

const NotesContext = createContext({ notes: [], updateNotes: () => {} });

export default NotesContext;
