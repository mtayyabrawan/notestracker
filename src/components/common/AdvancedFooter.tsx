import { Link } from "react-router";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react";

function AdvancedFooter() {
  return (
    <footer className="flex flex-col gap-3 bg-neutral-800 p-2 text-neutral-300">
      <div className="grid-row-1 grid grid-cols-2">
        <div className="flex items-center space-x-0.5">
          <a href="https://www.linkedin.com/in/mtayyabrawan" target="_blank">
            <IconBrandLinkedin className="h-4" />
          </a>
          <a href="https://www.github.com/mtayyabrawan" target="_blank">
            <IconBrandGithub className="h-4" />
          </a>
          <a href="https://www.x.com/mtayyabrawan" target="_blank">
            <IconBrandX className="h-4" />
          </a>
          <a href="https://www.instagram.com/mtayyabrawan" target="_blank">
            <IconBrandInstagram className="h-4" />
          </a>
          <a href="https://www.facebook.com/mtayyabrawan" target="_blank">
            <IconBrandFacebook className="h-4" />
          </a>
          <a href="https://www.youtube.com/@mtayyabrawan" target="_blank">
            <IconBrandYoutube className="h-4" />
          </a>
        </div>
        <nav className="flex items-center justify-end gap-4 text-sm">
          <Link
            to="/privacy-policy"
            className="underline-offset-0 hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-and-conditions"
            className="underline-offset-0 hover:underline"
          >
            Terms & Conditions
          </Link>
        </nav>
      </div>
      <p className="text-center text-xs">
        &copy; {new Date().getFullYear()} NotesTracker. All rights reserved.
      </p>
    </footer>
  );
}

export default AdvancedFooter;
