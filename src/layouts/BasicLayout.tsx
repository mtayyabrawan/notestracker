import { Outlet } from "react-router";
import { Toaster } from "sonner";
import AdvancedFooter from "../components/common/AdvancedFooter";
import Navbar from "../components/common/Navbar";

function BasicLayout() {
  return (
    <div className="w-full">
      <Toaster position="top-center" theme="system" richColors={true} />
      <Navbar />
      <main className="min-h-[calc(100vh-7.5rem))] w-full">
        <Outlet />
      </main>
      <AdvancedFooter />
    </div>
  );
}

export default BasicLayout;
