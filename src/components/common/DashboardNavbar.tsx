import { Link } from "react-router";

function DashboardNavbar() {
  return (
    <header className="flex items-center justify-between bg-neutral-950 px-4 py-3 text-neutral-200">
      <Link to="/" className="flex items-center gap-2">
        <img src="/notebook.svg" alt="logo" className="h-8 w-8" />
        <span className="text-lg font-semibold">Notestracker</span>
      </Link>
      <nav className="text-sm">Account</nav>
    </header>
  );
}

export default DashboardNavbar;
