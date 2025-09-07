import { Toaster } from "sonner";
import SimpleFooter from "../components/common/SimpleFooter";
import { Outlet } from "react-router";
import DashboardNavbar from "../components/common/DashboardNavbar";
import Sidebar from "../components/Sidebar";

function DashboardLayout() {
  return (
    <div className="w-full">
      <Toaster position="top-center" theme="system" richColors={true} />
      <DashboardNavbar />
      <main className="mx-auto flex h-[calc(100vh-6rem))] w-full max-w-[1540px] items-center justify-center">
        <Sidebar />
        <div className="h-full w-full overflow-x-hidden overflow-y-auto">
          <Outlet />
        </div>
      </main>
      <SimpleFooter />
    </div>
  );
}

export default DashboardLayout;
