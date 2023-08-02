import { BE_BASE_URL } from "@/config";
import { useBrowserStore, useFetchEffieBE, useUserStore } from "@/hooks";
import { Button, Modal } from "@/ui";
import { useEffect, useState } from "react";

export function MoveModal() {
    const subdomain = useUserStore((state: any) => state.subdomain);

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

    // do move
    useEffect(() => {
        if (doMove) {
            fetcherMove({
                url: `${BE_BASE_URL}/directory/move/${subdomain}${itemPathToMove}`,
                method: "PATCH",
                body: {
                    newPath: "/" + folderPath.join("/"),
                },
            });
        }
    }, [doMove]);

    // subscribe to move folder path result
    useEffect(() => {
        if (!isLoadingMove && !isErrorMove && responseMove) {
            console.log("response success");
            setDoMove(false);
            setDoRefetch(true);
            setIsMoveModalOpen(false);
        }
        console.log(response);
    }, [isLoadingMove, isErrorMove, responseMove]);

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
            className="min-h-[500px]"
            withCloseButton={false}
        >
            <div className="border-2">
                <div>
                    {/* top section */}
                    <div>{itemPathToMove}</div>
                    <div className="flex">
                        <p
                            className="hover:cursor-pointer hover:underline"
                            onClick={() => {
                                if (folderPath.length > 0) setFolderPath([]);
                            }}
                        >
                            {subdomain}
                        </p>
                        <p>/</p>
                        {folderPath.map((folder: any, index: number) => {
                            return (
                                <>
                                    <p
                                        className="hover:cursor-pointer hover:underline"
                                        onClick={() => {
                                            if (folderPath.length === index + 1)
                                                return;
                                            setFolderPath(
                                                folderPath.slice(0, index + 1)
                                            );
                                        }}
                                    >
                                        {folder}
                                    </p>
                                    <p>/</p>
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
                                    <div key={index} className="flex">
                                        <div
                                            className="my-2 hover:cursor-pointer p-2 border-2 rounded-md bg-neutral-300 hover:bg-neutral-800 hover:text-neutral-50"
                                            onClick={() =>
                                                setFolderPath([
                                                    ...folderPath,
                                                    folder.title,
                                                ])
                                            }
                                        >
                                            <p>{folder.title}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>

                {/* bottom section */}
                <div className="flex justify-between">
                    {/* <Button>new folder</Button> */}
                    <Button
                        onClick={() => {
                            setDoMove(true);
                        }}
                    >
                        move here
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
