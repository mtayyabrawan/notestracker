import NoteCard from "../../components/NoteCard";
import useNotes from "../../hooks/useNotes";

function Notes() {
  const { notes } = useNotes();
  return (
    <div className="h-full w-full space-y-4 p-4">
      <h1 className="text-center text-xl font-medium">Your Notes</h1>
      {notes.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-5 gap-y-10 pt-10 pb-20">
          {notes.map((note) => (
            <NoteCard key={note._id} id={note._id} />
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-20">
          <h1 className="w-full text-center text-xl font-medium text-amber-700">
            Your notes directry is empty
          </h1>
        </div>
      )}
    </div>
  );
}

export default Notes;
