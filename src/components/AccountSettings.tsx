import { useState } from "react";
import {
  IconChevronCompactDown,
  IconChevronCompactUp,
} from "@tabler/icons-react";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import TwoFaSettings from "./TwoFaSettings";

function AccountSettings() {
  const [open, setOpen] = useState(true);

  return (
    <div className="space-y-1.5">
      <h1
        onClick={() => setOpen((prev) => !prev)}
        id="account"
        className="flex w-full cursor-pointer items-center justify-between rounded-md p-3 font-medium ring-[0.5px] hover:bg-neutral-200"
      >
        <span>Account Setting</span>
        {open ? <IconChevronCompactUp /> : <IconChevronCompactDown />}
      </h1>
      {open && (
        <>
          <ChangePassword />
          <TwoFaSettings />
          <DeleteAccount />
        </>
      )}
    </div>
  );
}

export default AccountSettings;
