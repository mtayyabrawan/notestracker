import {
  IconCircleXFilled,
  IconClipboard,
  IconCommand,
  IconDragDrop,
  IconUpload,
} from "@tabler/icons-react";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react";
import authAPI from "../api/auth.api";
import { toast } from "sonner";
import useAuth from "../hooks/useAuth";

function ImageUploadModal({ handleModal }: { handleModal: () => void }) {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const { fetchUser } = useAuth();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (imageFile === undefined) {
      toast.error("Please upload an image file first");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", imageFile as Blob);
    const res = await authAPI.uploadProfilePicture(formData);
    if (!res.resStatus) {
      toast.error(res.error);
      return;
    }
    setImageFile(undefined);
    setImage(undefined);
    toast.success(res.message);
    await fetchUser();
    handleModal();
    return;
  }

  async function handleImage(e: ChangeEvent<HTMLInputElement>) {
    const files = e.currentTarget.files;
    if (!files || files.length === 0) return;
    const avatar = files[0];
    if (!isImageFile(avatar)) {
      toast.info("Please upload an image");
      return;
    }
    setImageFile(avatar);
    const reader = new FileReader();
    reader.readAsDataURL(avatar);
    reader.onload = (evt: ProgressEvent<FileReader>) => {
      setImage(evt.target?.result as string);
    };
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    const fileList = e.dataTransfer.files;
    if (!fileList.length || fileList.length > 1) {
      toast.info("Only one image file is accepted");
      return;
    }
    const avatar = fileList[0];
    if (!isImageFile(avatar)) {
      toast.info("Please upload an image");
      return;
    }
    setImageFile(avatar);
    const reader = new FileReader();
    reader.readAsDataURL(avatar);
    reader.onload = (evt: ProgressEvent<FileReader>) => {
      setImage(evt.target?.result as string);
    };
  }

  function isImageFile(file: File) {
    if (file.type.split("/").shift() === "image") return true;
    return false;
  }

  function handlePaste(e: ClipboardEvent) {
    const fileList = e.clipboardData?.files;
    if (!fileList?.length || fileList.length > 1) {
      toast.info("Only one image file is accepted");
      return;
    }
    const avatar = fileList[0];
    if (!isImageFile(avatar)) {
      toast.info("Please upload an image");
      return;
    }
    setImageFile(avatar);
    const reader = new FileReader();
    reader.readAsDataURL(avatar);
    reader.onload = (evt: ProgressEvent<FileReader>) => {
      setImage(evt.target?.result as string);
    };
  }

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  });

  return (
    <div className="fixed top-0 left-1/2 h-full w-full max-w-[1540px] -translate-x-1/2 bg-neutral-300/40 backdrop-blur-sm">
      <form
        className="relative mx-auto mt-16 h-96 w-[40%] rounded-md bg-neutral-300 shadow-[0px_0px_6px_0.5px_var(--color-neutral-800)]"
        noValidate
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <IconCircleXFilled
          size={24}
          className="absolute top-1 right-1 cursor-pointer hover:text-red-600"
          onClick={handleModal}
        />
        <label htmlFor="avatar" className="cursor-pointer">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onContextMenu={(e) => {
              e.preventDefault();
            }}
            className="flex h-full w-full items-center justify-center rounded-md"
          >
            {image ? (
              <div className="relative w-1/2">
                <img
                  src={image}
                  alt="image"
                  className="mx-auto block h-full max-h-72 rounded-md bg-neutral-200"
                />
                <div className="absolute bottom-[calc(100%+2px)] flex w-full items-center justify-start gap-2 rounded-md border bg-neutral-950 p-2 text-xs text-neutral-100">
                  <p>
                    {imageFile?.name.slice(0, 20) +
                      ((imageFile?.name.length as number) > 20 ? "..." : "")}
                  </p>
                  <p>
                    |&nbsp;{Math.round((imageFile?.size as number) / 1024)} KB
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-[70%] w-[60%] flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-neutral-400 text-neutral-500">
                <p className="w-[70%] text-justify text-sm text-pretty">
                  Drag your photo and drop here, upload or press{" "}
                  <span className="inline-flex items-center rounded-sm bg-neutral-400 px-1 py-0.5 text-[0.65rem]">
                    <span>Ctrl /</span>
                    <IconCommand size={15} /> <span>+ V</span>
                  </span>{" "}
                  to paste image here.
                </p>
                <div className="flex w-[30%] items-center justify-between rounded-lg bg-neutral-400 px-2 py-1">
                  <IconUpload />
                  <IconDragDrop />
                  <IconClipboard />
                </div>
              </div>
            )}
          </div>
        </label>
        <input
          onChange={handleImage}
          hidden
          id="avatar"
          type="file"
          name="avatar"
        />
        {image && (
          <div className="absolute bottom-1 left-1/3 mx-auto grid h-8 w-[33%] grid-cols-2 grid-rows-1 rounded-md text-sm font-medium text-neutral-300 shadow-[0px_0px_6px_-1px_var(--color-neutral-800)]">
            <button
              type="submit"
              className="flex h-full w-full cursor-pointer items-center justify-center rounded-l-md bg-cyan-600 focus-visible:outline-hidden"
            >
              <IconUpload size={20} />
            </button>
            <button
              onClick={() => {
                setImage(undefined);
                setImageFile(undefined);
                handleModal();
              }}
              type="button"
              className="flex h-full w-full cursor-pointer items-center justify-center rounded-r-md bg-neutral-700 focus-visible:outline-hidden"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ImageUploadModal;
