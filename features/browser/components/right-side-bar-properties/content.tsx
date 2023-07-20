import { FolderLinkData, UpdateFolderReq, UpdateLinkReq } from "@/type";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { copyToClipboard } from "@/utils";
import Image from "next/image";

import { Button, Input, Select } from "@/ui";

import { BE_BASE_URL, FE_BASE_URL, FE_PROTOCOL } from "@/config";

import { useBrowserStore, useSnackbarStore, useUserStore } from "@/hooks";

import editIcon from "@/public/icons/edit.svg";
import trashIcon from "@/public/icons/trash.svg";
import cancelIcon from "@/public/icons/cancel.svg";
import saveIcon from "@/public/icons/save.svg";
import pinIcon from "@/public/icons/pin.svg";
import pinBlackIcon from "@/public/icons/pin-black.svg";

import drawerImage from "@/public/images/drawer.svg";

import { useFetchEffieBE } from "@/hooks";

import { getObjectDifferences, checkIfObjectSame } from "@/utils";
import { useLegacyState } from "@/hooks";

const ShareConfigurationOptions = ["none", "viewer", "editor"];

export const Content = () => {
    const subdomain = useUserStore((state: any) => state.subdomain);
    const [
        pathname,
        focusedItemData,
        setDoRefetch,
        setIsConfirmationModalOpen,
        isClickedFromBreadcrumb,
        setIsMoveModalOpen,
        setItemPathToMove,
    ] = useBrowserStore((state: any) => [
        state.pathname,
        state.focusedItemData,
        state.setDoRefetch,
        state.setIsConfirmationModalOpen,
        state.isClickedFromBreadcrumb,
        state.setIsMoveModalOpen,
        state.setItemPathToMove,
    ]);
    const [{ isLoading, isError, response }, fetcher] = useFetchEffieBE();

    const [
        setShowSnackbar,
        setSnackbarType,
        setSnackbarTitle,
        setSnackbarMessage,
    ] = useSnackbarStore((state: any) => [
        state.setShowSnackbar,
        state.setSnackbarType,
        state.setSnackbarTitle,
        state.setSnackbarMessage,
    ]);
    // right side bar variable
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    const [editedItemData, setEditedItemData] =
        useLegacyState<any>(focusedItemData);

    const [localPathname, setLocalPathname] = useState(pathname);

    const [localRelativePath, setLocalRelativePath] = useState();
    useState("");
    const [effieLink, setEffieLink] = useState("");

    const [startUpdate, setStartUpdate] = useState(false);

    // reset everything when the focusedItemData is changed
    useEffect(() => {
        setIsInEditMode(false);
        setIsChanged(false);
        setIsConfirmationModalOpen(false);
        setEditedItemData(focusedItemData, true);

        let tempLocalPathname;

        if (isClickedFromBreadcrumb) {
            // truncate from the last slash
            tempLocalPathname = pathname.substring(
                0,
                pathname.lastIndexOf("/")
            );
            // add "/" if the pathname doesn't start with "/"
            if (tempLocalPathname[0] !== "/") {
                tempLocalPathname = `/${tempLocalPathname}`;
            }
            setLocalPathname(tempLocalPathname);

            // without / at start
            setLocalRelativePath(
                pathname.substring(pathname.lastIndexOf("/") + 1)
            );
            setEffieLink(
                `${FE_PROTOCOL}://${subdomain}.${FE_BASE_URL}${pathname}`
            );
        } else {
            tempLocalPathname = pathname;
            setLocalPathname(tempLocalPathname);

            setLocalRelativePath(focusedItemData?.relativePath);
            setEffieLink(
                `${FE_PROTOCOL}://${subdomain}.${FE_BASE_URL}${tempLocalPathname}${
                    tempLocalPathname[tempLocalPathname.length - 1] !== "/"
                        ? "/"
                        : ""
                }${focusedItemData?.relativePath}`
            );
        }
    }, [focusedItemData]);

    // reset editedItemData when the exit edit mode
    useEffect(() => {
        if (!isInEditMode) {
            setEditedItemData(focusedItemData);
            setIsChanged(false);
        }
    }, [isInEditMode]);

    // set isChanged when the editedItemData is changed
    useEffect(() => {
        // check if the focusedItemData and editedItemData are the same
        const isSame = checkIfObjectSame(focusedItemData, editedItemData);

        // TODO: handle bug input failed when setIsChanged is called
        setIsChanged(!isSame);
    }, [editedItemData]);

    useEffect(() => {
        if (startUpdate) {
            let focusedItemDataDifferences = getObjectDifferences(
                focusedItemData,
                editedItemData
            );

            if (focusedItemDataDifferences.relativePath !== undefined) {
                focusedItemDataDifferences["newRelativePath"] =
                    focusedItemDataDifferences.relativePath;
                delete focusedItemDataDifferences.relativePath;
            }
            fetcher({
                url: `${BE_BASE_URL}/directory/${focusedItemData.type}`,
                method: "PATCH",
                body: {
                    username: subdomain,
                    path: localPathname,
                    relativePath: localRelativePath,
                    ...focusedItemDataDifferences,
                },
            });
        }
    }, [startUpdate]);

    // handle update
    useEffect(() => {
        if (startUpdate) {
            if (isError) {
                setShowSnackbar(true);
                setSnackbarType("error");
                setSnackbarTitle("Update error!");
                setSnackbarMessage(response.message);
                setStartUpdate(false);
                setIsInEditMode(true);
            } else if (isLoading) {
            } else {
                setStartUpdate(false);
                setIsInEditMode(false);
                setDoRefetch(true);
            }
        }
    }, [isLoading]);

    function handleSaveButtonClick() {
        setStartUpdate(true);
    }

    function handleDeleteButtonClick() {
        setIsConfirmationModalOpen(true);
    }

    function handleMoveButtonClick() {
        setItemPathToMove(
            `${pathname}${pathname === "/" ? "" : "/"}${
                focusedItemData.relativePath
            }`
        );
        setIsMoveModalOpen(true);
    }

    return (
        <>
            {focusedItemData === undefined ? (
                <div className="mt-6 lg:mt-16 flex flex-col justify-center items-center">
                    <Image
                        src={drawerImage}
                        alt="drawer"
                        width={200}
                        height={200}
                    />
                    <p className="text-neutral-700 mt-12">
                        Select an item to see its details here.
                    </p>
                </div>
            ) : (
                <>
                    {/* data */}
                    {focusedItemData.type === "folder" ? (
                        // folder
                        isInEditMode ? (
                            // folder in edit mode
                            <>
                                <div className="mt-6 lg:mt-16 h-full overflow-auto lg:mb-4">
                                    <div className="flex flex-col break-words gap-8 p-1">
                                        <Input
                                            type="text"
                                            placeholder={focusedItemData.title}
                                            className="text-lg my-1"
                                            onChange={(e: any) => {
                                                setEditedItemData({
                                                    title:
                                                        e.target.value === ""
                                                            ? focusedItemData.title
                                                            : e.target.value,
                                                });
                                            }}
                                        />
                                        <div className="flex justify-end">
                                            <Image
                                                className="cursor-pointer"
                                                src={
                                                    editedItemData.isPinned
                                                        ? pinBlackIcon
                                                        : pinIcon
                                                }
                                                alt="pin"
                                                width={30}
                                                height={30}
                                                onClick={() => {
                                                    setEditedItemData({
                                                        isPinned:
                                                            !editedItemData.isPinned,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h5 className="text-neutral-800">
                                                Link
                                            </h5>
                                            <p className="underline text-neutral-700 hover:text-neutral-900">
                                                {effieLink}
                                            </p>
                                            <Input
                                                type="text"
                                                placeholder={
                                                    focusedItemData.relativePath
                                                }
                                                className="my-1"
                                                onChange={(e: any) => {
                                                    setEditedItemData({
                                                        relativePath:
                                                            e.target.value ===
                                                            ""
                                                                ? focusedItemData.relativePath
                                                                : e.target
                                                                      .value,
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h5 className="text-neutral-800">
                                                Public Access
                                            </h5>
                                            <Select
                                                options={ShareConfigurationOptions.map(
                                                    (option) => ({
                                                        value: option,
                                                        label: option,
                                                    })
                                                )}
                                                onChange={(e: any) => {
                                                    setEditedItemData({
                                                        publicAccess:
                                                            e.target.value,
                                                    });
                                                }}
                                                defaultValue={
                                                    focusedItemData.publicAccess
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            // folder not in edit mode
                            <div className="mt-6 lg:mt-16 h-full overflow-auto lg:mb-4">
                                <div className="flex flex-col break-words p-1">
                                    <div className="pb-2">
                                        <a
                                            className="underline text-neutral-700 hover:text-neutral-900"
                                            href={effieLink}
                                        >
                                            {effieLink}
                                        </a>
                                    </div>
                                    <div className="flex justify-between pb-1">
                                        <h4 className="text-neutral-900">
                                            {focusedItemData.title}
                                        </h4>
                                        <div className="flex justify-end">
                                            <Image
                                                src={
                                                    editedItemData.isPinned
                                                        ? pinBlackIcon
                                                        : pinIcon
                                                }
                                                alt="pin"
                                                width={30}
                                                height={30}
                                            />
                                        </div>
                                    </div>
                                    {/* format date to DD/MM/YYYY */}
                                    <p className="text-neutral-400 pb-4 md:pb-12">
                                        created at{" "}
                                        {new Date(
                                            focusedItemData.createdAt
                                        ).toLocaleDateString()}
                                    </p>

                                    <div className="pb-4 md:pb-12">
                                        <h5 className="text-neutral-700">
                                            Public Access
                                        </h5>
                                        <p className="text-neutral-500">
                                            {focusedItemData.publicAccess}
                                        </p>
                                    </div>

                                    <div>
                                        <h5 className="text-neutral-700">
                                            Contents
                                        </h5>
                                        <div className="flex">
                                            <div className="mr-4">
                                                <p className="text-neutral-500">
                                                    Folders
                                                </p>
                                                <div className="flex">
                                                    <h4 className="border-l-8 border-primary-500 my-2 p-2 text-neutral-700">
                                                        {
                                                            focusedItemData.folderCount
                                                        }
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-neutral-500">
                                                    Link
                                                </p>
                                                <div className="flex">
                                                    <h4 className="border-l-8 border-tertiary-500 my-2 p-2 text-neutral-700">
                                                        {
                                                            focusedItemData.linkCount
                                                        }
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ) : // link
                    isInEditMode ? (
                        // link in edit mode
                        <>
                            <div className="mt-6 lg:mt-16 h-full overflow-auto lg:mb-4">
                                <div className="flex flex-col break-words gap-8 p-1">
                                    <Input
                                        type="text"
                                        placeholder={focusedItemData.title}
                                        className="text-lg my-1"
                                        onChange={(e: any) => {
                                            setEditedItemData({
                                                title:
                                                    e.target.value === ""
                                                        ? focusedItemData.title
                                                        : e.target.value,
                                            });
                                        }}
                                    />
                                    <div className="flex justify-end">
                                        <Image
                                            className="cursor-pointer"
                                            src={
                                                editedItemData.isPinned
                                                    ? pinBlackIcon
                                                    : pinIcon
                                            }
                                            alt="pin"
                                            width={30}
                                            height={30}
                                            onClick={() => {
                                                setEditedItemData({
                                                    isPinned:
                                                        !editedItemData.isPinned,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h5 className="text-neutral-800">
                                            Link
                                        </h5>
                                        <p className="underline text-neutral-700 hover:text-neutral-900">
                                            {effieLink}
                                        </p>
                                        <Input
                                            type="text"
                                            placeholder={
                                                focusedItemData.relativePath
                                            }
                                            className="my-1"
                                            onChange={(e: any) => {
                                                setEditedItemData({
                                                    relativePath:
                                                        e.target.value === ""
                                                            ? focusedItemData.relativePath
                                                            : e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h5 className="text-neutral-800">
                                            Redirects to
                                        </h5>
                                        <Input
                                            placeholder={focusedItemData.link}
                                            className="my-1"
                                            onChange={(e: any) => {
                                                setEditedItemData({
                                                    link:
                                                        e.target.value === ""
                                                            ? focusedItemData.link
                                                            : e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h5 className="text-neutral-800">
                                            Public Access
                                        </h5>
                                        <Select
                                            options={ShareConfigurationOptions.map(
                                                (option) => ({
                                                    value: option,
                                                    label: option,
                                                })
                                            )}
                                            onChange={(e: any) => {
                                                setEditedItemData({
                                                    publicAccess:
                                                        e.target.value,
                                                });
                                            }}
                                            defaultValue={
                                                focusedItemData.publicAccess
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        // link not in edit mode
                        <div className="mt-6 lg:mt-16 h-full overflow-auto lg:mb-4">
                            <div className="flex flex-col break-words gap-8 p-1">
                                <h4 className="text-neutral-900">
                                    {focusedItemData.title}
                                </h4>
                                <div className="flex justify-end">
                                    <Image
                                        src={
                                            editedItemData.isPinned
                                                ? pinBlackIcon
                                                : pinIcon
                                        }
                                        alt="pin"
                                        width={30}
                                        height={30}
                                    />
                                </div>
                                <div>
                                    <h5 className="text-neutral-800">Link</h5>
                                    <Link
                                        className="underline text-neutral-700 hover:text-neutral-900"
                                        href={focusedItemData.link}
                                        target="_blank"
                                    >
                                        {effieLink}
                                    </Link>
                                </div>
                                <div>
                                    <h5 className="text-neutral-800">
                                        Redirects to
                                    </h5>
                                    <Link
                                        href={focusedItemData.link}
                                        className="underline text-neutral-700 hover:text-neutral-900"
                                        target="_blank"
                                    >
                                        {focusedItemData.link}
                                    </Link>
                                </div>
                                <div>
                                    <h5 className="text-neutral-800">
                                        Public Access
                                    </h5>
                                    <p className="text-neutral-700">
                                        {focusedItemData.publicAccess}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="bottom-12 w-full flex flex-col gap-4">
                        {isInEditMode ? (
                            <>
                                <Button
                                    className="w-full flex justify-center items-center gap-1 h-12"
                                    onClick={handleSaveButtonClick}
                                    disabled={!isChanged}
                                >
                                    {startUpdate ? (
                                        isLoading ? (
                                            <div className="animate-pulse text-2xl flex">
                                                ...
                                            </div>
                                        ) : (
                                            <>success</>
                                        )
                                    ) : (
                                        <>
                                            <Image
                                                src={saveIcon}
                                                alt="save icon"
                                                height={24}
                                                width={24}
                                            />
                                            Save changes
                                        </>
                                    )}
                                </Button>
                                <Button
                                    className="w-full flex justify-center items-center gap-1 h-12"
                                    borderMode
                                    onClick={() => setIsInEditMode(false)}
                                >
                                    <Image
                                        src={cancelIcon}
                                        alt="cancel"
                                        height={24}
                                        width={24}
                                    />
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    className="w-full flex justify-center items-center gap-1 h-12"
                                    borderMode
                                    onClick={() => setIsInEditMode(true)}
                                >
                                    <Image
                                        src={editIcon}
                                        alt="edit icon"
                                        height={24}
                                        width={24}
                                    />
                                    Edit Properties
                                </Button>
                                <Button
                                    className="w-full flex justify-center items-center gap-1 h-12"
                                    type="danger"
                                    borderMode
                                    onClick={handleDeleteButtonClick}
                                >
                                    <Image
                                        src={trashIcon}
                                        alt="trash icon"
                                        height={24}
                                        width={24}
                                    />
                                    Delete
                                </Button>
                                <Button onClick={handleMoveButtonClick}>
                                    move
                                </Button>
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    );
};
