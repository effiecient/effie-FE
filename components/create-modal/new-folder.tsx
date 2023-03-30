import { useState, useEffect, useRef } from "react";
import { Button, Modal } from "@/ui";
import LinkCard from "../link-card";
import { BE_BASE_URL } from "@/config/be-config";
import { FE_BASE_URL } from "@/config";
// import { unfurl } from 'unfurl.js'
import Image from "next/image";
import { useRouter } from "next/router";
import { useFetchEffieBE, useUserStore } from "@/hooks";

type NewFolderProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function NewFolder({ isOpen, onClose }: NewFolderProps) {
    // USER CONSTANTS
    const username = useUserStore((state: any) => state.username);
    const subdomain = useUserStore((state: any) => state.subdomain);
    const USER_BASE_URL = `${subdomain}.${FE_BASE_URL}/`;
    const currPathArray = window.location.pathname
        .split("/")
        .slice(1)
        .filter((item) => item !== "");

    const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);

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
    const [title, setTitle] = useState<string>("");

    const router = useRouter();
    const [body, setBody] = useState<any>({});
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const linkName: any = formData.get("folder-name");
        let path = window.location.pathname;
        const title = formData.get("title") || linkName;
        const thumbnailURL = formData.get("thumbnail-url");
        // Add "/" to the start of the link name if it doesn't exist

        // TODO: change for a more robust validation
        // check if linkName has space
        if (linkName && linkName.includes(" ")) {
            alert("Link name cannot have space");
            return;
        }
        const data = {
            username: subdomain,
            title: title,
            isPinned: false,
            path: path,
            relativePath: linkName,
        };
        setBody(data);
        setReadyToPost(true);
    };

    const [readyToPost, setReadyToPost] = useState(false);

    const { isLoading, isError, response } = useFetchEffieBE({
        url: readyToPost ? `${BE_BASE_URL}/directory/folder` : "",
        method: "POST",
        body: body,
    });
    if (readyToPost && !isLoading && !isError && response) {
        router.reload();
    }
    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== "") {
            setTitle(e.target.value);
        } else {
            setTitle(linkNameRef.current?.value || "");
        }
    };

    const closeModal = () => {
        onClose();
        setIsMoreOptionsOpen(false);
    };

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
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
                    <Button className="md:ml-4 h-[2.7rem] px-4">Add</Button>
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
                    <LinkCard
                        content="display link"
                        title={title}
                        url={linkNameRef.current?.value || ""}
                        effieUrl=""
                        className="h-fit"
                    />
                </div>
            </form>
        </Modal>
    );
}
