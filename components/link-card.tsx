import CopyIcon from "@/public/icons/copy";
import Image from "next/image";

type LinkCardProps = {
    content?: "new folder" | "new link";
    title?: string;
    url?: string;
    effieUrl?: string;
    onClick?: () => void;
    className?: string;
};

export default function LinkCard({ content, title, url, effieUrl, onClick, className } : LinkCardProps) {
    const copyEffieUrl = () => {
        navigator.clipboard.writeText(effieUrl ? effieUrl : "");
    };

    return (
        <div 
            onClick={onClick}
            className={`${className} ${content === "new folder" || content === "new link" ? "items-center justify-center gap-2 hover:bg-primary-50 hover:border-primary-50 duration-200" : "flex-col gap-1 hover:border-neutral-200"} group relative flex py-3 px-5 bg-white rounded-xl border border-white duration-100 cursor-pointer focus:border-primary-500 w-[32vw] md:w-[44vw] lg:w-[20vw] max-w-[16rem] min-w-[8rem] min-h-[4rem]`}
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
                <>
                    <h6 className="text-neutral-800">{title}</h6>
                    <a 
                        href={url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary-500 text-neutral-600 text-xs un hover:decoration-primary-500 inline-block max-w-full overflow-hidden"
                    >
                        {url}
                    </a>
                    <button className="group-hover:opacity-100 opacity-0 translate-x-1 group-hover:translate-x-0 absolute right-0 bottom-0 flex items-end h-full p-2 z-10 bg-white duration-100 rounded-r-xl" onClick={copyEffieUrl}>
                        <CopyIcon className="duration-100 h-7 w-7" />
                        {/* Tooltip
                        <div className="bg-neutral-200">
                            Link copied: {effieUrl}
                        </div> */}
                    </button>
                </>
            )}
        </div>
    );
}