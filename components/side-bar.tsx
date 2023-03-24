import { useState } from "react";
import Image from "next/image";
import directoriesIcon from "../public/icons/directories.svg";
import newDirIcon from "../public/icons/new-folder-black.svg";
import newLinkIcon from "../public/icons/new-link-black.svg";
import timedIcon from "../public/icons/timed.svg";

type SideBarProps = {
  handleNewLinkClick: () => void;
  handleNewFolderClick: () => void;
};

export default function SideBar({
  handleNewLinkClick,
  handleNewFolderClick,
} : SideBarProps) {
  return (
    <nav className="bg-white fixed bottom-0 lg:top-16 left-0 z-50 w-full lg:w-auto">
        <div className="flex lg:flex-col justify-around lg:justify-center items-start gap-0 lg:gap-6 py-2 lg:py-6 px-4">
            <button 
            onClick={handleNewLinkClick}
            className="w-12 h-12 hover:bg-primary-50 rounded-full p-2 duration-200"
            >
                <Image
                    src={newLinkIcon}
                    alt="new link icon"
                    className="w-full h-full"
                />
            </button>
            <button 
                onClick={handleNewFolderClick}
                className="w-12 h-12 hover:bg-primary-50 rounded-full p-2 duration-200"
            >
                <Image
                src={newDirIcon}
                alt="New Directory Icon"
                className="w-full h-full"
                />
            </button>
            <div className="self-center border-[1px] border-dashed h-6 min-w-[1px] lg:w-[65%] border-neutral-300" />
            <button className="w-12 h-12 hover:bg-primary-50 rounded-full p-2 duration-200">
                <Image
                src={directoriesIcon}
                alt="Directory Icon"
                className="w-full h-full"
                />
            </button>
            <button className="w-12 h-12 hover:bg-primary-50 rounded-full p-2 duration-200">
                <Image src={timedIcon} alt="Timed icon" className="w-full h-full" />
            </button>
        </div>
    </nav>
  );
}
