import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconLibraryPlus,
  IconNotes,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";

function Sidebar() {
  const [expand, setExpand] = useState(true);
  return (
    <div
      className={`h-full overflow-x-hidden overflow-y-auto py-5 shadow-[2px_0px_4px_-2px_black] ${expand ? "w-[15%] px-2" : "w-[4%]"}`}
    >
      <div
        className={`flex w-full items-center ${expand ? "justify-end" : "justify-center"}`}
      >
        {expand ? (
          <IconLayoutSidebarLeftCollapse
            size={24}
            onClick={() => setExpand(false)}
            className="cursor-pointer"
          />
        ) : (
          <IconLayoutSidebarLeftExpand
            size={24}
            onClick={() => setExpand(true)}
            className="cursor-pointer"
          />
        )}
      </div>
      <nav className="mt-5 flex flex-col items-start justify-start gap-2 border-t pt-4 text-sm">
        <NavLink
          className={`flex w-full items-center ${expand ? "justify-start gap-3 rounded-md px-3 py-1 hover:bg-neutral-400" : "justify-center gap-0"}`}
          to="profile"
        >
          <IconUser
            size={expand ? 24 : 30}
            className={expand ? "" : "rounded-full p-1 hover:bg-neutral-400"}
          />
          <span hidden={!expand}>Profile</span>
        </NavLink>
        <Link
          className={`flex w-full items-center ${expand ? "justify-start gap-3 rounded-md px-3 py-1 hover:bg-neutral-400" : "justify-center gap-0"}`}
          to="notes"
        >
          <IconNotes
            size={expand ? 24 : 30}
            className={expand ? "" : "rounded-full p-1 hover:bg-neutral-400"}
          />
          <span hidden={!expand}>Notes</span>
        </Link>
        <Link
          className={`flex w-full items-center ${expand ? "justify-start gap-3 rounded-md px-3 py-1 hover:bg-neutral-400" : "justify-center gap-0"}`}
          to="add-note"
        >
          <IconLibraryPlus
            size={expand ? 24 : 30}
            className={expand ? "" : "rounded-full p-1 hover:bg-neutral-400"}
          />
          <span hidden={!expand} className="whitespace-nowrap">
            Add Note
          </span>
        </Link>
        <Link
          className={`flex w-full items-center ${expand ? "justify-start gap-3 rounded-md px-3 py-1 hover:bg-neutral-400" : "justify-center gap-0"}`}
          to="settings"
        >
          <IconSettings
            size={expand ? 24 : 30}
            className={expand ? "" : "rounded-full p-1 hover:bg-neutral-400"}
          />
          <span hidden={!expand}>Settings</span>
        </Link>
      </nav>
      <div></div>
    </div>
  );
}

export default Sidebar;
