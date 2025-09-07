import { Toaster } from "sonner";
import SimpleFooter from "../components/common/SimpleFooter";
import { Outlet } from "react-router";
import DashboardNavbar from "../components/common/DashboardNavbar";

function DashboardLayout() {
  return (
    <div className="w-full">
      <Toaster position="top-center" theme="system" richColors={true} />
      <DashboardNavbar />
      <main className="min-h-[calc(100vh-6rem))] w-full">
        <Outlet />
      </main>
      <SimpleFooter />
    </div>
  );
}

export default DashboardLayout;
