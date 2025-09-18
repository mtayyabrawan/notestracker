import {
  IconGenderMale,
  IconGenderFemale,
  IconSquareRoundedCheckFilled,
} from "@tabler/icons-react";
import useAuth from "../../hooks/useAuth";
import ImageDropdown from "../../components/ImageDropdown";
import ImageUploadModal from "../../components/ImageUploadModal";
import { useState } from "react";

function Profile() {
  const { userData } = useAuth();

  const [modal, setModal] = useState(false);
  function handleModal() {
    setModal((prev) => !prev);
  }
  return (
    <div className="h-full w-full space-y-2 p-4">
      <h1 className="text-center text-xl font-medium">Profile</h1>
      <div className="w-full space-y-10 py-10">
        <div className="relative mx-auto h-36 w-36 rounded-full shadow-[0px_0px_5px_1px_var(--color-neutral-700)]">
          <img
            src={userData.profilePicture}
            alt={userData.username}
            className="h-36 w-36 rounded-full object-cover"
          />
          <ImageDropdown handleModal={handleModal} />
          {modal && <ImageUploadModal handleModal={handleModal} />}
        </div>
        <div className="w-full space-y-6">
          <div className="flex w-full items-center justify-start gap-4 pl-5">
            <h2 className="text-sm">Name : </h2>
            <p className="font-medium">{userData.name}</p>
          </div>
          <div className="flex w-full items-center justify-start gap-4 pl-5">
            <h2 className="text-sm">Username : </h2>
            <p className="font-medium">{userData.username}</p>
          </div>
          <div className="flex w-full items-center justify-start gap-4 pl-5">
            <h2 className="text-sm">Email : </h2>
            <p className="flex gap-3 font-medium">
              {userData.email}
              {userData.isVerified && (
                <IconSquareRoundedCheckFilled className="text-green-400" />
              )}
            </p>
          </div>
          <div className="flex w-full items-center justify-start gap-4 pl-5">
            <h2 className="text-sm">Gender : </h2>
            <p className="font-medium">
              {userData.gender === "male" ? (
                <IconGenderMale size={26} />
              ) : (
                <IconGenderFemale size={26} />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
