// IMPORTS
import { useState, useEffect, useRef } from "react";
import { Button, Modal } from "@/ui";
import DirectoryItemCard from "../directory-item-card";
import { BE_BASE_URL } from "@/config/be-config";
import { useFetchEffieBE, useUserStore } from "@/hooks";
// import { unfurl } from 'unfurl.js'
import Image from "next/image";
import { useRouter } from "next/router";
import { FE_BASE_URL } from "@/config";
import LoadingPage from "@/components/loading";

type NewLinkProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function NewLink({ isOpen, onClose }: NewLinkProps) {
    // USER CONSTANTS
    const subdomain = useUserStore((state: any) => state.subdomain);
    const USER_BASE_URL = `${subdomain}.${FE_BASE_URL}/`;
    const currPathArray = window.location.pathname
        .split("/")
        .slice(1)
        .filter((item) => item !== "");

    // USER INTERFACE CONFIGURATIONS
    const linkNameRef = useRef<HTMLInputElement>(null);
    const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<any>({});

    useEffect(() => {
        const input = document.getElementById("link-name");
        if (input) {
            input.focus();
        }
    }, [isOpen]);

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            setIsMoreOptionsOpen(!isMoreOptionsOpen);
        }
    };

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== "") {
            setTitle(e.target.value);
        } else {
            setTitle(linkNameRef.current?.value || "");
        }
    };

    const onURLblur = (e: React.FocusEvent<HTMLInputElement>) => {};

    const closeModal = () => {
        onClose();
        setIsMoreOptionsOpen(false);
    };

    // FORM SUBMISSION
    const router = useRouter();
    const [readyToPost, setReadyToPost] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const linkName: any = formData.get("link-name");
        let path = window.location.pathname;
        const linkUrl = formData.get("link-url");
        const title = formData.get("title") || linkName;
        const thumbnailURL = formData.get("thumbnail-url");

        // TODO: change for a more robust validation
        // check if linkName has space
        if (linkName && linkName.includes(" ")) {
            alert("Link name cannot have space");
            return;
        }
        const data = {
            username: subdomain,
            link: linkUrl,
            title: title,
            isPinned: false,
            path: path,
            relativePath: linkName,
        };
        setBody(data);
        setReadyToPost(true);
    };

    const { isLoading, isError, response } = useFetchEffieBE({
        url: readyToPost ? `${BE_BASE_URL}/directory/link` : "",
        method: "POST",
        body: body,
    });

    // REFRESH UI AFTER NEW LINK ADDED
    if (isLoading) {
        return <LoadingPage />;
    }

    if (readyToPost && !isLoading && !isError && response) {
        router.reload();
    }

    return (
        <Modal isOpen={isOpen} onClose={closeModal} onOutsideClick={closeModal}>
            <h3 className="text-neutral-800 mb-8">New Link</h3>
            <form onSubmit={onSubmit}>
                <div className="flex items-center mb-6">
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
                    />
                </div>
                <div className="flex w-full gap-4 mb-6">
                    <input
                        type="text"
                        id="link-url"
                        name="link-url"
                        placeholder="Paste link here"
                        required
                        className="input flex-grow"
                        onBlur={onURLblur}
                    />
                    <Button className="min-h-full">Save link</Button>
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
                            onChange={onTitleChange}
                            className="input"
                        />
                        <input
                            type="url"
                            id="thumbnail-url"
                            name="thumbnail-url"
                            placeholder="Thumbnail URL"
                            className="input"
                        />
                    </div>
                    {/* TODO: adapt to the new directory item card */}

                    {/* <DirectoryItemCard
                        content="display link"
                        title={title}
                        url={linkNameRef.current?.value || ""}
                        effieUrl=""
                        className="h-fit"
                    /> */}
                </div>
            </form>
        </Modal>
    );
}
