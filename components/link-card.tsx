import Image from "next/image";

type LinkCardProps = {
    content?: "new folder" | "new link";
    title?: string;
    url?: string;
    onClick?: () => void;
    className?: string;
};

export default function LinkCard({ content, title, url, onClick, className } : LinkCardProps) {
    return (
        <div 
            onClick={onClick}
            className={`${className} ${content === "new folder" || content === "new link" ? "items-center justify-center gap-2 hover:bg-primary-50 hover:border-primary-50 duration-200" : "flex-col gap-1 hover:border-neutral-200"} flex py-3 px-5 bg-white rounded-xl border border-white duration-100 cursor-pointer focus:border-primary-500 w-[32vw] md:w-[44vw] lg:w-[20vw] max-w-[16rem] min-w-[8rem] min-h-[4rem]`}
        >
            {content === "new folder" ? (
                <>  
                    <Image src="/icons/new-folder.svg" alt="new folder" width={28} height={28} />
                    <h6 className="text-primary-500">New Folder</h6>
                </>
            ) : content === "new link" ? (
                <>
                    <Image src="/icons/new-link.svg" alt="new link" width={28} height={28} />
                    <h6 className="text-primary-500">New Link</h6>
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
                </>
            )}
        </div>
    );
}