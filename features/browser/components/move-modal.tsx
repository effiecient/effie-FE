import { BE_BASE_URL } from "@/config";
import { useBrowserStore, useFetchEffieBE, useUserStore } from "@/hooks";
import { Button, Modal } from "@/ui";
import { useEffect, useState } from "react";
import { createFalse } from "typescript";

export function MoveModal() {
    const subdomain = useUserStore((state: any) => state.subdomain);

    const [isMoveModalOpen, setIsMoveModalOpen, itemPathToMove] =
        useBrowserStore((state: any) => [
            state.isMoveModalOpen,
            state.setIsMoveModalOpen,
            state.itemPathToMove,
        ]);

    function handleCloseModal() {
        setIsMoveModalOpen(false);
    }
    const [{ isLoading, isError, response }, fetcher] = useFetchEffieBE();

    const [folderPath, setFolderPath] = useState<string[]>([]);

    // initial fetch
    useEffect(() => {
        if (isMoveModalOpen) {
            const path = folderPath.join("/");
            fetcher({
                url: `${BE_BASE_URL}/directory/${subdomain}/${path}`,
            });
        }
    }, [isMoveModalOpen, folderPath]);

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
                            onClick={() => {
                                setFolderPath([]);
                            }}
                        >
                            {subdomain}/
                        </p>
                        {folderPath.map((folder: any, index: number) => {
                            return (
                                <>
                                    <p
                                        onClick={() => {
                                            setFolderPath(
                                                folderPath.slice(0, index + 1)
                                            );
                                        }}
                                    >
                                        {folder}/
                                    </p>
                                </>
                            );
                        })}
                    </div>
                    {/* middle section */}
                    {isLoading ? (
                        <div>loading...</div>
                    ) : (
                        <>
                            {folders.map((folder: any) => {
                                return (
                                    <>
                                        <div
                                            className="my-2 hover:cursor-pointer"
                                            onClick={() =>
                                                setFolderPath([
                                                    ...folderPath,
                                                    folder.title,
                                                ])
                                            }
                                        >
                                            <p>{folder.title}</p>
                                        </div>
                                    </>
                                );
                            })}
                        </>
                    )}
                </div>

                {/* bottom section */}
                <div className="flex justify-between">
                    <Button>new folder</Button>
                    <Button>move here</Button>
                </div>
            </div>
        </Modal>
    );
}
