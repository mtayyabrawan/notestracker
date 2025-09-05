import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import forgotPasswordSchema, {
  type ForgotPasswordSchema,
} from "../../schemas/forgotPasswordSchema";
import authAPI from "../../api/auth.api";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function formSubmit(formdata: ForgotPasswordSchema) {
    const res = await authAPI.forgotPassword(formdata);
    if (!res.resStatus) {
      toast.error(res.error);
      return;
    }
    toast.success("Password reset link sent to your email");
    reset();
  }

  return (
    <form
      className="w-96 space-y-6 rounded-lg p-4 text-sm shadow-[0px_0px_10px_0px_var(--color-neutral-500)] ring-[0.5px] ring-neutral-900"
      onSubmit={handleSubmit(formSubmit)}
      noValidate
    >
      <h1 className="text-center text-lg font-medium">Forgot Password</h1>
      <div className="flex w-full flex-col items-center space-y-2">
        <label htmlFor="email" className="w-full">
          Email
        </label>
        {errors.email && (
          <span className="mx-auto w-[95%] text-right text-[10px] text-red-500">
            {errors.email.message}
          </span>
        )}
        <input
          type="email"
          id="email"
          autoComplete="off"
          placeholder="Enter your registered email"
          {...register("email")}
          className={`w-full rounded-md p-1.5 text-center ring-[0.5px] focus-visible:outline-hidden ${errors.email ? "ring-red-500 focus-visible:shadow-[0px_0px_8px_0px_var(--color-red-700)]" : "ring-neutral-900 focus-visible:shadow-[0px_0px_8px_0px_var(--color-neutral-700)]"}`}
        />
      </div>
      <button
        disabled={isSubmitting}
        className="w-full cursor-pointer rounded-md bg-neutral-900 px-2.5 py-2 font-medium text-neutral-200 shadow-[0px_0px_5px_0px_var(--color-neutral-700)] hover:bg-neutral-800 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:bg-neutral-500"
      >
        Submit
      </button>
    </form>
  );
}

export default ForgotPassword;
