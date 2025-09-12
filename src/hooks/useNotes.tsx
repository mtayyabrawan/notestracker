import { useContext } from "react";
import NotesContext from "../store/contexts/NotesContext";

function useNotes() {
  return useContext(NotesContext);
}

export default useNotes;
