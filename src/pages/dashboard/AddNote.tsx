import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import noteSchema, { type NoteSchema } from "../../schemas/noteSchema";

function AddNote() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: { title: "", tag: "", content: "" },
  });
  async function formSubmit(data: NoteSchema) {
    console.log(data);
  }
  return (
    <div className="mb-10 h-full w-full space-y-6 p-4">
      <h1 className="text-center text-xl font-medium">Create a new note</h1>
      <form
        className="mx-auto w-1/2 space-y-6 rounded-lg p-4 text-sm shadow-[0px_0px_10px_0px_var(--color-neutral-500)] ring-[0.5px] ring-neutral-900"
        noValidate
        onSubmit={handleSubmit(formSubmit)}
      >
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

export default AddNote;
