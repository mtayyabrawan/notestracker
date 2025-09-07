import { Toaster } from "sonner";
import SimpleFooter from "../components/common/SimpleFooter";
import { Outlet } from "react-router";

function DashboardLayout() {
  return (
    <div className="w-full">
      <Toaster position="top-center" theme="system" richColors={true} />
      <main className="min-h-[calc(100vh-7.5rem))] w-full">
        <Outlet />
      </main>
      <SimpleFooter />
    </div>
  );
}

export default DashboardLayout;
