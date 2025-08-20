import { Link } from "react-router";

function Login() {
  return (
    <form className="w-96 space-y-6 rounded-lg p-4 text-sm shadow-[0px_0px_10px_0px_var(--color-neutral-500)] ring-[0.5px] ring-neutral-900">
      <h1 className="text-center text-lg font-medium">Login Now</h1>
      <div className="flex w-full flex-col items-center space-y-2">
        <label htmlFor="email" className="w-full">
          Email
        </label>
        <input
          type="email"
          id="email"
          autoComplete="off"
          className="w-full rounded-md p-1.5 ring-[0.5px] ring-neutral-900 focus-visible:outline-hidden"
        />
      </div>
      <div className="flex w-full flex-col items-center space-y-2">
        <label htmlFor="password" className="w-full">
          Password
        </label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          className="w-full rounded-md p-1.5 ring-[0.5px] ring-neutral-900 focus-visible:outline-hidden"
        />
      </div>
      <button className="w-full rounded-md bg-neutral-900 px-2.5 py-1.5 font-medium text-neutral-200">
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
