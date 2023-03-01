import { useState, useEffect, useRef } from "react";
import Button from "../button";
import Input from "../input";
import LinkCard from "../link-card";
import Modal from "../modal";
import { BASE_URL } from "@/config/be-config";

type NewLinkProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function NewLink({ isOpen, onClose } : NewLinkProps) {
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
    }

    const titleRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState<string | undefined>("Title");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const linkName = formData.get("link-name");
        let path = linkName;
        const linkUrl = formData.get("link-url");
        // Add "/" to the start of the link name if it doesn't exist
        if (linkName && linkName.slice(0,1) !== "/") {
            path = "/" + linkName;
        }
        const data = {
            "username": "christojeffrey",
            "link": linkUrl,
            "title": "undefined",
            "isPinned": false,
            "path": path,
            "relativePath": linkName,
          };
        // POST to API
        fetch(`${BASE_URL}/directory/link`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.status === 201) {
                console.log("success");
                onClose();
            }
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={() => {onClose(); setIsMoreOptionsOpen(false)}}>
            <h3 className="text-neutral-800 mb-8">New Link</h3>
            <form onSubmit={onSubmit}>
                <div className="flex items-center mb-6">
                    <h4 className="text-neutral-600 mr-2">{USER_BASE_URL}</h4>
                    <Input type="text" id="link-name" name="link-name" placeholder="link-name" className="text-lg text-primary-500 font-bold flex-grow" autoFocus required />
                </div>
                <div className="flex w-full gap-4 mb-6">
                    <Input type="text" id="link-url" name="link-url" placeholder="Paste link here" required className="flex-grow" />
                    <Button className="min-h-full">Save link</Button>
                </div>
                <div role="button" tabIndex={0} onKeyDown={onKeyDown} className="cursor-pointer flex items-center" onClick={() => setIsMoreOptionsOpen(!isMoreOptionsOpen)}>
                    <p className="text-neutral-500 font-bold mr-2">More options</p>
                    <img src="/icons/chevron-down.svg" className={`w-3 h-3 transform transition-transform duration-300 ${isMoreOptionsOpen ? "rotate-180" : ""}`} />
                </div>
                <div className={`${isMoreOptionsOpen ? "max-h-[10rem]" : "max-h-0"} flex gap-6 overflow-clip duration-300`}>
                    <div className="flex flex-col gap-4 flex-grow pt-4">
                        <input ref={titleRef} type="text" id="title" name="title" placeholder="Title" onChange={() => setTitle(titleRef.current?.value)} className='input' />
                        <Input type="url" id="thumbnail" name="thumbnail" placeholder="Thumbnail URL" />
                    </div>
                    <LinkCard
                        content="display link"
                        title={title}
                        effieUrl=""
                        className="h-fit"
                    />
                </div>
            </form>
        </Modal>
    );
}