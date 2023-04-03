import { FolderLinkData, UpdateFolderReq, UpdateLinkReq } from "@/type";
import CopyIcon from "@/public/icons/copy";
import Link from "next/link";
import { useRef, useState } from "react";
import { copyToClipboard } from "@/utils";
import { Button } from "@/ui";
import editIcon from "@/public/icons/edit.svg";
import Image from "next/image";
import Input from "./input";
import Modal from "./modal";
import ConfirmationModal from "./create-modal/confirmation-modal";
import { BE_BASE_URL, FE_BASE_URL, FE_PROTOCOL } from "@/config";
import { useFetchEffieBE, useUserStore } from "@/hooks";
import { useRouter } from "next/router";

type SideBarPropertiesProps = {
    isOpen: boolean;
    itemData: FolderLinkData;
    className?: string;
    relativePath: string;
};

export default function SideBarProperties({
    isOpen = false,
    itemData,
    className,
    relativePath,
}: SideBarPropertiesProps) {
    const [newTitle, setNewTitle] = useState("");
    const [newLink, setNewLink] = useState("");
    const [newRelativePath, setNewRelativePath] = useState("");
    const [newIsShared, setNewIsShared] = useState<boolean>(false);
    const [sharingUpdated, setSharingUpdated] = useState(false);
    const [body, setBody] = useState<any>({});
    const [readyToDelete, setReadyToDelete] = useState(false);
    const [readyToUpdate, setReadyToUpdate] = useState(false);
    console.log("itemData");
    console.log(itemData);
    const isEdit = false;
    const isEditAccess = false;
    const fullRelativePath = "fullRelativePath";
    // Extract path without last path
    const router = useRouter();
    let pathname = router.asPath;
    let subdomain = useUserStore((state: any) => state.username);
    // add / in the back if doesn't exist
    if (pathname[pathname.length - 1] !== "/") {
        pathname = pathname + "/";
    }
    const effieURL = `${FE_PROTOCOL}://${subdomain}.${FE_BASE_URL}${pathname}${relativePath}`;
    const pathWithoutLastPath = effieURL?.split("/").slice(0, -1).join("/");
    const copySuccessRef = useRef<HTMLDivElement>(null);
    const copyEffieUrl = () => {
        copySuccessRef.current?.classList.remove("opacity-0", "-translate-y-1");
        if (!navigator.clipboard) {
            // Fallback to unsupported browsers
            copyToClipboard(effieURL);
        } else {
            navigator.clipboard.writeText(effieURL);
        }
        setTimeout(() => {
            copySuccessRef.current?.classList.add(
                "opacity-0",
                "-translate-y-1"
            );
        }, 1500);
    };

    // Handle delete click
    const handleDeleteClick = () => {
        setReadyToDelete(true);
    };
    let { isLoading, isError, response } = useFetchEffieBE({
        url: readyToDelete
            ? `${BE_BASE_URL}/directory/${subdomain}/${fullRelativePath}`
            : "",
        method: "DELETE",
    });

    if (readyToDelete && response && !isError && !isLoading) {
        router.reload();
    }

    // Handle save click
    const handleSaveClick = () => {
        let path = window.location.pathname;
        if (newRelativePath && newRelativePath.includes(" ")) {
            alert("Relative path cannot contain space");
            return;
        }
        if (itemData.type === "link") {
            const data: UpdateLinkReq = {
                username: subdomain,
                path: path,
                title: newTitle === "" ? undefined : newTitle,
                link: newLink === "" ? undefined : newLink,
                relativePath: relativePath,
                newRelativePath:
                    newRelativePath === "" ? undefined : newRelativePath,
                shareConfiguration: {
                    isShared: sharingUpdated
                        ? newIsShared
                        : itemData.shareConfiguration.isShared,
                    sharedPrivilege: "read",
                },
            };
            setBody(data);
        } else {
            const data: UpdateFolderReq = {
                username: subdomain,
                path: path,
                title: newTitle === "" ? undefined : newTitle,
                relativePath: relativePath,
                newRelativePath:
                    newRelativePath === "" ? undefined : newRelativePath,
                shareConfiguration: {
                    isShared: sharingUpdated
                        ? newIsShared
                        : itemData.shareConfiguration.isShared,
                    sharedPrivilege: "read",
                },
            };
            setBody(data);
        }
        setReadyToUpdate(true);
    };
    let {
        isLoading: isLoadingUpdate,
        isError: isErrorUpdate,
        response: responseUpdate,
    } = useFetchEffieBE({
        url: readyToUpdate
            ? `${BE_BASE_URL}/directory/${
                  itemData.type === "folder" ? "folder" : "link"
              }`
            : "",
        method: "PATCH",
        body: body,
    });
    console.log(responseUpdate);
    console.log(body);
    if (readyToUpdate && responseUpdate && !isErrorUpdate && !isLoadingUpdate) {
        router.reload();
    }

    return (
        <RightSideBar isOpen={isOpen} className={className}>
            {/* content */}
            {itemData === undefined ? (
                <>nothing is currently selected</>
            ) : (
                <>
                    <div className="mb-7">
                        {isEdit ? (
                            <div className="mb-4">
                                <p className="text-md font-semibold mb-2">
                                    {pathWithoutLastPath + "/"}
                                </p>
                                <Input
                                    type="text"
                                    className="flex w-full flex-wrap text-md font-semibold"
                                    id="relative-path-input"
                                    name="relative-path-input"
                                    placeholder={relativePath}
                                    onChange={(e) =>
                                        setNewRelativePath(e.target.value)
                                    }
                                ></Input>
                            </div>
                        ) : (
                            <div className="flex flex-row justify-between items-center lg:gap-1 mb-3">
                                <div>
                                    <Link
                                        href={effieURL ?? ""}
                                        className="text-primary-400 underline"
                                    >
                                        {effieURL}
                                    </Link>
                                </div>
                                <div>
                                    <button
                                        className="opacity-100 h-full p-2 z-10 bg-white duration-100 rounded-r-xl"
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
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}

                        {isEdit ? (
                            <Input
                                type="text"
                                className="flex w-full flex-wrap text-lg font-bold"
                                id="title-input"
                                name="title-input"
                                placeholder={itemData?.title}
                                onChange={(e) => setNewTitle(e.target.value)}
                            ></Input>
                        ) : (
                            <h3>{itemData?.title}</h3>
                        )}
                    </div>
                    {itemData.type === "link" && !isEdit && (
                        <div className="mb-7">
                            <h5>Link</h5>
                            <Link href={itemData.link} className="underline">
                                {itemData.link}
                            </Link>
                        </div>
                    )}
                    {itemData.type === "link" && isEdit && (
                        <div className="mb-7">
                            <h5>Link</h5>
                            <Input
                                type="text"
                                className="flex w-full flex-wrap"
                                id="link-input"
                                name="link-input"
                                placeholder={itemData?.link}
                                onChange={(e) => setNewLink(e.target.value)}
                            ></Input>
                        </div>
                    )}
                    <div>
                        <h5>Access</h5>
                        <div className="flex flex-row justify-between items-center">
                            {isEditAccess || isEdit ? (
                                <div className="w-full">
                                    <select
                                        className="bg-transparent mt-1 py-2 px-1 w-full border-primary-300 border-2 rounded-lg font-sans"
                                        defaultValue={
                                            itemData.shareConfiguration.isShared
                                                ? "public"
                                                : "private"
                                        }
                                        onChange={(e) => {
                                            setNewIsShared(
                                                e.target.value === "public"
                                            );
                                            setSharingUpdated(true);
                                        }}
                                    >
                                        <option
                                            value="public"
                                            className="hover:bg-primary-400"
                                        >
                                            Public
                                        </option>
                                        <option
                                            value="private"
                                            className="hover:bg-primary-400"
                                        >
                                            Private
                                        </option>
                                    </select>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        {itemData.shareConfiguration
                                            .isShared ? (
                                            <p>Public</p>
                                        ) : (
                                            <p>Private</p>
                                        )}
                                    </div>
                                    <div>
                                        <Button
                                            type="custom"
                                            className="bg-none text-primary-500 border-primary-500 border-2 hover:bg-primary-500 hover:text-white"
                                            onClick={() => {
                                                // setIsEditAccess(true);
                                            }}
                                        >
                                            change
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="mt-7 flex justify-center flex-col gap-4">
                        {isEdit || isEditAccess ? (
                            <div className="flex flex-col gap-4 w-full justify-between">
                                <Button
                                    type="custom"
                                    onClick={() => {
                                        // setIsEdit(false);
                                        // setIsEditAccess(false);
                                    }}
                                    className="hover:bg-danger-300 border-danger-300 border-2 text-danger-300 hover:text-black"
                                >
                                    <div className="flex flex-row gap-1.5 items-center justify-center">
                                        Cancel
                                    </div>
                                </Button>
                                <Button
                                    type="custom"
                                    className="hover:bg-success-300 border-success-300 border-2"
                                    onClick={handleSaveClick}
                                >
                                    <div className="flex flex-row gap-1.5 items-center justify-center">
                                        Save
                                    </div>
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Button
                                    type="custom"
                                    className="bg-none text-primary-500 border-primary-500 border-2"
                                    // onClick={() => setIsEdit(true)}
                                >
                                    <div className="flex flex-row gap-1.5 items-center justify-center">
                                        <Image src={editIcon} alt="Edit Icon" />
                                        Edit Properties
                                    </div>
                                </Button>
                                <Button
                                    type="custom"
                                    className="bg-none hover:bg-danger-300 border-danger-300 border-2 text-danger-300 hover:text-black"
                                    onClick={handleDeleteClick}
                                >
                                    <div className="flex flex-row gap-1.5 items-center justify-center">
                                        Delete
                                    </div>
                                </Button>
                            </>
                        )}
                    </div>
                </>
            )}
        </RightSideBar>
    );
}

// TODO: move to a separate file
type RightSideBarProps = {
    children: React.ReactNode;
    isOpen?: boolean;
    className?: string;
};
const RightSideBar = ({
    children,
    isOpen = false,
    className = "",
}: RightSideBarProps) => {
    return (
        <div
            className={`${className}overflow-hidden transition-all duration-500 ease-in-out bg-white ${

                isOpen ? "w-1/3" : "w-6"
            }`}
        >
            <div className="m-6 relative w-[20vw] h-[86vh]">
                <div className={`w-full h-full absolute`}>{children}</div>
            </div>
        </div>
    );
};
