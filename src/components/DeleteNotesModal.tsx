import { useState } from "react";
import { toast } from "sonner";
import type { ResetPasswordSchema } from "../schemas/resetPasswordSchema";
import resetPasswordSchema from "../schemas/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import notesAPI from "../api/notes.api";
import useNotes from "../hooks/useNotes";

function DeleteNotesModal({ handleModal }: { handleModal: () => void }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { updateNotes } = useNotes();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: { password: "" },
    resolver: zodResolver(resetPasswordSchema),
  });

  async function formSubmit(formdata: ResetPasswordSchema) {
    const res = await notesAPI.deleteNotes(formdata);
    reset();
    if (!res.resStatus) {
      toast.error(res.error);
      return;
    }
    handleModal();
    toast.success("All notes deleted successfully!");
    updateNotes();
  }

  function handlePasswordVisibility() {
    setPasswordVisible((prev) => !prev);
  }

  return (
    <div className="fixed top-0 left-1/2 h-full w-full max-w-[1540px] -translate-x-1/2 bg-neutral-100/30 backdrop-blur-[1px]">
      <form
        className="mx-auto mt-32 h-fit w-[30%] space-y-4 rounded-md bg-neutral-200 p-4 text-xs ring-[1px]"
        noValidate
        onSubmit={handleSubmit(formSubmit)}
      >
        <h3 className="text-center text-sm font-medium text-red-500">
          Delete Notes
        </h3>
        <div className="flex w-full flex-col items-center space-y-3">
          <label htmlFor="delnPassword" className="w-full">
            Password
          </label>
          {errors.password && (
            <span className="mx-auto w-[95%] text-right text-[10px] text-red-500">
              {errors.password.message}
            </span>
          )}
          <div className="relative flex h-fit w-full flex-col justify-center">
            <input
              type={passwordVisible ? "text" : "password"}
              id="delnPassword"
              autoComplete="off"
              {...register("password")}
              className={`w-full rounded-md p-1.5 text-center ring-[0.5px] focus-visible:outline-hidden ${errors.password ? "ring-red-500 focus-visible:shadow-[0px_0px_8px_0px_var(--color-red-700)]" : "ring-neutral-900 focus-visible:shadow-[0px_0px_8px_0px_var(--color-neutral-700)]"}`}
            />
            {passwordVisible ? (
              <IconEye
                className="absolute right-1.5 h-4 cursor-pointer"
                onClick={handlePasswordVisibility}
              />
            ) : (
              <IconEyeOff
                className="absolute right-1.5 h-4 cursor-pointer"
                onClick={handlePasswordVisibility}
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 px-2">
          <button
            onClick={handleModal}
            className="w-fit cursor-pointer rounded-md bg-neutral-900 px-2 py-1.5 text-[0.65rem] font-medium text-neutral-200 shadow-[0px_0px_5px_0px_var(--color-neutral-700)] hover:bg-neutral-800 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:bg-neutral-500"
          >
            Cancel
          </button>
          <button
            disabled={isSubmitting}
            className="w-fit cursor-pointer rounded-md bg-red-600 px-2 py-1.5 text-[0.65rem] font-medium text-neutral-200 shadow-[0px_0px_5px_0px_var(--color-red-700)] hover:bg-red-500 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:bg-red-400"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeleteNotesModal;
