import { useState, useEffect, useRef } from "react";
import { Button, LoadingAnimation, Modal } from "@/ui";
import { BE_BASE_URL } from "@/config/be-config";
import {
    useBrowserStore,
    useFetchEffieBE,
    useSnackbarStore,
    useUserStore,
} from "@/hooks";
import Image from "next/image";
import { FE_BASE_URL } from "@/config";

export function NewLinkModal() {
    // USER CONSTANTS
    const subdomain = useUserStore((state: any) => state.subdomain);
    const USER_BASE_URL = `${subdomain}.${FE_BASE_URL}/`;
    const [pathname, isNewLinkModalOpen, setIsNewLinkModalOpen, setDoRefetch] =
        useBrowserStore((state: any) => [
            state.pathname,
            state.isNewLinkModalOpen,
            state.setIsNewLinkModalOpen,
            state.setDoRefetch,
        ]);
    const currPathArray = pathname
        .split("/")
        .slice(1)
        .filter((item: any) => item !== "");

    // USER INTERFACE CONFIGURATIONS
    const linkNameRef = useRef<HTMLInputElement>(null);
    const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

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

    useEffect(() => {
        if (isNewLinkModalOpen) {
            const input = document.getElementById("link-name");
            if (input) {
                input.focus();
            }
        }
    }, [isNewLinkModalOpen]);

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            setIsMoreOptionsOpen(!isMoreOptionsOpen);
        }
    };

    const onURLblur = (e: React.FocusEvent<HTMLInputElement>) => {};

    const handleCloseModal = () => {
        setIsNewLinkModalOpen(false);
        setIsMoreOptionsOpen(false);
    };

    // FORM SUBMISSION

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const linkName: any = formData.get("link-name");
        let path = pathname;
        const linkUrl = formData.get("link-url");
        const title = formData.get("title") || linkName;

        const data = {
            path: path,
            relativePath: linkName,
            username: subdomain,
            link: linkUrl,
            title: title,
            isPinned: false,
        };

        fetcher({
            url: `${BE_BASE_URL}/directory/link`,
            method: "POST",
            body: data,
        });
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        if (isError) {
            setShowSnackbar(true);
            setSnackbarType("error");
            setSnackbarTitle("create new link error!");
            setSnackbarMessage(response.message);
            setIsSubmitted(false);
        } else if (isLoading) {
            // console.log("Loading...");
        } else {
            setIsNewLinkModalOpen(false);
            setIsSubmitted(false);
            setDoRefetch(true);
        }
    }
    return (
        <Modal
            isOpen={isNewLinkModalOpen}
            onClose={handleCloseModal}
            onOutsideClick={handleCloseModal}
        >
            <h3 className="text-neutral-800 mb-8">New Link</h3>
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
                        id="link-name"
                        name="link-name"
                        placeholder="link-name"
                        className="input text-lg text-primary-500 font-bold flex-grow"
                        autoFocus
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                    <input
                        type="url"
                        id="link-url"
                        name="link-url"
                        placeholder="Paste link here"
                        required
                        className="input flex-grow"
                        onBlur={onURLblur}
                        autoComplete="off"
                    />
                    <Button
                        className="h-8 w-24"
                        disabled={isSubmitted && isLoading}
                    >
                        {isSubmitted && isLoading ? (
                            <LoadingAnimation bg="rgb(var(--color-neutral-100))" />
                        ) : (
                            "Save Link"
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
                            autoComplete="off"
                        />
                    </div>
                </div>
            </form>
        </Modal>
    );
}
