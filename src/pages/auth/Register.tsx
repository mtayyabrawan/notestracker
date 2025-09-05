import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";
import registerSchema, {
  type RegisterSchema,
} from "../../schemas/registerSchema";
import authAPI from "../../api/auth.api";

function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigator = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      gender: "male" as const,
      birthdate: "",
    },
  });

  async function formSubmit(formdata: RegisterSchema) {
    const res = await authAPI.registerUser(formdata);
    reset();
    if (!res.resStatus) {
      toast.error(res.error);
      return;
    }
    toast.success("Registration successful!");
    navigator("/auth/login");
  }

  function handlePasswordVisibility() {
    setPasswordVisible((prev) => !prev);
  }

  return (
    <form
      className="my-20 w-[35rem] space-y-3 rounded-lg p-4 text-sm shadow-[0px_0px_10px_0px_var(--color-neutral-500)] ring-[0.5px] ring-neutral-900"
      onSubmit={handleSubmit(formSubmit)}
      noValidate
    >
      <h1 className="text-center text-lg font-medium">Register Now</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex w-full flex-col items-center space-y-2">
          <label htmlFor="name" className="w-full">
            Name
          </label>
          {errors.name && (
            <span className="mx-auto w-[95%] text-right text-[10px] text-red-500">
              {errors.name.message}
            </span>
          )}
          <input
            type="text"
            id="name"
            autoComplete="off"
            {...register("name")}
            className={`w-full rounded-md p-1.5 text-center ring-[0.5px] focus-visible:outline-hidden ${errors.name ? "ring-red-500 focus-visible:shadow-[0px_0px_8px_0px_var(--color-red-700)]" : "ring-neutral-900 focus-visible:shadow-[0px_0px_8px_0px_var(--color-neutral-700)]"}`}
          />
        </div>
        <div className="flex w-full flex-col items-center space-y-2">
          <label htmlFor="username" className="w-full">
            Username
          </label>
          {errors.username && (
            <span className="mx-auto w-[95%] text-right text-[10px] text-red-500">
              {errors.username.message}
            </span>
          )}
          <input
            type="text"
            id="username"
            autoComplete="off"
            {...register("username")}
            className={`w-full rounded-md p-1.5 text-center ring-[0.5px] focus-visible:outline-hidden ${errors.username ? "ring-red-500 focus-visible:shadow-[0px_0px_8px_0px_var(--color-red-700)]" : "ring-neutral-900 focus-visible:shadow-[0px_0px_8px_0px_var(--color-neutral-700)]"}`}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex w-full flex-col items-center space-y-2">
          <label htmlFor="gender" className="w-full">
            Gender
          </label>
          {errors.gender && (
            <span className="mx-auto w-[95%] text-right text-[10px] text-red-500">
              {errors.gender.message}
            </span>
          )}
          <select
            id="gender"
            {...register("gender")}
            className={`w-full rounded-md p-1.5 text-center ring-[0.5px] ring-neutral-900 focus-visible:shadow-[0px_0px_8px_0px_var(--color-neutral-700)] focus-visible:outline-hidden ${errors.gender ? "ring-red-500 focus-visible:shadow-[0px_0px_8px_0px_var(--color-red-700)]" : "ring-neutral-900 focus-visible:shadow-[0px_0px_8px_0px_var(--color-neutral-700)]"}`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="flex w-full flex-col items-center space-y-2">
          <label htmlFor="birthdate" className="w-full">
            Birthdate
          </label>
          {errors.birthdate && (
            <span className="mx-auto w-[95%] text-right text-[10px] text-red-500">
              {errors.birthdate.message}
            </span>
          )}
          <input
            type="date"
            id="birthdate"
            autoComplete="off"
            {...register("birthdate")}
            className={`w-full rounded-md p-1.5 text-center ring-[0.5px] focus-visible:outline-hidden ${errors.birthdate ? "ring-red-500 focus-visible:shadow-[0px_0px_8px_0px_var(--color-red-700)]" : "ring-neutral-900 focus-visible:shadow-[0px_0px_8px_0px_var(--color-neutral-700)]"}`}
          />
        </div>
      </div>
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
      <div className="flex w-full items-center justify-center text-xs">
        <Link to="/auth/login" className="underline-offset-1 hover:underline">
          Already have an account? Login
        </Link>
      </div>
    </form>
  );
}

export default Register;
