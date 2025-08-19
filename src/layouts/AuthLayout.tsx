import { Outlet } from "react-router";
import SimpleFooter from "../components/common/SimpleFooter";

function AuthLayout() {
  return (
    <div className="w-full">
      <main className="min-h-[calc(100vh-2.5rem))] w-full">
        <Outlet />
      </main>
      <SimpleFooter />
    </div>
  );
}

export default AuthLayout;
