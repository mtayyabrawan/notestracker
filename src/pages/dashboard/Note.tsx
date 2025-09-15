/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import notesAPI from "../../api/notes.api";
import Loader from "../../components/Loader";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import useNotes from "../../hooks/useNotes";

function Note() {
  const { noteSlug } = useParams();

  const [loading, setLoading] = useState(true);

  const [note, setNote] = useState<{
    _id: string;
    title: string;
    content: string;
    tag: string;
    date: string;
  }>({
    _id: "",
    title: "",
    content: "",
    tag: "",
    date: "",
  });

  const { updateNotes } = useNotes();

  const navigator = useNavigate();

  useEffect(() => {
    notesAPI.getNoteById(noteSlug as string).then((res) => {
      if (!res.resStatus) {
        toast.error(res.error);
        setTimeout(() => {
          navigator("/dashboard/notes");
        }, 3000);
        return;
      }
      setNote(res.note);
      setLoading(false);
    });
  }, [noteSlug]);

  async function handleDelete() {
    const res = await notesAPI.deleteById(note._id);
    if (!res.resStatus) {
      toast.error(res.error);
      return;
    }
    toast.success("Note deleted successfully!");
    updateNotes();
    setTimeout(() => {
      navigator("/dashboard/notes");
    });
  }

  return loading ? (
    <Loader />
  ) : (
    <div className="h-full w-full space-y-6 p-4">
      <h1 className="text-center text-xl font-medium">{note.title}</h1>
      <div className="flex items-center justify-between px-5">
        <p className="rounded-sm bg-neutral-500 px-2 py-1 text-sm font-medium text-neutral-100">
          {note.tag}
        </p>
        <p className="text-xs text-neutral-700">{note.date}</p>
      </div>
      <div className="px-6 text-justify leading-loose text-pretty">
        {note.content}
      </div>
      <div className="grid grid-cols-4 grid-rows-1 px-20 py-10">
        <div className="flex items-center justify-center">
          <Link
            to={`/dashboard/notes/`}
            className="inline-block rounded-md bg-neutral-800 px-2 py-1 text-xs font-medium text-neutral-100 hover:bg-neutral-900"
          >
            <IconArrowLeft size={18} />
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="cursor-pointer rounded-md bg-red-500 px-2 py-1 text-xs font-medium text-neutral-100 hover:bg-red-600 focus-visible:outline-hidden"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button className="cursor-pointer rounded-md bg-green-500 px-2 py-1 text-xs font-medium text-neutral-100 hover:bg-green-600 focus-visible:outline-hidden">
            Update
          </button>
        </div>
        <div className="flex items-center justify-center">
          <Link
            to={`/dashboard/notes/`}
            className="inline-block rounded-md bg-neutral-800 px-2 py-1 text-xs font-medium text-neutral-100 hover:bg-neutral-900"
          >
            <IconArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Note;
