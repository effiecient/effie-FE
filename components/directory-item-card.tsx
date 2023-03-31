import { useRef } from "react";
import CopyIcon from "@/public/icons/copy";
import Image from "next/image";
import NewLink from "./create-modal/new-link";
import NewFolder from "./create-modal/new-folder";
import { copyToClipboard } from "@/utils";
import { FE_BASE_URL, FE_PROTOCOL } from "@/config";
import { useUserStore } from "@/hooks";
import { useRouter } from "next/router";
import { FolderLinkData } from "@/type";

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
};

export default function DirectoryItemCard({
    content,
    DirectoryItemData,
    onClick,
    onDoubleClick,
    className,
    relativePath,
    isFocused = false,
}: DirectoryItemCardProps) {
    const router = useRouter();
    let pathname = router.asPath;
    let subdomain = useUserStore((state: any) => state.username);
    // add / in the back if doesn't exist
    if (pathname[pathname.length - 1] !== "/") {
        pathname = pathname + "/";
    }
    const effieURL = `${FE_PROTOCOL}://${subdomain}.${FE_BASE_URL}${pathname}${relativePath}`;
    const copySuccessRef = useRef<HTMLDivElement>(null);

    const copyEffieUrl = () => {
        copySuccessRef.current?.classList.remove("opacity-0", "-translate-y-1");
        if (!navigator.clipboard) {
            // Fallback to unsupported browsers
            copyToClipboard(effieURL ?? "");
        } else {
            navigator.clipboard.writeText(effieURL ?? "");
        }
        setTimeout(() => {
            copySuccessRef.current?.classList.add(
                "opacity-0",
                "-translate-y-1"
            );
        }, 1500);
    };

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
                        : `flex-col gap-1 hover:border-neutral-200 cursor-pointer border-white`
                } 
                group relative flex pt-3 pb-2 px-5 bg-white rounded-xl border focus:border-primary-500 w-[32vw] md:w-[44vw] lg:w-[20vw] max-w-[16rem] min-w-[8rem] min-h-[4rem] overflow-hidden`}
            >
                {/* images */}
                {content === "new folder" ? (
                    <>
                        <Image
                            src="/icons/new-folder.svg"
                            alt="new folder"
                            width={28}
                            height={28}
                        />
                        <h6 className="text-primary-500 ml-2">New folder</h6>
                    </>
                ) : content === "new link" ? (
                    <>
                        <Image
                            src="/icons/new-link.svg"
                            alt="new link"
                            width={28}
                            height={28}
                        />
                        <h6 className="text-primary-500 ml-2">New link</h6>
                    </>
                ) : (
                    <div className="flex">
                        {content === "link" || content === "display link" ? (
                            <div className="mr-2">
                                <Image
                                    src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${DirectoryItemData?.link}&size=64`}
                                    alt="link"
                                    width={28}
                                    height={28}
                                />
                            </div>
                        ) : (
                            <div
                                className={`absolute left-0 top-0 h-full w-2 rounded-l-xl`}
                                style={{ backgroundColor: "#FFF" }}
                            />
                        )}
                        {/* link or folder data */}
                        <div>
                            <h6 className={`text-neutral-800`}>
                                {DirectoryItemData?.title}
                                {/* TODO: handle isFocused */}
                                {isFocused && "focus"}
                                {DirectoryItemData?.isPinned && "pinned"}
                            </h6>
                            <a
                                href={DirectoryItemData?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`hover:text-primary-500 text-neutral-600 text-xs un hover:decoration-primary-500 inline-block max-w-full overflow-hidden`}
                            >
                                {DirectoryItemData?.url}
                            </a>
                            {(content === "link" || content === "folder") && (
                                <button
                                    className="group-hover:opacity-100 opacity-0 translate-x-1 group-hover:translate-x-0 absolute right-0 bottom-0 flex items-end h-full p-2 z-10 bg-white duration-100 rounded-r-xl"
                                    onClick={copyEffieUrl}
                                >
                                    <CopyIcon className="duration-100 h-7 w-7" />
                                    {/* Copy success notif */}
                                    <div
                                        ref={copySuccessRef}
                                        className="opacity-0 -translate-y-1 absolute top-14 bg-neutral-900/50 text-white rounded-md py-1 px-2 shadow-lg text-left duration-300 max-w-[12rem]"
                                    >
                                        <p className="text-xs">
                                            Link copied!
                                            <br />
                                            <span className="text-[0.6rem] underline text-neutral-100">
                                                {effieURL}
                                            </span>
                                        </p>
                                    </div>
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
