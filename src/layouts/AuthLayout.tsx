import { Outlet } from "react-router";
import SimpleFooter from "../components/common/SimpleFooter";

function AuthLayout() {
  return (
    <div className="w-full">
      <main className="flex min-h-[calc(100vh-2.5rem))] w-full items-center justify-center">
        <Outlet />
      </main>
      <SimpleFooter />
    </div>
  );
}

export default AuthLayout;
