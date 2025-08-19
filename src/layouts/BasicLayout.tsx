import { Outlet } from "react-router";

function BasicLayout() {
  return (
    <div>
      This is Basic Layout
      <Outlet />
    </div>
  );
}

export default BasicLayout;
