/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import resetPasswordSchema, {
  type ResetPasswordSchema,
} from "../../schemas/resetPasswordSchema";
import { useNavigate, useParams } from "react-router";
import { isValidJWT } from "zod/v4/core";
import authAPI from "../../api/auth.api";

function ResetPassword() {
  const { resetToken } = useParams();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigator = useNavigate();

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
    const res = await authAPI.resetPassword(formdata, resetToken as string);
    reset();
    if (!res.resStatus) {
      toast.error(res.error);
      return;
    }
    toast.success("Password reset successfully!");
  }

  function handlePasswordVisibility() {
    setPasswordVisible((prev) => !prev);
  }

  useEffect(() => {
    if (!isValidJWT(resetToken as string)) {
      toast.error("Invalid password reset request");
      setTimeout(() => {
        navigator("/");
      }, 2000);
    }
  }, [resetToken]);

  return (
    <form
      className="w-96 space-y-6 rounded-lg p-4 text-sm shadow-[0px_0px_10px_0px_var(--color-neutral-500)] ring-[0.5px] ring-neutral-900"
      onSubmit={handleSubmit(formSubmit)}
      noValidate
    >
      <h1 className="text-center text-lg font-medium">Reset Password</h1>
      <div className="flex w-full flex-col items-center space-y-2">
        <label htmlFor="password" className="w-full">
          New Password
        </label>
        {errors.password && (
          <span className="mx-auto w-[95%] text-right text-[10px] text-red-500">
            {errors.password.message}
          </span>
        )}
        <div className="relative flex h-fit w-full flex-col justify-center">
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
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
      <button
        disabled={isSubmitting}
        className="w-full cursor-pointer rounded-md bg-neutral-900 px-2.5 py-2 font-medium text-neutral-200 shadow-[0px_0px_5px_0px_var(--color-neutral-700)] hover:bg-neutral-800 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:bg-neutral-500"
      >
        Submit
      </button>
    </form>
  );
}

export default ResetPassword;
