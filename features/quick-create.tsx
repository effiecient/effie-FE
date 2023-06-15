import { useState, useRef, useEffect } from "react";
import { Button, LoadingAnimation } from "@/ui";
// import DirectoryItemCard from "@/components/directory-item-card";
import { BE_BASE_URL } from "@/config/be-config";
import Image from "next/image";
import Head from "next/head";
import { useFetchEffieBENew, useSnackbarStore, useUserStore } from "@/hooks";
import { Navbar, Snackbar } from "@/components";

export default function QuickCreate() {
    const username = useUserStore((state: any) => state.username);
    const linkNameRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLInputElement>(null);

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
        const input = document.getElementById("link-name");
        if (input) {
            input.focus();
        }
    }, []);
    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            setIsMoreOptionsOpen(!isMoreOptionsOpen);
        }
    };
    // FORM SUBMISSION

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const linkName: any = formData.get("link-name");
        const linkUrl = formData.get("link-url");
        const title = formData.get("title") || linkName;

        const data = {
            path: "/",
            relativePath: linkName,
            username: username,
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
            setSsnackbarType("error");
            setSnackbarTitle("create new link error!");
            setSnackbarMessage(response.message);
            setIsSubmitted(false);
        } else if (isLoading || !fetchStarted) {
            console.log("Loading...");
        } else {
            setShowSnackbar(true);
            setSsnackbarType("success");
            setSnackbarTitle("link created!");
            setSnackbarMessage(response.message);
            setIsSubmitted(false);
            // TODO: clear form
        }
    }
    return (
        <>
            <Head>
                <title>Effie</title>
                <meta
                    name="description"
                    content="All your links, in one place."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <Navbar isOnLanding />
            <div className="flex flex-col px-6 lg:px-44 xl:px-[20%] w-full items-center min-h-fit h-5/6 pt-48">
                <div>
                    <h3 className="text-neutral-800 mb-8">New Link</h3>
                </div>
                <div>
                    <form onSubmit={onSubmit}>
                        <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
                            <input
                                ref={linkNameRef}
                                type="text"
                                id="link-name"
                                name="link-name"
                                placeholder="link-name"
                                className="input text-lg text-primary-500 font-bold w-full md:flex-grow"
                                autoFocus
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row w-full gap-4 mb-6">
                            <input
                                type="text"
                                id="link-url"
                                name="link-url"
                                placeholder="Paste link here"
                                required
                                className="input flex-grow"
                                autoComplete="off"
                            />
                            <Button
                                className="h-8 w-24"
                                disabled={
                                    isSubmitted && (isLoading || !fetchStarted)
                                }
                            >
                                {isSubmitted && (isLoading || !fetchStarted) ? (
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
                            onClick={() =>
                                setIsMoreOptionsOpen(!isMoreOptionsOpen)
                            }
                        >
                            <p className="text-neutral-500 font-bold mr-2">
                                More options
                            </p>

                            <Image
                                width={12}
                                height={12}
                                src="/icons/chevron-down.svg"
                                className={`w-3 h-3 transform transition-transform duration-300 ${
                                    isMoreOptionsOpen ? "rotate-180" : ""
                                }`}
                                alt="More options icon"
                            />
                        </div>

                        <div
                            className={`${
                                isMoreOptionsOpen ? "max-h-[10rem]" : "max-h-0"
                            } gap-6 overflow-clip duration-300`}
                        >
                            <div className="flex flex-col gap-4 flex-grow pt-4">
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Custom title"
                                    className="input"
                                    autoComplete="off"
                                />
                            </div>
                            <p className="mt-2 text-neutral-500 font-bold mr-2">
                                note: this link will be placed in your root
                                folder
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <Snackbar className="z-50" />
        </>
    );
}
