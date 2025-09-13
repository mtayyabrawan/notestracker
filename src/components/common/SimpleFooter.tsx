import { Link } from "react-router";

function SimpleFooter() {
  return (
    <footer className="mx-auto flex w-full max-w-[1540px] items-center justify-between bg-neutral-400 p-2 text-neutral-950">
      <div className="font-medium">
        <Link to="/" className="flex items-center space-x-1">
          <img src="/notebook.svg" alt="logo" className="h-5 w-5" />
          <span>Notestracker</span>
        </Link>
      </div>
      <p className="text-xs">Copyright &copy; {new Date().getFullYear()}</p>
      <div className="space-x-2 text-sm">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-and-conditions">Terms & Conditions</Link>
      </div>
    </footer>
  );
}

export default SimpleFooter;
