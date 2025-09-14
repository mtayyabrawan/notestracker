import {
  IconChevronCompactDown,
  IconChevronCompactUp,
} from "@tabler/icons-react";
import { useState } from "react";
import DeleteNotes from "./DeleteNotes";

function NotesSettings() {
  const [open, setOpen] = useState(true);
  return (
    <div className="space-y-1.5 pb-10">
      <h1
        onClick={() => setOpen((prev) => !prev)}
        id="account"
        className="flex w-full cursor-pointer items-center justify-between rounded-md p-3 font-medium ring-[0.5px] hover:bg-neutral-200"
      >
        <span>Notes Setting</span>
        {open ? <IconChevronCompactUp /> : <IconChevronCompactDown />}
      </h1>
      {open && (
        <>
          <DeleteNotes />
        </>
      )}
    </div>
  );
}

export default NotesSettings;
