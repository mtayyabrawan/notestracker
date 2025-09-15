import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useNotes from "../hooks/useNotes";
import { noteSchema, type NoteSchema } from "../schemas/noteSchema";
import notesAPI from "../api/notes.api";
import { toast } from "sonner";
import { IconCircleXFilled } from "@tabler/icons-react";

function UpdateNote({
  note,
  handleModal,
}: {
  note: {
    _id: string;
    title: string;
    content: string;
    tag: string;
    date: string;
  };
  handleModal: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: { title: note.title, tag: note.tag, content: note.content },
  });

  const { updateNotes } = useNotes();

  async function formSubmit(formdata: NoteSchema) {
    const res = await notesAPI.updateNote(formdata, note._id);
    reset();
    if (!res.resStatus) {
      toast.error(res.error);
      return;
    }
    toast.success("Note updated successfully");
    updateNotes();
    handleModal();
  }
  return (
    <div className="fixed top-0 left-1/2 z-50 h-full w-full max-w-[1540px] -translate-x-1/2 bg-neutral-100/30 backdrop-blur-[1px]">
      <form
        className="relative mx-auto mt-32 h-fit w-1/2 space-y-4 rounded-md bg-neutral-200 p-4 text-xs ring-[1px]"
        noValidate
        onSubmit={handleSubmit(formSubmit)}
      >
        <IconCircleXFilled
          size={28}
          className="absolute top-1 right-1 cursor-pointer hover:text-red-600"
          onClick={handleModal}
        />
        <h2 className="text-center text-base font-medium">Update Note</h2>
        <div className="flex w-full flex-col items-center space-y-2">
          <label htmlFor="title" className="w-full">
            Title
          </label>
          {errors.title && (
            <span className="mx-auto w-[95%] text-right text-[10px] text-red-500">
              {errors.title.message}
            </span>
          )}
          <input
            type="text"
            id="title"
            autoComplete="off"
            {...register("title")}
            autoFocus
            className={`w-full rounded-md p-1.5 text-center ring-[0.5px] focus-visible:outline-hidden ${errors.title ? "ring-red-500 focus-visible:shadow-[0px_0px_8px_0px_var(--color-red-700)]" : "ring-neutral-900 focus-visible:shadow-[0px_0px_8px_0px_var(--color-neutral-700)]"}`}
          />
        </div>
        <div className="flex w-full flex-col items-center space-y-2">
          <label htmlFor="tag" className="w-full">
            Tag
          </label>
          {errors.tag && (
            <span className="mx-auto w-[95%] text-right text-[10px] text-red-500">
              {errors.tag.message}
            </span>
          )}
          <input
            type="text"
            id="tag"
            autoComplete="off"
            {...register("tag")}
            className={`w-full rounded-md p-1.5 text-center ring-[0.5px] focus-visible:outline-hidden ${errors.tag ? "ring-red-500 focus-visible:shadow-[0px_0px_8px_0px_var(--color-red-700)]" : "ring-neutral-900 focus-visible:shadow-[0px_0px_8px_0px_var(--color-neutral-700)]"}`}
          />
        </div>
        <div className="flex w-full flex-col items-center space-y-2">
          <label htmlFor="content" className="w-full">
            Content
          </label>
          {errors.content && (
            <span className="mx-auto w-[95%] text-right text-[10px] text-red-500">
              {errors.content.message}
            </span>
          )}
          <textarea
            id="content"
            autoComplete="off"
            {...register("content")}
            className={`h-36 w-full resize-none rounded-md p-1.5 text-justify ring-[0.5px] focus-visible:outline-hidden ${errors.content ? "ring-red-500 focus-visible:shadow-[0px_0px_8px_0px_var(--color-red-700)]" : "ring-neutral-900 focus-visible:shadow-[0px_0px_8px_0px_var(--color-neutral-700)]"}`}
          ></textarea>
        </div>
        <button
          disabled={isSubmitting}
          className="w-full cursor-pointer rounded-md bg-neutral-900 px-2.5 py-2 font-medium text-neutral-200 shadow-[0px_0px_5px_0px_var(--color-neutral-700)] hover:bg-neutral-800 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:bg-neutral-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdateNote;
