import { FE_FULL_BASE_URL } from "@/config";
import { useBrowserStore, useUserStore } from "@/hooks";
import NewFolderIcon from "@/public/icons/new-folder";
import NewLinkIcon from "@/public/icons/new-link";
import OwnerEmptyIllustration from "@/public/images/owner-empty-state";
import ViewerEmptyStateIllustration from "@/public/images/viewer-empty-state";
import { Button } from "@/ui";
import Link from "next/link";
import { shallow } from "zustand/shallow";

export const BrowserEmptyState = () => {
    const [
        isRightSideBarPropertiesOpen,
        setIsNewLinkModalOpen,
        setIsNewFolderModalOpen,
        currentDirectoryData,
    ] = useBrowserStore(
        (state: any) => [
            state.isRightSideBarPropertiesOpen,
            state.setIsNewLinkModalOpen,
            state.setIsNewFolderModalOpen,
            state.currentDirectoryData,
        ],
        shallow
    );

    const [subdomain, username] = useUserStore((state: any) => [
        state.subdomain,
        state.username,
    ]);

    // if subdomain !== username and currentDirectoryData  publicity is none, then return a different empty state

    let viewerMode = false;
    if (
        currentDirectoryData?.publicAccess === "none" &&
        subdomain !== username
    ) {
        viewerMode = true;
    }

    return (
        <>
            <div
                className={`flex justify-center items-center h-full fixed lg:ml-20 bottom-0 lg:top-16 left-0 right-0 duration-500 ease-in-out ${
                    isRightSideBarPropertiesOpen ? "lg:mr-[20vw]" : "lg:mr-6"
                }`}
            >
                <div className="absolute flex justify-center items-center flex-col mt-8">
                    {viewerMode ? (
                        <>
                            <ViewerEmptyStateIllustration className="p-4" />
                            <div>
                                <p className="text-neutral-900 font-bold text-4xl">
                                    Nuh-Uh. Nothing here.
                                </p>
                                <p className="text-neutral-500 mt-5">
                                    <span>
                                        This folder is empty. How about
                                        exploring Effie’s
                                    </span>{" "}
                                    <Link
                                        href={`${FE_FULL_BASE_URL}`}
                                        className="text-primary-500"
                                    >
                                        home page?
                                    </Link>
                                </p>
                            </div>
                        </>
                    ) : (
                        <>
                            <OwnerEmptyIllustration className="p-4" />
                            <div>
                                <p className="text-neutral-800">
                                    this place is yours to fill!
                                </p>
                            </div>
                            <div className="flex gap-2 mt-2">
                                <Button
                                    borderMode
                                    className="w-36 flex items-center justify-center gap-1 h-12"
                                    onClick={() => {
                                        setIsNewFolderModalOpen(true);
                                    }}
                                >
                                    <NewFolderIcon />
                                    new folder
                                </Button>
                                <Button
                                    borderMode
                                    className="w-36 flex items-center justify-center gap-1 h-12"
                                    onClick={() => {
                                        setIsNewLinkModalOpen(true);
                                    }}
                                >
                                    <NewLinkIcon />
                                    new link
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
