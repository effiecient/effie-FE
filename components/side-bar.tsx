import Image from "next/image";
import directoriesIcon from "../public/icons/directories.svg";
import newDirIcon from "../public/icons/new-folder-black.svg";
import newLinkIcon from "../public/icons/new-link-black.svg";
import timedIcon from "../public/icons/timed.svg";

type SideBarProps = {};

export default function SideBar() {
  return (
    <nav className="bg-white sticky top-0 left-0 w-24">
      <div className="flex flex-col justify-center items-start gap-12 mt-12 px-4">
        <div className="flex w-full justify-center">
          <button className="w-14 h-14 hover:bg-primary-50 rounded-full p-2">
            <Image
              src={newLinkIcon}
              alt="new link icon"
              className="w-full h-full"
            />
          </button>
        </div>
        <div className="flex w-full justify-center">
          <button className="w-14 h-14 hover:bg-primary-50 rounded-full p-2">
            <Image
              src={newDirIcon}
              alt="New Directory Icon"
              className="w-full h-full"
            />
          </button>
        </div>
        <div className="self-center border-[1px] border-dashed w-[65%] border-neutral-300"></div>
        <div className="flex w-full justify-center">
          <button className="w-14 h-14 hover:bg-primary-50 rounded-full p-2">
            <Image
              src={directoriesIcon}
              alt="Directory Icon"
              className="w-full h-full"
            />
          </button>
        </div>
        <div className="flex w-full justify-center">
          <button className="w-14 h-14 hover:bg-primary-50 rounded-full p-2">
            <Image src={timedIcon} alt="Timed icon" className="w-full h-full" />
          </button>
        </div>
      </div>
    </nav>
  );
}
