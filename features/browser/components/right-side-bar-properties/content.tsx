import Link from "next/link";
import { useEffect, useState } from "react";
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
        focusedItemData,
        focusedPathname,
        setDoRefetch,
        setIsDeleteConfirmationModalOpen,
        setIsMoveModalOpen,
        isInEditMode,
        setIsInEditMode,
    ] = useBrowserStore((state: any) => [
        state.focusedItemData,
        state.focusedPathname,
        state.setDoRefetch,
        state.setIsDeleteConfirmationModalOpen,
        state.setIsMoveModalOpen,
        state.isInEditMode,
        state.setIsInEditMode,
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
    const [isChanged, setIsChanged] = useState(false);

    const [editedItemData, setEditedItemData] =
        useLegacyState<any>(focusedItemData);

    useState("");
    const [effieLink, setEffieLink] = useState("");

    const [startUpdate, setStartUpdate] = useState(false);

    // reset everything when the focusedItemData is changed
    useEffect(() => {
        // setIsInEditMode(false);
        setIsChanged(false);
        // setIsDeleteConfirmationModalOpen(false);
        setEditedItemData(focusedItemData, true);

        setEffieLink(
            `${FE_PROTOCOL}://${subdomain}.${FE_BASE_URL}${focusedPathname}${
                focusedPathname === "/" ? "" : "/"
            }${focusedItemData?.relativePath}`
        );
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
                url: `${BE_BASE_URL}/directory/update/${subdomain}${focusedPathname}${
                    focusedPathname === "/" ? "" : "/"
                }${focusedItemData.relativePath}`,
                method: "PATCH",
                body: {
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
        setIsDeleteConfirmationModalOpen(true);
    }

    function handleMoveButtonClick() {
        setIsMoveModalOpen(true);
    }

    // return when no data
    if (focusedItemData === undefined) {
        return (
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
        );
    }

    // return when data is available
    return (
        <>
            <>
                {/* data */}
                {focusedItemData.type === "folder"
                    ? // folder
                      isInEditMode
                        ? // folder in edit mode
                          FolderEditMode(
                              focusedItemData,
                              setEditedItemData,
                              editedItemData,
                              effieLink
                          )
                        : // folder not in edit mode
                          FolderViewMode(
                              effieLink,
                              focusedItemData,
                              editedItemData
                          )
                    : // link
                    isInEditMode
                    ? // link in edit mode
                      LinkEditMode(
                          focusedItemData,
                          setEditedItemData,
                          editedItemData,
                          effieLink
                      )
                    : // link not in edit mode
                      LinkViewMode(focusedItemData, editedItemData, effieLink)}

                {/* Buttons */}
                <div className="bottom-12 w-full flex flex-col gap-4">
                    {isInEditMode
                        ? ButtonEditMode(
                              handleSaveButtonClick,
                              isChanged,
                              startUpdate,
                              isLoading,
                              setIsInEditMode
                          )
                        : ButtonViewMode(
                              setIsInEditMode,
                              handleDeleteButtonClick,
                              handleMoveButtonClick
                          )}
                </div>
            </>
        </>
    );
};
function ButtonViewMode(
    setIsInEditMode: any,
    handleDeleteButtonClick: () => void,
    handleMoveButtonClick: () => void
) {
    return (
        <>
            <Button
                className="w-full flex justify-center items-center gap-1 h-12"
                borderMode
                onClick={() => setIsInEditMode(true)}
            >
                <Image src={editIcon} alt="edit icon" height={24} width={24} />
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
            {/* <Button onClick={handleMoveButtonClick}>move</Button> */}
        </>
    );
}

function ButtonEditMode(
    handleSaveButtonClick: () => void,
    isChanged: boolean,
    startUpdate: boolean,
    isLoading: any,
    setIsInEditMode: any
) {
    return (
        <>
            <Button
                className="w-full flex justify-center items-center gap-1 h-12"
                onClick={handleSaveButtonClick}
                disabled={!isChanged}
            >
                {startUpdate ? (
                    isLoading ? (
                        <div className="animate-pulse text-2xl flex">...</div>
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
                <Image src={cancelIcon} alt="cancel" height={24} width={24} />
                Cancel
            </Button>
        </>
    );
}

function LinkViewMode(
    focusedItemData: any,
    editedItemData: any,
    effieLink: string
) {
    return (
        <div className="mt-6 lg:mt-16 h-full overflow-auto lg:mb-4">
            <div className="flex flex-col break-words gap-8 p-1">
                <h4 className="text-neutral-900">{focusedItemData.title}</h4>
                <div className="flex justify-end">
                    <Image
                        src={editedItemData.isPinned ? pinBlackIcon : pinIcon}
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
                    <h5 className="text-neutral-800">Redirects to</h5>
                    <Link
                        href={focusedItemData.link}
                        className="underline text-neutral-700 hover:text-neutral-900"
                        target="_blank"
                    >
                        {focusedItemData.link}
                    </Link>
                </div>
                <div>
                    <h5 className="text-neutral-800">Public Access</h5>
                    <p className="text-neutral-700">
                        {focusedItemData.publicAccess}
                    </p>
                </div>
            </div>
        </div>
    );
}

function LinkEditMode(
    focusedItemData: any,
    setEditedItemData: any,
    editedItemData: any,
    effieLink: string
) {
    return (
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
                                editedItemData.isPinned ? pinBlackIcon : pinIcon
                            }
                            alt="pin"
                            width={30}
                            height={30}
                            onClick={() => {
                                setEditedItemData({
                                    isPinned: !editedItemData.isPinned,
                                });
                            }}
                        />
                    </div>
                    <div>
                        <h5 className="text-neutral-800">Link</h5>
                        <p className="underline text-neutral-700 hover:text-neutral-900">
                            {effieLink}
                        </p>
                        <Input
                            type="text"
                            placeholder={focusedItemData.relativePath}
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
                        <h5 className="text-neutral-800">Redirects to</h5>
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
                        <h5 className="text-neutral-800">Public Access</h5>
                        <Select
                            options={ShareConfigurationOptions.map(
                                (option) => ({
                                    value: option,
                                    label: option,
                                })
                            )}
                            onChange={(e: any) => {
                                setEditedItemData({
                                    publicAccess: e.target.value,
                                });
                            }}
                            defaultValue={focusedItemData.publicAccess}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

function FolderViewMode(
    effieLink: string,
    focusedItemData: any,
    editedItemData: any
) {
    return (
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
                                editedItemData.isPinned ? pinBlackIcon : pinIcon
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
                    {new Date(focusedItemData.createdAt).toLocaleDateString()}
                </p>

                <div className="pb-4 md:pb-12">
                    <h5 className="text-neutral-700">Public Access</h5>
                    <p className="text-neutral-500">
                        {focusedItemData.publicAccess}
                    </p>
                </div>

                <div>
                    <h5 className="text-neutral-700">Contents</h5>
                    <div className="flex">
                        <div className="mr-4">
                            <p className="text-neutral-500">Folders</p>
                            <div className="flex">
                                <h4 className="border-l-8 border-primary-500 my-2 p-2 text-neutral-700">
                                    {focusedItemData.folderCount}
                                </h4>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p className="text-neutral-500">Link</p>
                            <div className="flex">
                                <h4 className="border-l-8 border-tertiary-500 my-2 p-2 text-neutral-700">
                                    {focusedItemData.linkCount}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FolderEditMode(
    focusedItemData: any,
    setEditedItemData: any,
    editedItemData: any,
    effieLink: string
) {
    return (
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
                                editedItemData.isPinned ? pinBlackIcon : pinIcon
                            }
                            alt="pin"
                            width={30}
                            height={30}
                            onClick={() => {
                                setEditedItemData({
                                    isPinned: !editedItemData.isPinned,
                                });
                            }}
                        />
                    </div>
                    <div>
                        <h5 className="text-neutral-800">Link</h5>
                        <p className="underline text-neutral-700 hover:text-neutral-900">
                            {effieLink}
                        </p>
                        <Input
                            type="text"
                            placeholder={focusedItemData.relativePath}
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
                        <h5 className="text-neutral-800">Public Access</h5>
                        <Select
                            options={ShareConfigurationOptions.map(
                                (option) => ({
                                    value: option,
                                    label: option,
                                })
                            )}
                            onChange={(e: any) => {
                                setEditedItemData({
                                    publicAccess: e.target.value,
                                });
                            }}
                            defaultValue={focusedItemData.publicAccess}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
