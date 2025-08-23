import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../../schemas/loginSchema";
import { toast } from "sonner";
import type { LoginSchema } from "../../schemas/loginSchema";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema),
  });

  async function formSubmit(formdata: LoginSchema) {
    console.log(formdata);
    toast.success("Login successful!");
    reset();
  }

  function handlePasswordVisibility() {
    setPasswordVisible((prev) => !prev);
  }

  return (
    <form
      className="w-96 space-y-6 rounded-lg p-4 text-sm shadow-[0px_0px_10px_0px_var(--color-neutral-500)] ring-[0.5px] ring-neutral-900"
      onSubmit={handleSubmit(formSubmit)}
      noValidate
    >
      <h1 className="text-center text-lg font-medium">Login Now</h1>
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
          {...register("email")}
          className={`w-full rounded-md p-1.5 text-center ring-[0.5px] focus-visible:outline-hidden ${errors.email ? "ring-red-500 focus-visible:shadow-[0px_0px_8px_0px_var(--color-red-700)]" : "ring-neutral-900 focus-visible:shadow-[0px_0px_8px_0px_var(--color-neutral-700)]"}`}
        />
      </div>
      <div className="flex w-full flex-col items-center space-y-2">
        <label htmlFor="password" className="w-full">
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
      <div className="flex w-full items-center justify-between text-xs">
        <Link
          to="/auth/register"
          className="underline-offset-1 hover:underline"
        >
          Create new account
        </Link>
        <Link
          to="/auth/forgot-password"
          className="underline-offset-1 hover:underline"
        >
          Forgot Password
        </Link>
      </div>
    </form>
  );
}

export default Login;
