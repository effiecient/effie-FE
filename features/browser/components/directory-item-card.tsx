import { useState } from "react";
import Image from "next/image";
import { FE_BASE_URL, FE_PROTOCOL } from "@/config";
import { useBrowserStore, useUserStore } from "@/hooks";
import { FolderLinkData } from "@/type";

import NewFolderIcon from "@/public/icons/new-folder";
import NewLinkIcon from "@/public/icons/new-link";
import PinIcon from "@/public/icons/pin";
import DirectoriesIcon from "@/public/icons/directories";
import LinkIcon from "@/public/icons/link";
import InfoIcon from "@/public/icons/info";
import TrashIcon from "@/public/icons/trash";

import CopyButton from "../../../components/copy-button";
import { useRightContext } from "../../../components/right-context";
import { shallow } from "zustand/shallow";
import EditIcon from "@/public/icons/edit";
import OpenIcon from "@/public/icons/open";

type DirectoryItemCardProps = {
    content:
        | "new folder"
        | "new link"
        | "link"
        | "folder"
        | "display link"
        | "display folder";
    DirectoryItemData?: FolderLinkData;
    className?: string;
    disabled?: boolean;
};

export function DirectoryItemCard({
    content,
    DirectoryItemData,
    className,
    disabled = false,
}: DirectoryItemCardProps) {
    let subdomain = useUserStore((state: any) => state.subdomain);

    const [
        pathname,
        setPathname,
        view,
        setIsNewFolderModalOpen,
        setFocusedItemData,
        setFocusedPathname,
        setIsRightSideBarPropertiesOpen,
        setIsNewLinkModalOpen,
        focusedItemData,
        setDoRefetch,
        setIsMoveModalOpen,
        setIsDeleteConfirmationModalOpen,
        setIsInEditMode,
    ] = useBrowserStore(
        (state: any) => [
            state.pathname,
            state.setPathname,
            state.view,
            state.setIsNewFolderModalOpen,
            state.setFocusedItemData,
            state.setFocusedPathname,
            state.setIsRightSideBarPropertiesOpen,
            state.setIsNewLinkModalOpen,
            state.focusedItemData,
            state.setDoRefetch,
            state.setIsMoveModalOpen,
            state.setIsDeleteConfirmationModalOpen,
            state.setIsInEditMode,
        ],
        shallow
    );

    const [linkIconExists, setLinkIconExists] = useState(true);

    const handleClick = () => {
        if (content === "new folder") {
            setIsNewFolderModalOpen(true);
        } else if (content === "new link") {
            setIsNewLinkModalOpen(true);
        } else if (content === "link" || content === "folder") {
            setFocusedItemData(DirectoryItemData);
            setFocusedPathname(pathname);
            setIsInEditMode(false);
        }
    };

    const handleDoubleClick = () => {
        if (content === "folder") {
            let newPathname = `${
                pathname[pathname.length - 1] === "/"
                    ? pathname
                    : pathname + "/"
            }${DirectoryItemData?.relativePath}`;

            setPathname(newPathname);
            setIsInEditMode(false);

            setDoRefetch(true);
        } else if (content === "link") {
            // open url in new page
            window.open(DirectoryItemData?.link, "_blank");
        }
    };
    const isFocused =
        focusedItemData?.relativePath === DirectoryItemData?.relativePath;

    const { setOptions, handleRightClick } = useRightContext();

    // add / in the back if doesn't exist

    const effieURL = `${FE_PROTOCOL}://${subdomain}.${FE_BASE_URL}${
        pathname[pathname.length - 1] === "/" ? pathname : pathname + "/"
    }${DirectoryItemData?.relativePath}`;
    return (
        <>
            <div
                onClick={() => {
                    if (!disabled) {
                        handleClick();
                    }
                }}
                onDoubleClick={() => {
                    if (!disabled) {
                        handleDoubleClick();
                    }
                }}
                onContextMenu={(e) => {
                    if (!disabled) {
                        if (content === "new folder") {
                            setOptions([
                                {
                                    title: "create new folder",
                                    icon: <NewFolderIcon fillClassName="fill-neutral-900" />,
                                    onClick: () => {
                                        setIsNewFolderModalOpen(true);
                                    },
                                },
                            ]);
                        } else if (content === "new link") {
                            setOptions([
                                {
                                    title: "create new link",
                                    icon: <NewLinkIcon fillClassName="fill-neutral-900" />,
                                    onClick: () => {
                                        setIsNewLinkModalOpen(true);
                                    },
                                },
                            ]);
                        } else {
                            setOptions([
                                {
                                    title: "open",
                                    icon: <OpenIcon fillClassName="fill-neutral-900" />,
                                    onClick: handleDoubleClick
                                },
                                {
                                    title: "info",
                                    icon: <InfoIcon fillClassName="fill-neutral-900" />,
                                    onClick: () => {
                                        setFocusedItemData(DirectoryItemData);
                                        setFocusedPathname(pathname);
                                        setIsInEditMode(false);
                                        setIsRightSideBarPropertiesOpen(true);
                                    },
                                },
                                {
                                    title: "move",
                                    icon: <DirectoriesIcon fillClassName="fill-neutral-900" />,
                                    onClick: () => {
                                        setFocusedItemData(DirectoryItemData);
                                        setFocusedPathname(pathname);
                                        setIsMoveModalOpen(true);
                                    },
                                },
                                {
                                    title: "delete",
                                    icon: <TrashIcon fillClassName="fill-neutral-900" />,
                                    onClick: () => {
                                        setFocusedItemData(DirectoryItemData);
                                        setFocusedPathname(pathname);
                                        setIsDeleteConfirmationModalOpen(true);
                                    },
                                },
                                {
                                    title: "edit",
                                    icon: <EditIcon fillClassName="fill-neutral-900" />,
                                    onClick: () => {
                                        setFocusedItemData(DirectoryItemData);
                                        setFocusedPathname(pathname);
                                        setIsInEditMode(true);
                                        setIsRightSideBarPropertiesOpen(true);
                                    },
                                },
                            ]);
                        }
                        handleRightClick(e);
                    }
                }}
                className={`
                ${className} 
                ${
                    content.slice(0, 3) === "new"
                        ? "items-center justify-center gap-2 border-white hover:bg-primary-50 hover:border-primary-50 cursor-pointer duration-200"
                        : content.slice(0, 7) === "display"
                        ? "flex-col gap-1 border-neutral-200"
                        : `flex-col gap-1 ${
                              view === "grid"
                                  ? isFocused
                                      ? "border-primary-400"
                                      : "hover:border-neutral-200 border-white"
                                  : isFocused
                                  ? "bg-primary-100/30"
                                  : "hover:bg-neutral-100/50"
                          } cursor-pointer`
                } 
                ${
                    view === "grid"
                        ? "bg-white border-2 w-[100%] min-h-[4rem] rounded-xl focus:border-primary-500 pt-3 pb-2 px-5 flex"
                        : "py-3 grid grid-cols-[24px_1fr_1fr_60px] md:grid-cols-[24px_1fr_3fr_8rem_60px] items-center gap-4 border-b-2 border-dashed border-neutral-200"
                }
                group relative select-none`}
            >
                {/* images */}
                {content === "new folder" ? (
                    <>
                        <NewFolderIcon className="h-7 w-7 text-primary-500" />
                        <h6 className="text-primary-500 ml-2">New folder</h6>
                    </>
                ) : content === "new link" ? (
                    <>
                        <NewLinkIcon className="h-7 w-7 text-primary-500" />
                        <h6 className="text-primary-500 ml-2">New link</h6>
                    </>
                ) : view === "grid" ? (
                    <div className={`flex flex-row`}>
                        {content === "link" || content === "display link" ? (
                            <div className="mr-2 w-1/5">
                                <Image
                                    src={linkIconExists ? `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${DirectoryItemData?.link}&size=64` : "/favicon.svg"}
                                    alt="link"
                                    width={28}
                                    height={28}
                                    onError={() => {
                                        setLinkIconExists(false);
                                    }}
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
                            <h6
                                className={`text-neutral-800 whitespace-nowrap overflow-hidden overflow-ellipsis`}
                            >
                                {DirectoryItemData?.title}
                            </h6>
                            <p
                                className={`text-neutral-600 text-xs inline-block max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis`}
                            >
                                {DirectoryItemData?.link &&
                                    DirectoryItemData?.link?.slice(8)}
                            </p>
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
                        <p className="font-bold text-neutral-900 overflow-hidden overflow-ellipsis line-clamp-2">
                            {DirectoryItemData?.title}
                        </p>
                        <a
                            href={DirectoryItemData?.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`hover:text-primary-500 text-neutral-600 un hover:decoration-primary-500 inline-block max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis line-clamp-2`}
                        >
                            {DirectoryItemData?.link &&
                                DirectoryItemData?.link?.slice(8)}
                        </a>
                        <p className="text-neutral-600 whitespace-nowrap hidden md:block">
                            {DirectoryItemData?.publicAccess}
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
