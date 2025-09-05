import { IconCircleCheckFilled } from "@tabler/icons-react";

function Verified() {
  return (
    <div className="flex flex-col items-start gap-3 rounded-md bg-neutral-300 px-6 py-4 shadow-[0px_0px_5px_1px_var(--color-neutral-600)] ring-1 ring-neutral-800">
      <div className="flex items-center gap-2">
        <IconCircleCheckFilled size={34} className="text-green-500" />
        <h1 className="text-xl font-medium">Verified</h1>
      </div>
      <p className="text-sm">Your email has been verified</p>
    </div>
  );
}

export default Verified;
