import { IconDots } from "@tabler/icons-react";

function Loader() {
  return (
    <div className="fixed top-0 left-1/2 z-50 flex h-full w-full max-w-[1540px] -translate-x-1/2 flex-col items-center gap-3 bg-neutral-100/50">
      <div className="mt-48 font-medium">NotesTracker</div>
      <div className="flex animate-pulse">
        <IconDots />
        <IconDots />
        <IconDots />
      </div>
    </div>
  );
}

export default Loader;
