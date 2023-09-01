import { Button, LoadingAnimation, Modal } from "@/ui";
import Image from "next/image";
import trashIcon from "@/public/icons/trash.svg";
import {
    useBrowserStore,
    useFetchEffieBE,
    useSnackbarStore,
    useUserStore,
} from "@/hooks";
import { shallow } from "zustand/shallow";
import { BE_BASE_URL } from "@/config";
import { use, useEffect, useState } from "react";

export function DeleteConfirmationModal() {
    const subdomain = useUserStore((state: any) => state.subdomain);

    const [
        isDeleteConfirmationModalOpen,
        setIsDeleteConfirmationModalOpen,
        focusedItemData,
        pathname,
        setPathname,
        setDoRefetch,
    ] = useBrowserStore(
        (state: any) => [
            state.isDeleteConfirmationModalOpen,
            state.setIsDeleteConfirmationModalOpen,
            state.focusedItemData,
            state.pathname,
            state.setPathname,
            state.setDoRefetch,
        ],
        shallow
    );
    const [
        setShowSnackbar,
        setSnackbarType,
        setSnackbarTitle,
        setSnackbarMessage,
    ] = useSnackbarStore(
        (state: any) => [
            state.setShowSnackbar,
            state.setSnackbarType,
            state.setSnackbarTitle,
            state.setSnackbarMessage,
        ],
        shallow
    );
    const [{ isLoading, isError, response }, fetcher] = useFetchEffieBE();

    const [pathnameWithRelativePath, setPathnameWithRelativePath] =
        useState("");
    const [startDelete, setStartDelete] = useState(false);
    const [localPathname, setLocalPathname] = useState(pathname);

    useEffect(() => {
        // check if this is the folder in which the user is in or not.
        const isUserInThisFolder = focusedItemData?.children ? true : false;

        let tempLocalPathname;
        if (isUserInThisFolder) {
            // truncate from the last slash
            tempLocalPathname = pathname.substring(
                0,
                pathname.lastIndexOf("/")
            );
            // add "/" if the pathname doesn't start with "/"
            if (tempLocalPathname[0] !== "/") {
                tempLocalPathname = `/${tempLocalPathname}`;
            }
        } else {
            tempLocalPathname = pathname;
        }
        setLocalPathname(tempLocalPathname);

        let tempPathnameWithRelativePath = `${tempLocalPathname}${
            focusedItemData?.relativePath &&
            tempLocalPathname[tempLocalPathname.length - 1] !== "/"
                ? "/"
                : ""
        }${
            focusedItemData?.relativePath ||
            pathname.substring(pathname.lastIndexOf("/") + 1)
        }`;
        setPathnameWithRelativePath(tempPathnameWithRelativePath);
    }, [isDeleteConfirmationModalOpen]);
    // handle update
    useEffect(() => {
        if (startDelete) {
            if (isError) {
                setShowSnackbar(true);
                setSnackbarType("error");
                setSnackbarTitle("delete error!");
                setSnackbarMessage(response.message);
                setStartDelete(false);
            } else if (isLoading) {
            } else {
                setStartDelete(false);
                setShowSnackbar(true);
                setSnackbarType("success");
                setSnackbarTitle("delete success!");
                setSnackbarMessage(response.message);
                setIsDeleteConfirmationModalOpen(false);
                // go to the parent folder if the user is in the folder that is deleted
                setPathname(localPathname);
                setDoRefetch(true);
            }
        }
    }, [isLoading]);
    const onConfirm = () => {
        fetcher({
            url: `${BE_BASE_URL}/directory/${subdomain}${pathnameWithRelativePath}`,
            method: "DELETE",
        });
        setStartDelete(true);
    };
    const handleCloseModal = () => {
        setIsDeleteConfirmationModalOpen(false);
    };

    return (
        <Modal
            isOpen={isDeleteConfirmationModalOpen}
            onClose={handleCloseModal}
            onOutsideClick={handleCloseModal}
        >
            <div className="flex flex-col justify-center gap-4 p-4 max-w-full">
                <h3 className="text-neutral-800 text-left break-words">
                    {`Delete ${
                        focusedItemData?.relativePath ||
                        pathname.substring(pathname.lastIndexOf("/") + 1)
                    }?`}
                </h3>
                <p className="text-neutral-800 text-left">
                    This item will be permanently deleted. Anyone who has access
                    to it will no longer be able to access it.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <Button
                        onClick={handleCloseModal}
                        className="w-full flex justify-center items-center gap-1 h-12"
                        borderMode
                    >
                        {"No, cancel"}
                    </Button>
                    <Button
                        className="w-full flex justify-center items-center gap-1 h-12"
                        type="danger"
                        borderMode
                        onClick={onConfirm}
                    >
                        {startDelete && isLoading ? (
                            <LoadingAnimation bg="rgb(var(--color-neutral-100))" />
                        ) : (
                            <>
                                <Image
                                    src={trashIcon}
                                    alt="trash icon"
                                    height={24}
                                    width={24}
                                />
                                Yes, delete it
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
