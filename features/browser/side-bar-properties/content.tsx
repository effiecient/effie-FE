import { FolderLinkData, UpdateFolderReq, UpdateLinkReq } from "@/type";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { copyToClipboard } from "@/utils";
import Image from "next/image";

import { Button, Input, Select } from "@/ui";

import { BE_BASE_URL, FE_BASE_URL, FE_PROTOCOL } from "@/config";

import { useUserStore } from "@/hooks";

import editIcon from "@/public/icons/edit.svg";
import trashIcon from "@/public/icons/trash.svg";
import cancelIcon from "@/public/icons/cancel.svg";
import saveIcon from "@/public/icons/save.svg";
import drawerImage from "@/public/images/drawer.svg";
import { useFetchEffieBENew } from "@/hooks/useFetchEffieBENew";

import { getObjectDifferences, checkIfObjectSame } from "@/utils";

const ShareConfigurationOptions = [
    "Private",
    "Public (Viewer)",
    "Public (Editor)",
];
const ShareConfigurationOptionsToData = [
    {
        shareConfiguration: {
            isShared: false,
        },
    },
    {
        shareConfiguration: {
            isShared: true,
            sharedPrivilege: "read",
        },
    },
    {
        shareConfiguration: {
            isShared: true,
            sharedPrivilege: "write",
        },
    },
];

export const Content = ({ itemData, relativePath, onUpdate }: any) => {
    const subdomain = useUserStore((state: any) => state.subdomain);
    const pathname = useUserStore((state: any) => state.pathname);

    const [isInEditMode, setIsInEditMode] = useState(false);

    const [editedRelativePath, setEditedRelativePath] = useState(relativePath);
    const editedItemData = useRef<FolderLinkData>(itemData);

    const [isChanged, setIsChanged] = useState(false);

    // reset everything when the itemData is changed
    useEffect(() => {
        setEditedRelativePath(relativePath);
        editedItemData.current = itemData;

        setIsInEditMode(false);
        setIsChanged(false);
    }, [itemData]);

    // reset editedItemData when the exit edit mode
    useEffect(() => {
        if (!isInEditMode) {
            editedItemData.current = itemData;
            setEditedRelativePath(relativePath);
            setIsChanged(false);
        }
    }, [isInEditMode]);

    // set isChanged
    function checkIsChanged() {
        // check if the itemData and editedItemData are the same
        const isSame = checkIfObjectSame(itemData, editedItemData.current);

        const isRelativePathSame = relativePath == editedRelativePath;

        // TODO: handle bug input failed when setIsChanged is called
        setIsChanged(!isSame || !isRelativePathSame);
    }

    const [{ isLoading, isError, response, fetchStarted }, fetcher] =
        useFetchEffieBENew();

    const [startUpdate, setStartUpdate] = useState(false);

    useEffect(() => {
        if (startUpdate) {
            console.log(editedItemData.current);
            let itemDataDifferences = getObjectDifferences(
                itemData,
                editedItemData.current
            );
            // if itemDataDifferences has shareConfiguration, then it changed(we need to do this because it part of it might be the same object as item data)
            if (itemDataDifferences.shareConfiguration !== undefined) {
                itemDataDifferences.shareConfiguration =
                    editedItemData.current.shareConfiguration;
            }

            fetcher({
                url: `${BE_BASE_URL}/directory/${
                    itemData.type === "folder" ? "folder" : "link"
                }`,
                method: "PATCH",
                body: {
                    username: subdomain,
                    path: "/" + pathname,
                    relativePath: relativePath,
                    // only include if the value is changed
                    ...(editedRelativePath !== relativePath && {
                        newRelativePath: editedRelativePath,
                    }),
                    ...itemDataDifferences,
                },
            });
        }
    }, [startUpdate]);

    // handle update
    useEffect(() => {
        if (startUpdate) {
            if (isError) {
                setStartUpdate(false);
                setIsInEditMode(false);
            } else if (isLoading || !fetchStarted) {
            } else {
                setStartUpdate(false);
                onUpdate();
                setIsInEditMode(false);
            }
        }
    }, [isLoading, isError, response, fetchStarted]);

    function handleSaveButtonClick() {
        setStartUpdate(true);
    }
    return (
        <>
            {itemData === undefined ? (
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
                    {itemData.type === "folder" ? (
                        // folder
                        isInEditMode ? (
                            <>edit mode folder</>
                        ) : (
                            <>Folder</>
                        )
                    ) : // link
                    isInEditMode ? (
                        // link in edit mode
                        <>
                            <div className="mt-6 lg:mt-16 h-full">
                                <div className="flex flex-col break-words gap-8 p-1">
                                    <Input
                                        type="text"
                                        placeholder={itemData.title}
                                        className="text-lg my-1"
                                        onChange={(e: any) => {
                                            editedItemData.current = {
                                                ...editedItemData.current,
                                                title:
                                                    e.target.value === ""
                                                        ? itemData.title
                                                        : e.target.value,
                                            };
                                            checkIsChanged();
                                        }}
                                    />
                                    <div>
                                        <h5 className="text-neutral-800">
                                            Link
                                        </h5>
                                        <p className="underline text-neutral-700 hover:text-neutral-900">{`${FE_PROTOCOL}://${subdomain}.${FE_BASE_URL}${
                                            pathname === ""
                                                ? ""
                                                : `/${pathname}`
                                        }/`}</p>
                                        <Input
                                            type="text"
                                            placeholder={relativePath}
                                            className="my-1"
                                            onChange={(e: any) => {
                                                setEditedRelativePath(
                                                    e.target.value == ""
                                                        ? relativePath
                                                        : e.target.value
                                                );
                                                checkIsChanged();
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h5 className="text-neutral-800">
                                            Redirects to
                                        </h5>
                                        <Input
                                            placeholder={itemData.link}
                                            className="my-1"
                                            onChange={(e: any) => {
                                                editedItemData.current = {
                                                    ...editedItemData.current,
                                                    link:
                                                        e.target.value === ""
                                                            ? itemData.link
                                                            : e.target.value,
                                                };
                                                checkIsChanged();
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h5 className="text-neutral-800">
                                            Access
                                        </h5>
                                        <Select
                                            options={ShareConfigurationOptions.map(
                                                (option, index) => ({
                                                    value: index,
                                                    label: option,
                                                })
                                            )}
                                            onChange={(e: any) => {
                                                const defaultValue = itemData
                                                    .shareConfiguration.isShared
                                                    ? itemData
                                                          .shareConfiguration
                                                          .sharedPrivilege ===
                                                      "read"
                                                        ? 1
                                                        : 2
                                                    : 0;

                                                if (
                                                    defaultValue ==
                                                    e.target.value
                                                ) {
                                                    // console.log("same");
                                                    editedItemData.current = {
                                                        ...editedItemData.current,
                                                        shareConfiguration:
                                                            itemData.shareConfiguration,
                                                    };
                                                } else {
                                                    // console.log("different");

                                                    editedItemData.current = {
                                                        ...editedItemData.current,
                                                        ...ShareConfigurationOptionsToData[
                                                            e.target.value
                                                        ],
                                                    };
                                                }

                                                checkIsChanged();
                                                // console.log(itemData);
                                                // console.log(
                                                //     editedItemData.current
                                                // );
                                            }}
                                            defaultValue={
                                                itemData.shareConfiguration
                                                    .isShared
                                                    ? itemData
                                                          .shareConfiguration
                                                          .sharedPrivilege ===
                                                      "read"
                                                        ? 1
                                                        : 2
                                                    : 0
                                            }
                                        />
                                    </div>
                                    <div>{/* TODO: add is pinned */}</div>
                                </div>
                            </div>
                        </>
                    ) : (
                        // link not in edit mode
                        <div className="mt-6 lg:mt-16 h-full">
                            <div className="flex flex-col break-words gap-8 p-1">
                                <h4 className="text-neutral-900">
                                    {itemData.title}
                                </h4>
                                <div>
                                    <h5 className="text-neutral-800">Link</h5>
                                    <a
                                        className="underline text-neutral-700 hover:text-neutral-900"
                                        href={`${FE_PROTOCOL}://${subdomain}.${FE_BASE_URL}${
                                            pathname === ""
                                                ? ""
                                                : `/${pathname}`
                                        }/${relativePath}`}
                                    >{`${FE_PROTOCOL}://${subdomain}.${FE_BASE_URL}${
                                        pathname === "" ? "" : `/${pathname}`
                                    }/${relativePath}`}</a>
                                </div>
                                <div>
                                    <h5 className="text-neutral-800">
                                        Redirects to
                                    </h5>
                                    <a
                                        href={itemData.link}
                                        className="underline text-neutral-700 hover:text-neutral-900"
                                    >
                                        {itemData.link}
                                    </a>
                                </div>
                                <div>
                                    <h5 className="text-neutral-800">Access</h5>
                                    <p className="text-neutral-700">
                                        {itemData.shareConfiguration.isShared
                                            ? itemData.shareConfiguration
                                                  .sharedPrivilege === "read"
                                                ? ShareConfigurationOptions[1]
                                                : ShareConfigurationOptions[2]
                                            : ShareConfigurationOptions[0]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="sticky bottom-12 w-full flex flex-col gap-4">
                        {isInEditMode ? (
                            <>
                                <Button
                                    className="w-full flex justify-center items-center gap-1 h-12"
                                    onClick={handleSaveButtonClick}
                                    disabled={!isChanged}
                                >
                                    {startUpdate ? (
                                        isLoading || !fetchStarted ? (
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
                                >
                                    <Image
                                        src={trashIcon}
                                        alt="trash icon"
                                        height={24}
                                        width={24}
                                    />
                                    Delete
                                </Button>
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    );
};
