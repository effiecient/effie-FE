import { BE_BASE_URL } from "@/config";
import {
    useBrowserStore,
    useFetchEffieBE,
    useSnackbarStore,
    useUserStore,
    useWindowSize,
} from "@/hooks";
import ChevronRightIcon from "@/public/icons/chevron-right";
import ChevronLeftIcon from "@/public/icons/chevron-left";
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
    const [
        isMoveModalOpen,
        setIsMoveModalOpen,
        focusedItemData,
        focusedPathname,
        setDoRefetch,
    ] = useBrowserStore((state: any) => [
        state.isMoveModalOpen,
        state.setIsMoveModalOpen,
        state.focusedItemData,
        state.focusedPathname,
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
                url: `${BE_BASE_URL}/directory/move/${subdomain}${focusedPathname}${
                    focusedPathname === "/" ? "" : "/"
                }${focusedItemData.relativePath}`,
                method: "PATCH",
                body: {
                    newPath: "/" + folderPath.join("/"),
                },
            });
            setDoMove(true);
        }
    };

    // handle when isModel is closed
    useEffect(() => {
        if (!isMoveModalOpen) {
            setFolderPath([]);
        }
    }, [isMoveModalOpen]);
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
                        `${focusedItemData.relativePath}
                        is moved to /${folderPath.join("/")}`
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
    const { width = 768 } = useWindowSize();

    return (
        <Modal
            isOpen={isMoveModalOpen}
            onClose={handleCloseModal}
            onOutsideClick={handleCloseModal}
            className={`h-96 flex flex-col ${
                width < 768 ? "w-[75vw]" : "w-96"
            }`}
            withCloseButton={false}
        >
            <div className="flex flex-col justify-between h-full">
                <div className="">
                    <div className="w-full">
                        {/* top section */}
                        <div className="flex px-2 border-b-2 border-neutral-200 py-2 items-center">
                            <div
                                className="hover:cursor-pointer"
                                onClick={() => {
                                    // slice the last folderPath
                                    setFolderPath(folderPath.slice(0, -1));
                                }}
                            >
                                <ChevronLeftIcon className="mr-2  text-neutral-800 hover:text-neutral-900" />
                            </div>
                            {[subdomain]
                                .concat(folderPath)
                                .map((folder: string, index: number) => {
                                    let fullBreadCrumb = [subdomain].concat(
                                        folderPath
                                    );
                                    console.log("index", index);
                                    console.log(
                                        "fullBreadCrumb",
                                        fullBreadCrumb.length
                                    );
                                    return (
                                        <>
                                            <p
                                                className={`text-lg hover:cursor-pointer font-bold mr-1 ${
                                                    index ===
                                                    fullBreadCrumb.length - 1
                                                        ? "text-neutral-800"
                                                        : "text-neutral-400 hover:text-neutral-600"
                                                }`}
                                                onClick={() => {
                                                    // do nothing if last is clicked
                                                    if (
                                                        index ===
                                                        folderPath.length
                                                    ) {
                                                        return;
                                                    }
                                                    setFolderPath(
                                                        folderPath.slice(
                                                            0,
                                                            index
                                                        )
                                                    );
                                                }}
                                            >
                                                {folder}
                                            </p>
                                            <p
                                                className={`text-lg font-bold mr-1 ${
                                                    index ===
                                                    fullBreadCrumb.length - 1
                                                        ? "text-neutral-800"
                                                        : "text-neutral-400"
                                                }`}
                                            >
                                                /
                                            </p>
                                        </>
                                    );
                                })}
                        </div>
                        {/* middle section */}
                        {isLoading ? (
                            <>
                                <div className="rounded-lg flex items-center">
                                    <div className="my-2 p-2 animate-pulse w-16 h-5 bg-neutral-200 rounded-lg"></div>
                                </div>
                                <div className="rounded-lg flex items-center">
                                    <div className="my-2 p-2 animate-pulse w-24 h-5 bg-neutral-100 rounded-lg"></div>
                                </div>
                            </>
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
                        <p className="text-primary-300 mr-2">
                            moving {focusedPathname}
                            {focusedPathname === "/" ? "" : "/"}
                            {focusedItemData?.relativePath} to /
                            {folderPath.join("/")}
                        </p>
                    </div>

                    <Button
                        onClick={handleMoveButton}
                        disabled={doMove && isLoadingMove}
                        className={`${width < 768 ? "w-full" : "w-32"}`}
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
