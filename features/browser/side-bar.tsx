// import { useState } from "react";
// import Image from "next/image";
// import directoriesIcon from "@/public/icons/directories.svg";
// import newDirIcon from "@/public/icons/new-folder-black.svg";
// import newLinkIcon from "@/public/icons/new-link-black.svg";
// import timedIcon from "@/public/icons/timed.svg";
import { useRenderingStore } from "@/hooks";
import NewFolderBlackIcon from "@/public/icons/new-folder-black";
import NewLinkBlackIcon from "@/public/icons/new-link-black";

type SideBarProps = {
    handleNewLinkClick: () => void;
    handleNewFolderClick: () => void;
};

export default function SideBar({
    handleNewLinkClick,
    handleNewFolderClick,
}: SideBarProps) {
    const showSkeleton = useRenderingStore((state: any) => state.showSkeleton);

    if (showSkeleton)
        return (
            <>
                <div className="relative bottom-0 lg:top-16 left-0 z-50 w-full lg:w-20 " />
                <nav className="fixed bg-white bottom-0 lg:top-16 left-0 z-50 w-full lg:w-20">
                    <div className="flex lg:flex-col justify-around lg:justify-center items-center gap-0 lg:gap-6 py-2 lg:py-6 px-4 animate-pulse">
                        <div className="w-12 h-12 hover:bg-primary-50 rounded-full p-2 duration-200">
                            <div className="w-8 h-8 bg-neutral-200 rounded-full" />
                        </div>
                        <div className="w-12 h-12 hover:bg-primary-50 rounded-full p-2 duration-200">
                            <div className="w-8 h-8 bg-neutral-200 rounded-full" />
                        </div>
                        {/* <div className="border-[1px] border-dashed h-6 lg:h-0 min-w-[1px] lg:w-[65%] border-neutral-300" />
                        <div className="w-12 h-12 hover:bg-primary-50 rounded-full p-2 duration-200">
                            <div className="w-8 h-8 bg-neutral-200 rounded-full" />
                        </div>
                        <div className="w-12 h-12 hover:bg-primary-50 rounded-full p-2 duration-200">
                            <div className="w-8 h-8 bg-neutral-200 rounded-full" />
                        </div> */}
                    </div>
                </nav>
            </>
        );
    return (
        <>
            <div className="relative bottom-0 lg:top-16 left-0 z-50 w-full lg:w-20" />
            <nav className="fixed bg-white bottom-0 lg:top-16 left-0 z-50 w-full lg:w-20">
                <div className="flex lg:flex-col justify-around lg:justify-center items-center gap-0 lg:gap-6 py-2 lg:py-6 px-4">
                    <button
                        onClick={handleNewFolderClick}
                        className="w-12 h-12 hover:bg-primary-50 rounded-full p-2 duration-200"
                    >
                        <NewFolderBlackIcon className="h-full w-full" />
                    </button>
                    <button
                        onClick={handleNewLinkClick}
                        className="w-12 h-12 hover:bg-primary-50 rounded-full p-2 duration-200"
                    >
                        <NewLinkBlackIcon className="h-full w-full" />
                    </button>
                    {/* <div className="border-[1px] border-dashed h-6 lg:h-0 min-w-[1px] lg:w-[65%] border-neutral-300" />
                    <button className="w-12 h-12 hover:bg-primary-50 rounded-full p-2 duration-200">
                        <Image
                            src={directoriesIcon}
                            alt="Directory Icon"
                            className="w-full h-full"
                        />
                    </button>
                    <button className="w-12 h-12 hover:bg-primary-50 rounded-full p-2 duration-200">
                        <Image
                            src={timedIcon}
                            alt="Timed icon"
                            className="w-full h-full"
                        />
                    </button> */}
                </div>
            </nav>
        </>
    );
}
