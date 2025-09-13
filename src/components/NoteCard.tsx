import { useState } from "react";
import useNotes from "../hooks/useNotes";
import { Link } from "react-router";

function NoteCard({ id }: { id: string }) {
  const { notes } = useNotes();

  const [currNote] = useState<{
    _id: string;
    title: string;
    content: string;
    tag: string;
    date: string;
  }>(notes.filter((note) => note._id === id)[0]);

  return (
    <div className="relative h-64 w-full rounded-md bg-neutral-300 shadow-[0px_0px_10px_1px_var(--color-neutral-500)] hover:shadow-[0px_0px_10px_2px_var(--color-neutral-500)]">
      <Link
        to={currNote._id}
        className="block w-full rounded-t-md bg-neutral-800 p-2 text-sm font-medium text-neutral-300"
      >
        {currNote.title.slice(0, 50)}
      </Link>
      <p className="h-[75%] overflow-hidden p-3 text-justify text-sm leading-loose text-pretty">
        {currNote.content.slice(0, 350)}
      </p>
      <span className="absolute top-9 right-0 rounded-bl-md bg-neutral-800 px-1.5 pb-0.5 text-xs text-neutral-300">
        {currNote.tag}
      </span>
      <span className="absolute right-1 bottom-1 text-[0.65rem] text-neutral-600">
        {currNote.date}
      </span>
    </div>
  );
}

export default NoteCard;
