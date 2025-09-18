import { useEffect, useRef, useState } from "react";
import authAPI from "../api/auth.api";
import { toast } from "sonner";
import useAuth from "../hooks/useAuth";
import { IconEdit, IconPhotoUp, IconPhotoX } from "@tabler/icons-react";

function ImageDropdown({ handleModal }: { handleModal: () => void }) {
  const [dropdown, setDropdown] = useState(false);

  const { fetchUser } = useAuth();

  const dropdownRef = useRef<HTMLDivElement>(null);

  function toggleDropdown() {
    setDropdown((prev) => !prev);
  }

  async function handleDelete() {
    const res = await authAPI.deleteProfilePicture();
    if (!res.resStatus) {
      toast.error(res.error);
      return;
    }
    toast.success("Image deleted successfully!");
    await fetchUser();
    toggleDropdown();
    return;
  }

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

  return (
    <div className="absolute right-2 bottom-0 text-sm" ref={dropdownRef}>
      <button
        title="Edit profile picture"
        onClick={toggleDropdown}
        className="cursor-pointer rounded-full bg-neutral-400 p-1 focus-visible:outline-hidden"
      >
        <IconEdit size={15} />
      </button>
      {dropdown && (
        <div className="absolute bottom-[calc(100%+2px)] flex h-fit w-full flex-col items-center justify-start gap-1">
          <button
            onClick={() => {
              toggleDropdown();
              handleModal();
            }}
            title="Upload new profile picture"
            className="cursor-pointer rounded-full bg-neutral-400 p-1 focus-visible:outline-hidden"
          >
            <IconPhotoUp size={15} />
          </button>
          <button
            onClick={handleDelete}
            title="Delete profile picture"
            className="cursor-pointer rounded-full bg-neutral-400 p-1 focus-visible:outline-hidden"
          >
            <IconPhotoX size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageDropdown;
