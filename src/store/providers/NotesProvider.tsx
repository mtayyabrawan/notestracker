import React, { useEffect, useState } from "react";
import NotesContext from "../contexts/NotesContext";
import notesAPI from "../../api/notes.api";

function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    updateNotes();
  }, []);

  async function updateNotes() {
    const res = await notesAPI.getNotes();
    if (!res.resStatus) {
      setNotes([]);
      return;
    }
    setNotes(res.notes);
  }

  return (
    <NotesContext.Provider value={{ notes, updateNotes }}>
      {children}
    </NotesContext.Provider>
  );
}

export default NotesProvider;
