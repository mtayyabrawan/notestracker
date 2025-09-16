import { IconExternalLink } from "@tabler/icons-react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import AccountDropdown from "../AccountDropdown";

function Navbar() {
  const { isLoggedIn } = useAuth();
  return (
    <header className="sticky top-0 mx-auto grid max-w-[1540px] grid-cols-3 grid-rows-1 bg-neutral-950 px-4 py-3 text-neutral-200">
      <Link to="/" className="flex items-center gap-2">
        <img src="/notebook.svg" alt="logo" className="h-8 w-8" />
        <span className="text-lg font-semibold">NotesTracker</span>
      </Link>
      <nav className="flex items-center justify-center space-x-4 text-sm">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        {isLoggedIn === "true" ? (
          <AccountDropdown />
        ) : (
          <>
            <Link to="/auth/login">Login</Link>
            <Link to="/auth/register">Register</Link>
          </>
        )}
      </nav>
      <div className="flex items-center justify-end space-x-4 text-sm">
        <a
          href="https://github.com/mtayyabrawan/notestracker"
          target="_blank"
          className="flex items-center justify-center gap-1"
        >
          <span>GitHub Repo</span> <IconExternalLink className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}

export default Navbar;
