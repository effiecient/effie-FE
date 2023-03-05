import { useRef } from "react";
import CopyIcon from "@/public/icons/copy";
import Image from "next/image";

type LinkCardProps = {
    content: "new folder" | "new link" | "link" | "folder" | "display link" | "display folder";
    title?: string;
    url?: string;
    effieUrl?: string;
    onClick?: () => void;
    className?: string;
};

export default function LinkCard({ content, title, url, effieUrl, onClick, className } : LinkCardProps) {
    const copySuccessRef = useRef<HTMLDivElement>(null);

    const copyEffieUrl = () => {
        copySuccessRef.current?.classList.remove("opacity-0", "-translate-y-1");
        navigator.clipboard.writeText(effieUrl ? effieUrl : "");
        setTimeout(() => {
            copySuccessRef.current?.classList.add("opacity-0", "-translate-y-1");
        }, 1500);
    };
    
    return (
        <div 
            onClick={onClick}
            className={`
                ${className} 
                ${content.slice(0,3) === "new" ? "items-center justify-center gap-2 border-white hover:bg-primary-50 hover:border-primary-50 cursor-pointer duration-200" : 
                content.slice(0,7) === "display" ? "flex-col gap-1 border-neutral-200" : 
                "flex-col gap-1 hover:border-neutral-200 cursor-pointer border-white"} 
                group relative flex pt-3 pb-2 px-5 bg-white rounded-xl border focus:border-primary-500 w-[32vw] md:w-[44vw] lg:w-[20vw] max-w-[16rem] min-w-[8rem] min-h-[4rem]`
            }
        >
            {content === "new folder" ? (
                <>  
                    <Image src="/icons/new-folder.svg" alt="new folder" width={28} height={28} />
                    <h6 className="text-primary-500">New folder</h6>
                </>
            ) : content === "new link" ? (
                <>
                    <Image src="/icons/new-link.svg" alt="new link" width={28} height={28} />
                    <h6 className="text-primary-500">New link</h6>
                </>
            ) : (
                <div className="flex">
                    {content === "link" || content === "display link" ? (
                        <Image src="/icons/link.svg" alt="link" width={28} height={28} className="mr-2" />
                    ) : (
                        <div className="absolute left-0 top-0 h-full w-2 rounded-l-xl" style={{ backgroundColor: "#FFF" }} />
                    )}
                    <div>
                        <h6 className="text-neutral-800">{title}</h6>
                        <a 
                            href={url} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary-500 text-neutral-600 text-xs un hover:decoration-primary-500 inline-block max-w-full overflow-hidden"
                        >
                            {url}
                        </a>
                        {(content === "link" || content === "folder") && (
                            <button className="group-hover:opacity-100 opacity-0 translate-x-1 group-hover:translate-x-0 absolute right-0 bottom-0 flex items-end h-full p-2 z-10 bg-white duration-100 rounded-r-xl" onClick={copyEffieUrl}>
                                <CopyIcon className="duration-100 h-7 w-7" />
                                {/* Copy success notif */}
                                <div ref={copySuccessRef} className="opacity-0 -translate-y-1 absolute top-14 bg-neutral-900/50 text-white rounded-md py-1 px-2 shadow-lg text-left duration-300 max-w-[12rem]">
                                    <p className="text-xs">Link copied!<br /><span className="text-[0.6rem] underline text-neutral-100">{effieUrl}</span></p>
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}