import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div>
      This is Auth Layout
      <Outlet />
    </div>
  );
}

export default AuthLayout;
