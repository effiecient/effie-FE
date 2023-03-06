import { useState, useEffect, useRef } from "react";
import Button from "../button";
import LinkCard from "../link-card";
import Modal from "../modal";
import { BASE_URL } from "@/config/be-config";
// import { unfurl } from 'unfurl.js'
import Image from "next/image";

type NewFolderProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function NewFolder({ isOpen, onClose }: NewFolderProps) {
    const USER_BASE_URL = "https://effie.boo/";

    const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);

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

    const linkNameRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState<string>("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const linkName = formData.get("link-name");
        let path = linkName;
        const linkUrl = formData.get("link-url");
        const title = formData.get("title");
        const thumbnailURL = formData.get("thumbnail-url");
        // Add "/" to the start of the link name if it doesn't exist
        if (linkName && linkName.slice(0, 1) !== "/") {
            path = "/" + linkName;
        }
        const data = {
            username: "christojeffrey",
            link: linkUrl,
            title: title,
            isPinned: false,
            path: path,
            relativePath: linkName,
        };
        // POST to API
        fetch(`${BASE_URL}/directory/link`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.status === 201) {
                console.log("success");
                onClose();
            }
        });
    };

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== "") {
            setTitle(e.target.value);
        } else {
            setTitle(linkNameRef.current?.value || "");
        }
    };

    const onURLblur = (e: React.FocusEvent<HTMLInputElement>) => {
        // fetch with header

        const url = "https://www.zoom.us";

        // unfurl(url);

        // fetch(e.target.value, {
        //     method: "GET",
        //     headers: {
        //         'Accept': 'text/html, application/xhtml+xml',
        //         'User-Agent': 'facebookexternalhit'
        //     }
        // }).then(res => res.text()).then(html => {
        //     console.log(html)
        //     // const contentType = res.headers.get("content-type");
        //     // if (contentType && contentType.indexOf("image") !== -1) {
        //     //     const thumbnailURL = e.target.value;
        //     //     const thumbnailURLInput = document.getElementById("thumbnail-url") as HTMLInputElement;
        //     //     thumbnailURLInput.value = thumbnailURL;
        //     // }
        // });
    };

    const closeModal = () => {
        onClose();
        setIsMoreOptionsOpen(false);
    };

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <h3 className="text-neutral-800 mb-8">New Folder</h3>
            <form onSubmit={onSubmit}>
                <div className="flex items-center mb-6">
                    <h4 className="text-neutral-600 mr-2">{USER_BASE_URL}</h4>
                    <input
                        ref={linkNameRef}
                        type="text"
                        id="link-name"
                        name="link-name"
                        placeholder="folder-name"
                        className="input text-lg text-primary-500 font-bold flex-grow"
                        autoFocus
                        required
                    />
                    <Button className="ml-4 h-[2.7rem] px-4">Add</Button>
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
                            required
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
