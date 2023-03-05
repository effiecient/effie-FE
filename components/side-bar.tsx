import { useState } from "react";
import Image from "next/image";
import directoriesIcon from "../public/icons/directories.svg";
import newDirIcon from "../public/icons/new-folder-black.svg";
import newLinkIcon from "../public/icons/new-link-black.svg";
import timedIcon from "../public/icons/timed.svg";
import NewLink from "./create-modal/new-link";
import NewFolder from "./create-modal/new-folder";

type SideBarProps = {};

export default function SideBar() {
  const [isNewLinkOpen, setIsNewLinkOpen] = useState(false);
  const [isNewFolderOpen, setIsNewFolderOpen] = useState(false);

  return (
    <>
      {/* New Link */}
      <NewLink isOpen={isNewLinkOpen} onClose={() => setIsNewLinkOpen(false)} />

      {/* New Folder */}
      <NewFolder isOpen={isNewFolderOpen} onClose={() => setIsNewFolderOpen(false)} />

      <nav className="bg-white sticky top-0 left-0">
        <div className="flex flex-col justify-center items-start gap-6 py-6 px-4">
          <div className="flex w-full justify-center">
            <button 
              onClick={() => setIsNewLinkOpen(true)}
              className="w-12 h-12 hover:bg-primary-50 rounded-full p-2 duration-200"
            >
              <Image
                src={newLinkIcon}
                alt="new link icon"
                className="w-full h-full"
              />
            </button>
          </div>
          <div className="flex w-full justify-center">
            <button 
              onClick={() => setIsNewFolderOpen(true)}
              className="w-12 h-12 hover:bg-primary-50 rounded-full p-2 duration-200"
            >
              <Image
                src={newDirIcon}
                alt="New Directory Icon"
                className="w-full h-full"
              />
            </button>
          </div>
          <div className="self-center border-[1px] border-dashed w-[65%] border-neutral-300" />
          <div className="flex w-full justify-center">
            <button className="w-12 h-12 hover:bg-primary-50 rounded-full p-2 duration-200">
              <Image
                src={directoriesIcon}
                alt="Directory Icon"
                className="w-full h-full"
              />
            </button>
          </div>
          <div className="flex w-full justify-center">
            <button className="w-12 h-12 hover:bg-primary-50 rounded-full p-2 duration-200">
              <Image src={timedIcon} alt="Timed icon" className="w-full h-full" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
