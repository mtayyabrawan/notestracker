import { Toaster } from "sonner";
import SimpleFooter from "../components/common/SimpleFooter";
import { Outlet } from "react-router";
import DashboardNavbar from "../components/common/DashboardNavbar";
import Sidebar from "../components/Sidebar";
import LoginWrapper from "../components/LoginWrapper";
import NotesProvider from "../store/providers/NotesProvider";

function DashboardLayout() {
  return (
    <>
      <LoginWrapper protectionType="protected">
        <NotesProvider>
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
        </NotesProvider>
      </LoginWrapper>
    </>
  );
}

export default DashboardLayout;
