import { useState, useEffect, useRef } from "react";
import { Button, LoadingAnimation, Modal } from "@/ui";
import { BE_BASE_URL } from "@/config/be-config";
import { FE_BASE_URL } from "@/config";
import Image from "next/image";
import {
    useBrowserStore,
    useFetchEffieBENew,
    useSnackbarStore,
    useUserStore,
} from "@/hooks";

type NewFolderModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onNewItemCreated: () => void;
};

export function NewFolderModal({
    isOpen,
    onClose,
    onNewItemCreated,
}: NewFolderModalProps) {
    // USER CONSTANTS
    const subdomain = useUserStore((state: any) => state.subdomain);
    const USER_BASE_URL = `${subdomain}.${FE_BASE_URL}/`;

    const pathname = useBrowserStore((state: any) => state.pathname);
    const currPathArray = pathname
        .split("/")
        .slice(1)
        .filter((item: any) => item !== "");

    const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [{ isLoading, isError, response, fetchStarted }, fetcher] =
        useFetchEffieBENew();

    const setShowSnackbar = useSnackbarStore(
        (state: any) => state.setShowSnackbar
    );
    const setSsnackbarType = useSnackbarStore(
        (state: any) => state.setSnackbarType
    );
    const setSnackbarTitle = useSnackbarStore(
        (state: any) => state.setSnackbarTitle
    );
    const setSnackbarMessage = useSnackbarStore(
        (state: any) => state.setSnackbarMessage
    );
    useEffect(() => {
        const input = document.getElementById("folder-name");
        if (input) {
            input.focus();
        }
    }, [isOpen]);

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            setIsMoreOptionsOpen(!isMoreOptionsOpen);
        }
    };

    const linkNameRef = useRef<HTMLInputElement>(null);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const linkName: any = formData.get("folder-name");
        let path = pathname;
        const title = formData.get("title") || linkName;
        // Add "/" to the start of the link name if it doesn't exist

        const data = {
            username: subdomain,
            title: title,
            isPinned: false,
            path: path,
            relativePath: linkName,
        };
        fetcher({
            url: `${BE_BASE_URL}/directory/folder`,
            method: "POST",
            body: data,
        });
        setIsSubmitted(true);
    };

    const closeModal = () => {
        onClose();
        setIsMoreOptionsOpen(false);
    };

    if (isSubmitted) {
        if (isError) {
            setShowSnackbar(true);
            setSsnackbarType("error");
            setSnackbarTitle("create new folder error!");
            setSnackbarMessage(response.message);
            setIsSubmitted(false);
        } else if (isLoading || !fetchStarted) {
            console.log("Loading...");
        } else {
            onNewItemCreated();
            onClose();
            setIsSubmitted(false);
        }
    }
    return (
        <Modal isOpen={isOpen} onClose={closeModal} onOutsideClick={closeModal}>
            <h3 className="text-neutral-800 mb-8">New Folder</h3>
            <form onSubmit={onSubmit}>
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0 mb-6">
                    <h4 className="text-neutral-600 mr-2">
                        {USER_BASE_URL}
                        {currPathArray.length === 1
                            ? currPathArray[0] + "/"
                            : currPathArray.length > 1
                            ? ".../" +
                              currPathArray[currPathArray.length - 1] +
                              "/"
                            : ""}
                    </h4>
                    <input
                        ref={linkNameRef}
                        type="text"
                        id="folder-name"
                        name="folder-name"
                        placeholder="folder-name"
                        className="input text-lg text-primary-500 font-bold flex-grow"
                        autoFocus
                        required
                    />
                    <Button
                        className="md:ml-4 h-[2.7rem] px-4 w-24"
                        disabled={isSubmitted && (isLoading || !fetchStarted)}
                    >
                        {isSubmitted && (isLoading || !fetchStarted) ? (
                            <LoadingAnimation bg="rgb(var(--color-neutral-100))" />
                        ) : (
                            "Add"
                        )}
                    </Button>
                </div>
                <div
                    role="button"
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    className="cursor-pointer flex items-center"
                    onClick={() => setIsMoreOptionsOpen(!isMoreOptionsOpen)}
                >
                    <p className="text-neutral-500 font-bold mr-2">
                        More options
                    </p>
                    <Image
                        width={28}
                        height={28}
                        alt="arrow-down"
                        src="/icons/chevron-down.svg"
                        className={`w-3 h-3 transform transition-transform duration-300 ${
                            isMoreOptionsOpen ? "rotate-180" : ""
                        }`}
                    />
                </div>
                <div
                    className={`${
                        isMoreOptionsOpen ? "max-h-[10rem]" : "max-h-0"
                    } flex gap-6 overflow-clip duration-300`}
                >
                    <div className="flex flex-col gap-4 flex-grow pt-4">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Custom Title"
                            className="input"
                        />
                    </div>
                </div>
            </form>
        </Modal>
    );
}
