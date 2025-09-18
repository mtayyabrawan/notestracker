import { useEffect, useRef, useState } from "react";
import authAPI from "../api/auth.api";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

function AccountDropdown() {
  const [dropdown, setDropdown] = useState(false);

  const { updateLogin, userData } = useAuth();

  const navigator = useNavigate();

  function toggleDropdown() {
    setDropdown((prev) => !prev);
  }

  async function handleLogout() {
    const res = await authAPI.logout();
    if (!res.resStatus) {
      toast.error(res.error);
      return;
    }
    updateLogin("false");
    toast.success(res.message);
    if (!isHome) navigator("/auth/login");
  }

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    }
    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  const [isHome, setHome] = useState(false);

  useEffect(() => {
    if (!window.location.pathname.startsWith("/dashboard")) {
      setHome(true);
    }
  }, []);

  return (
    <div className="relative text-sm" ref={dropdownRef}>
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
          {isHome === true ? (
            <Link
              to="/dashboard/profile"
              className="w-full rounded-sm bg-neutral-500 py-1.5 text-center"
            >
              Dashboard
            </Link>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}

export default AccountDropdown;
