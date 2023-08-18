import { BE_BASE_URL } from "@/config";
import {
    useBrowserStore,
    useFetchEffieBE,
    useSnackbarStore,
    useUserStore,
} from "@/hooks";
import ChevronRightIcon from "@/public/icons/chevron-right";
import FolderIcon from "@/public/icons/folder";
import { Button, LoadingAnimation, Modal } from "@/ui";
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";

export function MoveModal() {
    const subdomain = useUserStore((state: any) => state.subdomain);
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
    const [isMoveModalOpen, setIsMoveModalOpen, itemPathToMove, setDoRefetch] =
        useBrowserStore((state: any) => [
            state.isMoveModalOpen,
            state.setIsMoveModalOpen,
            state.itemPathToMove,
            state.setDoRefetch,
        ]);

    function handleCloseModal() {
        setIsMoveModalOpen(false);
    }
    const [{ isLoading, isError, response }, fetcher] = useFetchEffieBE();
    const [
        {
            isLoading: isLoadingMove,
            isError: isErrorMove,
            response: responseMove,
        },
        fetcherMove,
    ] = useFetchEffieBE();
    const [doMove, setDoMove] = useState<boolean>(false);

    const [folderPath, setFolderPath] = useState<string[]>([]);

    // initial fetch
    useEffect(() => {
        if (isMoveModalOpen) {
            const path = folderPath.join("/");
            fetcher({
                url: `${BE_BASE_URL}/directory/${subdomain}/${path}`,
                body: {
                    newPath: "/" + folderPath.join("/"),
                },
            });
        }
    }, [isMoveModalOpen, folderPath]);

    const handleMoveButton = () => {
        if (!doMove) {
            // do move
            fetcherMove({
                url: `${BE_BASE_URL}/directory/move/${subdomain}${itemPathToMove}`,
                method: "PATCH",
                body: {
                    newPath: "/" + folderPath.join("/"),
                },
            });
            setDoMove(true);
        }
    };

    // handle do move respond
    useEffect(() => {
        if (doMove) {
            if (!isLoadingMove) {
                if (isErrorMove) {
                    // handle error
                    setShowSnackbar(true);
                    setSnackbarType("error");
                    setSnackbarTitle("move error!");
                    setSnackbarMessage(responseMove.message);
                } else {
                    // handle success
                    setShowSnackbar(true);
                    setSnackbarType("success");
                    setSnackbarTitle("move success!");
                    setSnackbarMessage(
                        `${itemPathToMove} is moved to /${folderPath.join("/")}`
                    );
                    setDoRefetch(true);
                    setIsMoveModalOpen(false);
                    setFolderPath([]);
                }
                setDoMove(false);
            }
        }
    }, [doMove, isLoadingMove, isErrorMove, responseMove]);

    // preprocess data

    let folders = [];
    if (!isLoading && !isError && response) {
        folders = response.data.children.filter(
            (item: any) => item.type === "folder"
        );
    }
    console.log(folders);

    return (
        <Modal
            isOpen={isMoveModalOpen}
            onClose={handleCloseModal}
            onOutsideClick={handleCloseModal}
            className="h-96 flex flex-col"
            withCloseButton={false}
        >
            <div className="flex flex-col justify-between h-full">
                <div className="">
                    <div className="w-full">
                        {/* top section */}
                        <div className="flex px-2 border-b-2 border-neutral-200 py-2">
                            <p
                                className="text-lg hover:cursor-pointer hover:underline"
                                onClick={() => {
                                    if (folderPath.length > 0)
                                        setFolderPath([]);
                                }}
                            >
                                {subdomain}
                            </p>
                            <p className="text-lg">/</p>
                            {folderPath.map((folder: any, index: number) => {
                                return (
                                    <>
                                        <p
                                            className="text-lg hover:cursor-pointer hover:underline"
                                            onClick={() => {
                                                if (
                                                    folderPath.length ===
                                                    index + 1
                                                )
                                                    return;
                                                setFolderPath(
                                                    folderPath.slice(
                                                        0,
                                                        index + 1
                                                    )
                                                );
                                            }}
                                        >
                                            {folder}
                                        </p>
                                        <p className="text-lg">/</p>
                                    </>
                                );
                            })}
                        </div>
                        {/* middle section */}
                        {isLoading ? (
                            <div>loading...</div>
                        ) : (
                            <>
                                {folders.map((folder: any, index: number) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex flex-row justify-between items-center
                                        hover:bg-primary-100 rounded-lg px-2 hover:cursor-pointer"
                                            onClick={() =>
                                                setFolderPath([
                                                    ...folderPath,
                                                    folder.title,
                                                ])
                                            }
                                        >
                                            <div className="flex flex-row items-center">
                                                <FolderIcon className="w-6 h-6" />
                                                <div className="my-2 p-2">
                                                    <p>{folder.title}</p>
                                                </div>
                                            </div>
                                            <ChevronRightIcon className="w-6 h-6" />
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>

                {/* bottom section */}
                <div className="flex flex-col md:flex-row justify-between p-2 items-center">
                    <div>
                        <p className="text-primary-300">
                            moving {itemPathToMove}
                        </p>
                    </div>

                    <Button
                        onClick={handleMoveButton}
                        disabled={doMove && isLoadingMove}
                        className="w-36 h-10"
                    >
                        {doMove && isLoadingMove ? (
                            <LoadingAnimation />
                        ) : (
                            "move here"
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
