import { useRenderingStore } from "@/hooks";
import NewFolderIcon from "@/public/icons/new-folder";
import NewLinkIcon from "@/public/icons/new-link";

type SideBarProps = {
    handleNewLinkClick: () => void;
    handleNewFolderClick: () => void;
};

export default function LeftSideBar({
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
                        <NewFolderIcon className={`h-full w-full text-black`} />
                    </button>
                    <button
                        onClick={handleNewLinkClick}
                        className="w-12 h-12 hover:bg-primary-50 rounded-full p-2 duration-200"
                    >
                        <NewLinkIcon className={`h-full w-full text-black`} />
                    </button>
                </div>
            </nav>
        </>
    );
}
