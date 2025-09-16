import { useState } from "react";
import useAuth from "../hooks/useAuth";
import TwoFaModal from "./TwoFaModal";

function TwoFaSettings() {
  const { userData } = useAuth();

  const [twoFaModal, setTwoFaModal] = useState(false);

  function handleModal() {
    setTwoFaModal((prev) => !prev);
  }
  return (
    <div className="space-y-8 p-4">
      <h2 className="text-sm font-medium text-neutral-700">
        Two Factor Authenticaton
      </h2>
      <div className="flex items-center justify-between px-2 py-5">
        <div className="w-1/2 px-4 py-6 text-justify text-xs leading-loose">
          Secure your account by enabling two factor authentication
        </div>
        <button
          onClick={handleModal}
          className="w-fit cursor-pointer rounded-md bg-neutral-900 px-2 py-1.5 text-[0.65rem] font-medium text-neutral-200 shadow-[0px_0px_5px_0px_var(--color-neutral-700)] hover:bg-neutral-800 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:bg-neutral-500"
        >
          {userData?.twoFA === "enabled" ? "Disable" : "Enable"}
        </button>
        {twoFaModal && (
          <TwoFaModal
            handleModal={handleModal}
            status={userData?.twoFA === "enabled" ? "Disable" : "Enable"}
          />
        )}
      </div>
    </div>
  );
}

export default TwoFaSettings;
