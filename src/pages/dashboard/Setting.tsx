import AccountSettings from "../../components/AccountSettings";
import NotesSettings from "../../components/NotesSettings";

function Setting() {
  return (
    <div className="h-full w-full space-y-4 p-4">
      <AccountSettings />
      <NotesSettings />
    </div>
  );
}

export default Setting;
