import { useRef } from "react";
import Image from "next/image";
// import NewLink from "./create-modal/new-link";
// import NewFolder from "./create-modal/new-folder";
import { FE_BASE_URL, FE_PROTOCOL } from "@/config";
import { useRenderingStore, useUserStore } from "@/hooks";
// import { useRouter } from "next/router";
import { FolderLinkData } from "@/type";
import NewFolderIcon from "@/public/icons/new-folder";
import NewLinkIcon from "@/public/icons/new-link";
import CopyButton from "./copy-button";
import PinIcon from "@/public/icons/pin";
import DirectoriesIcon from "@/public/icons/directories";
import LinkIcon from "@/public/icons/link";

type DirectoryItemCardProps = {
    content:
        | "new folder"
        | "new link"
        | "link"
        | "folder"
        | "display link"
        | "display folder";
    DirectoryItemData?: FolderLinkData;
    onClick?: () => void;
    onDoubleClick?: () => void;
    className?: string;
    relativePath?: string;
    isFocused?: boolean;
    view: string;
};

export default function DirectoryItemCard({
    content,
    DirectoryItemData,
    onClick,
    onDoubleClick,
    className,
    relativePath,
    isFocused = false,
    view,
}: DirectoryItemCardProps) {
    // console.log("DirectoryItemData");
    // console.log(DirectoryItemData);
    let pathname = window.location.pathname;
    let subdomain = useUserStore((state: any) => state.subdomain);
    // add / in the back if doesn't exist
    if (pathname[pathname.length - 1] !== "/") {
        pathname = pathname + "/";
    }
    const effieURL = `${FE_PROTOCOL}://${subdomain}.${FE_BASE_URL}${pathname}${relativePath}`;

    const showSkeleton = useRenderingStore((state: any) => state.showSkeleton);

    if (showSkeleton) {
        return (
            <div
                className={`animate-pulse pt-3 pb-2 px-5 rounded-xl bg-neutral-200 w-[32vw] md:w-[44vw] lg:w-[20vw] max-w-[16rem] min-w-[8rem] min-h-[4rem]`}
            />
        );
    }

    return (
        <>
            <div
                onClick={onClick}
                onDoubleClick={onDoubleClick}
                className={`
                ${className} 
                ${
                    content.slice(0, 3) === "new"
                        ? "items-center justify-center gap-2 border-white hover:bg-primary-50 hover:border-primary-50 cursor-pointer duration-200"
                        : content.slice(0, 7) === "display"
                        ? "flex-col gap-1 border-neutral-200"
                        : `flex-col gap-1 ${
                            view === "grid" ?
                                (isFocused
                                ? "border-primary-400"
                                : "hover:border-neutral-200 border-white")
                            : 
                                (isFocused
                                ? "bg-primary-100/30"
                                : "hover:bg-neutral-100/50")
                          } cursor-pointer`
                } 
                ${
                    view === "grid"
                        ? "bg-white border-2 w-[32vw] md:w-[44vw] lg:w-[20vw] max-w-[16rem] min-w-[8rem] min-h-[4rem] rounded-xl focus:border-primary-500 pt-3 pb-2 px-5 flex"
                        : "py-3 grid grid-cols-[24px_1fr_1fr_60px] md:grid-cols-[24px_1fr_3fr_8rem_60px] lg:grid-cols-[24px_1fr_3fr_8rem_8rem_60px] items-center gap-4 border-b-2 border-dashed border-neutral-200"
                }
                group relative`}
            >
                {/* images */}
                {content === "new folder" ? (
                    <>
                        <NewFolderIcon className="h-7 w-7" />
                        <h6 className="text-primary-500 ml-2">New folder</h6>
                    </>
                ) : content === "new link" ? (
                    <>
                        <NewLinkIcon className="h-7 w-7" />
                        <h6 className="text-primary-500 ml-2">New link</h6>
                    </>
                ) : view === "grid" ? (
                    <div className={`flex flex-row`}>
                        {content === "link" || content === "display link" ? (
                            <div className="mr-2 w-1/5">
                                <Image
                                    src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${DirectoryItemData?.link}&size=64`}
                                    alt="link"
                                    width={28}
                                    height={28}
                                />
                            </div>
                        ) : (
                            <div
                                className={`absolute left-0 top-0 h-full w-1 rounded-l-[10px]`}
                                style={{
                                    backgroundColor: DirectoryItemData?.color,
                                }}
                            />
                        )}
                        {/* link or folder data */}
                        <div className="overflow-hidden w-[80%]">
                            <h6 className={`text-neutral-800`}>
                                {DirectoryItemData?.title}
                            </h6>
                            <a
                                href={DirectoryItemData?.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`hover:text-primary-500 text-neutral-600 text-xs un hover:decoration-primary-500 inline-block max-w-full whitespace-nowrap`}
                            >
                                {DirectoryItemData?.link &&
                                    DirectoryItemData?.link?.slice(8)}
                            </a>
                            {(content === "link" || content === "folder") && (
                                <CopyButton
                                    effieURL={effieURL}
                                    link={DirectoryItemData?.link}
                                    view={view}
                                />
                            )}
                        </div>
                        {DirectoryItemData?.isPinned && (
                            <PinIcon className="absolute top-1 right-1 z-0 h-6 w-6" />
                        )}
                    </div>
                ) : (
                    // list view
                    <>
                        {DirectoryItemData?.type === "folder" ? (
                            <DirectoriesIcon className="h-7 w-7" />
                        ) : (
                            <LinkIcon className="h-7 w-7" />
                        )}
                        <p className="font-bold text-neutral-900">
                            {DirectoryItemData?.title}
                        </p>
                        <p>
                        <a
                            href={DirectoryItemData?.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`hover:text-primary-500 text-neutral-600 un hover:decoration-primary-500 inline-block max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis`}
                        >
                            {DirectoryItemData?.link &&
                                DirectoryItemData?.link?.slice(8)}
                        </a>
                        </p>
                        <p className="text-neutral-600 whitespace-nowrap hidden lg:block">
                            {DirectoryItemData?.lastModified && (
                                <>
                                    {new Date(
                                        DirectoryItemData?.lastModified
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </>
                            )}
                        </p>
                        <p className="text-neutral-600 whitespace-nowrap hidden md:block">
                            {DirectoryItemData?.publicAccess === "none"
                                ? "Private"
                                : DirectoryItemData?.publicAccess === "read"
                                ? "Public (viewer)"
                                : DirectoryItemData?.publicAccess === "write"
                                ? "Public (editor)"
                                : "Error fetching access level"}
                        </p>
                        <div className="flex gap-2 justify-end items-center">
                            {DirectoryItemData?.isPinned && (
                                <PinIcon className="z-0 h-6 w-6 mb-1" />
                            )}
                            <CopyButton
                                effieURL={effieURL}
                                link={DirectoryItemData?.link}
                                view={view}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
