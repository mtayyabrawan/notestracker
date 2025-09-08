import { useState } from "react";
import DeleteModal from "./DeleteModal";

function DeleteAccount() {
  const [open, setOpen] = useState(false);
  function handleModal() {
    setOpen((prev) => !prev);
  }
  return (
    <div className="space-y-8 p-4">
      <h2 className="text-sm font-medium text-neutral-700">Delete Account</h2>
      <div className="flex items-center justify-between px-2 py-5">
        <div className="w-1/2 px-4 py-6 text-justify text-xs leading-loose">
          This action is irreversible. When you delete your account all your
          notes and other data will be deleted permanantly.
        </div>
        <button
          onClick={handleModal}
          className="w-fit cursor-pointer rounded-md bg-red-600 px-2 py-1.5 text-[0.65rem] font-medium text-neutral-200 shadow-[0px_0px_5px_0px_var(--color-red-700)] hover:bg-red-500 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:bg-red-400"
        >
          Delete
        </button>
        {open && <DeleteModal handleModal={handleModal} />}
      </div>
    </div>
  );
}

export default DeleteAccount;
