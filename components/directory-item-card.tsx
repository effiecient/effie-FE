import { useRef } from "react";
import CopyIcon from "@/public/icons/copy";
import Image from "next/image";
// import NewLink from "./create-modal/new-link";
// import NewFolder from "./create-modal/new-folder";
import { copyToClipboard, stopEventPropagation } from "@/utils";
import { FE_BASE_URL, FE_PROTOCOL } from "@/config";
import { useRenderingStore, useUserStore } from "@/hooks";
// import { useRouter } from "next/router";
import { FolderLinkData } from "@/type";
import NewFolderIcon from "@/public/icons/new-folder";
import NewLinkIcon from "@/public/icons/new-link";

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
    let pathname = window.location.pathname;
    let subdomain = useUserStore((state: any) => state.username);
    // add / in the back if doesn't exist
    if (pathname[pathname.length - 1] !== "/") {
        pathname = pathname + "/";
    }
    const effieURL = `${FE_PROTOCOL}://${subdomain}.${FE_BASE_URL}${pathname}${relativePath}`;
    const copySuccessRef = useRef<HTMLDivElement>(null);

    const copyEffieUrl = (e: any) => {
        stopEventPropagation(e);
        copySuccessRef.current?.classList.remove(
            "opacity-0",
            "-translate-y-1",
            "-z-10"
        );
        // add z-30
        copySuccessRef.current?.classList.add("z-30");
        if (!navigator.clipboard) {
            // Fallback to unsupported browsers
            copyToClipboard(effieURL ?? "");
        } else {
            navigator.clipboard.writeText(effieURL ?? "");
        }
        setTimeout(() => {
            copySuccessRef.current?.classList.add(
                "opacity-0",
                "-translate-y-1",
                "-z-10"
            );
            // remove z-30
            copySuccessRef.current?.classList.remove("z-30");
        }, 1500);
    };

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
                              isFocused
                                  ? "border-primary-400"
                                  : "hover:border-neutral-200 border-white"
                          } cursor-pointer`
                } 
                group relative flex pt-3 pb-2 px-5 border-2 bg-white rounded-xl focus:border-primary-500 w-[32vw] md:w-[44vw] lg:w-[20vw] max-w-[16rem] min-w-[8rem] min-h-[4rem]`}
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
                ) : (
                    view === "grid" ? (
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
                                    style={{ backgroundColor: DirectoryItemData?.color }}
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
                                    {DirectoryItemData?.link && DirectoryItemData?.link?.slice(8)}
                                </a>
                                {(content === "link" || content === "folder") && (
                                    <div>
                                        <button
                                            className={`group-hover:opacity-100 opacity-0 translate-x-1 group-hover:translate-x-0 absolute right-0 bottom-0 flex items-end h-full bg-white duration-100 rounded-r-xl p-1`}
                                            onClick={copyEffieUrl}
                                        >
                                            <CopyIcon className="duration-100 h-7 w-7" />
                                        </button>
                                        {/* Copy success notif */}
                                        <div
                                            ref={copySuccessRef}
                                            className={`opacity-0
                                            -translate-y-1 -z-10 absolute -bottom-12 -right-12 bg-neutral-800 text-white rounded-md py-1 px-2 shadow-lg text-left duration-300 max-w-[12rem]`}
                                        >
                                            <p className="text-xs">
                                                Link copied!
                                                <br />
                                                <a
                                                    className="text-[0.6rem] underline text-neutral-100"
                                                    href={DirectoryItemData?.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {/* if effieURl > 20 character, show 10 characters with ... */}
                                                    {effieURL.length > 20
                                                        ? `${effieURL.slice(
                                                            0,
                                                            10
                                                        )}...${effieURL.slice(
                                                            effieURL.length - 10,
                                                            effieURL.length
                                                        )}`
                                                        : effieURL}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {DirectoryItemData?.isPinned && (
                                <Image
                                    src="/icons/pin.svg"
                                    alt="link"
                                    width={28}
                                    height={28}
                                    className="absolute top-1 right-1 z-0"
                                />
                            )}
                        </div>
                    ) : ( // list view
                        <>LIST VIEW</>
                    )
                )}
            </div>
        </>
    );
}
