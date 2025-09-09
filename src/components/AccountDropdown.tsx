import { useEffect, useState } from "react";
import authAPI from "../api/auth.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";

function AccountDropdown() {
  const [userData, setUserData] = useState<{
    name: string;
    username: string;
    email: string;
    isVerified: boolean | "";
    gender: "male" | "female" | "";
    birthdate: string;
    twoFA: "enabled" | "disabled" | "pending" | "";
    profilePicture: string;
  }>({
    name: "",
    username: "",
    email: "",
    isVerified: "",
    gender: "",
    birthdate: "",
    twoFA: "",
    profilePicture: "",
  });

  const [dropdown, setDropdown] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
    authAPI.getLogin().then((res) => {
      if (!res.resStatus) {
        toast.error(res.error);
        return;
      } else {
        setUserData(res.userData);
      }
    });
  }, []);

  function toggleDropdown() {
    setDropdown((prev) => !prev);
  }

  async function handleLogout() {
    const res = await authAPI.logout();
    if (!res.resStatus) {
      toast.error(res.error);
      return;
    }
    navigator("/auth/login");
    toast.success(res.message);
  }

  return (
    <div className="relative text-sm">
      <button
        onClick={toggleDropdown}
        className="flex cursor-pointer items-center justify-center gap-1 rounded-sm bg-neutral-700 px-2 py-1.5 focus-visible:outline-hidden"
      >
        <img src={userData.profilePicture} className="h-5" />
        <span>{userData.username}</span>
      </button>
      {dropdown && (
        <div className="absolute top-[calc(100%+2px)] flex h-fit w-full flex-col items-center justify-start gap-1 rounded-sm bg-neutral-700 p-1 text-xs">
          <button
            onClick={handleLogout}
            className="w-full cursor-pointer rounded-sm bg-neutral-500 py-1.5 focus-visible:outline-hidden"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountDropdown;
