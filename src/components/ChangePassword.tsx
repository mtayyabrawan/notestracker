import { useState, type MouseEvent } from "react";
import authAPI from "../api/auth.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import changePasswordSchema, {
  type ChangePasswordSchema,
} from "../schemas/changePasswordSchema";
import { toast } from "sonner";
import { Link } from "react-router";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

function ChangePassword() {
  const [passwordVisible, setPasswordVisible] = useState({
    curr: false,
    new: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { password: "", newPassword: "" },
    resolver: zodResolver(changePasswordSchema),
  });

  function handlePasswordVisibility(e: MouseEvent) {
    const changed = e.currentTarget.classList.contains("curr") ? "curr" : "new";
    setPasswordVisible((prev) => {
      return { ...passwordVisible, [changed]: !prev[changed] };
    });
  }

  async function formSubmit(data: ChangePasswordSchema) {
    const res = await authAPI.changePassword(data);
    reset();
    if (!res.resStatus) {
      toast.error(res.error);
      return;
    }
    toast.success("Password changed successfully!");
  }

  return (
    <div className="space-y-8 p-4">
      <h2 className="text-sm font-medium text-neutral-700">Change Password</h2>
      <div className="flex justify-between">
        <div className="w-1/2 px-4 py-6 text-justify text-xs leading-loose">
          You can change your password whenever you want. While changing
          password use strong password and new password should not be equal to
          your current password.
        </div>
        <form
          className="w-[30%] space-y-4"
          noValidate
          onSubmit={handleSubmit(formSubmit)}
        >
          <div className="flex w-full flex-col items-center space-y-2 text-xs">
            <label htmlFor="password" className="w-full">
              Current Password
            </label>
            {errors.password && (
              <span className="mx-auto w-[95%] text-right text-[10px] text-red-500">
                {errors.password.message}
              </span>
            )}
            <div className="relative flex h-fit w-full flex-col justify-center">
              <input
                type={passwordVisible.curr ? "text" : "password"}
                id="password"
                autoComplete="off"
                {...register("password")}
                className={`w-full rounded-md p-1.5 text-center ring-[0.5px] focus-visible:outline-hidden ${errors.password ? "ring-red-500 focus-visible:shadow-[0px_0px_8px_0px_var(--color-red-700)]" : "ring-neutral-900 focus-visible:shadow-[0px_0px_8px_0px_var(--color-neutral-700)]"}`}
              />
              {passwordVisible.curr ? (
                <IconEye
                  className="curr absolute right-1.5 h-4 cursor-pointer"
                  onClick={handlePasswordVisibility}
                />
              ) : (
                <IconEyeOff
                  className="curr absolute right-1.5 h-4 cursor-pointer"
                  onClick={handlePasswordVisibility}
                />
              )}
            </div>
          </div>
          <div className="flex w-full flex-col items-center space-y-2 text-xs">
            <label htmlFor="newPassword" className="w-full">
              New Password
            </label>
            {errors.newPassword && (
              <span className="mx-auto w-[95%] text-right text-[10px] text-red-500">
                {errors.newPassword.message}
              </span>
            )}
            <div className="relative flex h-fit w-full flex-col justify-center">
              <input
                type={passwordVisible.new ? "text" : "password"}
                id="newPassword"
                autoComplete="new-password"
                {...register("newPassword")}
                className={`w-full rounded-md p-1.5 text-center ring-[0.5px] focus-visible:outline-hidden ${errors.newPassword ? "ring-red-500 focus-visible:shadow-[0px_0px_8px_0px_var(--color-red-700)]" : "ring-neutral-900 focus-visible:shadow-[0px_0px_8px_0px_var(--color-neutral-700)]"}`}
              />
              {passwordVisible.new ? (
                <IconEye
                  className="new absolute right-1.5 h-4 cursor-pointer"
                  onClick={handlePasswordVisibility}
                />
              ) : (
                <IconEyeOff
                  className="new absolute right-1.5 h-4 cursor-pointer"
                  onClick={handlePasswordVisibility}
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 px-2">
            <Link
              to="/auth/forgot-password"
              className="text-xs underline-offset-2 hover:underline"
            >
              Forgot password?
            </Link>
            <button
              disabled={isSubmitting}
              className="w-fit cursor-pointer rounded-md bg-neutral-900 px-2 py-1.5 text-[0.65rem] font-medium text-neutral-200 shadow-[0px_0px_5px_0px_var(--color-neutral-700)] hover:bg-neutral-800 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:bg-neutral-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
