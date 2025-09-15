import { Link } from "react-router";
import AccountDropdown from "../AccountDropdown";

function DashboardNavbar() {
  return (
    <header className="mx-auto flex max-w-[1540px] items-center justify-between bg-neutral-950 px-4 py-3 text-neutral-200">
      <Link to="/" className="flex items-center gap-2">
        <img src="/notebook.svg" alt="logo" className="h-8 w-8" />
        <span className="text-lg font-semibold">NotesTracker</span>
      </Link>
      <AccountDropdown />
    </header>
  );
}

export default DashboardNavbar;
