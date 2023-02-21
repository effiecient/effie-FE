type LinkCardProps = {
    title?: string;
    url?: string;
    className?: string;
};

export default function LinkCard({ title, url, className } : LinkCardProps) {
    return (
        <div className={`${className} py-3 px-5 bg-white rounded-xl border border-white hover:border-neutral-200 duration-100 cursor-pointer focus:border-primary-500 w-[32vw] md:w-[44vw] lg:w-[20vw] max-w-[16rem] min-w-[8rem]`}>
            <h6 className="text-neutral-800 my-1">{title}</h6>
            <a 
                href={url} 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 text-neutral-600 text-xs un hover:decoration-primary-500 inline-block max-w-full overflow-hidden"
            >
                {url}
            </a>
        </div>
    );
}