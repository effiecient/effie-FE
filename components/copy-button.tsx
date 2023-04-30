import { useRef } from "react";
import CopyIcon from "@/public/icons/copy";
import { copyToClipboard, stopEventPropagation } from "@/utils";

type copyButtonProps = {
    effieURL: string;
    link: string | undefined;
    view: string;
};

export default function CopyButton({ effieURL, link, view }: copyButtonProps) {
    const copySuccessRef = useRef<HTMLDivElement>(null);

    const copyEffieUrl = (e: any) => {
        stopEventPropagation(e);
        copySuccessRef.current?.classList.remove(
            "opacity-0",
            "-translate-y-1",
            "-z-10"
        );
        // add z-30
        copySuccessRef.current?.classList.add("z-30");
        if (!navigator.clipboard) {
            // Fallback to unsupported browsers
            copyToClipboard(effieURL ?? "");
        } else {
            navigator.clipboard.writeText(effieURL ?? "");
        }
        setTimeout(() => {
            copySuccessRef.current?.classList.add(
                "opacity-0",
                "-translate-y-1",
                "-z-10"
            );
            // remove z-30
            copySuccessRef.current?.classList.remove("z-30");
        }, 1500);
    };

    return (
        <div>
            <button
                className={`${view === "grid" ? "group-hover:opacity-100 opacity-0 translate-x-1 group-hover:translate-x-0 absolute right-0 bottom-0 bg-white rounded-r-xl p-1" : ""}   flex items-end h-full duration-100`}
                onClick={copyEffieUrl}
            >
                <CopyIcon className="duration-100 h-6 w-6" />
            </button>
            {/* Copy success notif */}
            <div
                ref={copySuccessRef}
                className={`opacity-0
                -translate-y-1 -z-10 absolute -bottom-12 ${view === "grid" ? "-right-12" : "right-0" } bg-neutral-800 text-white rounded-md py-1 px-2 shadow-lg text-left duration-300 max-w-[12rem]`}
            >
                <p className="text-xs">
                    Link copied!
                    <br />
                    <a
                        className="text-[0.6rem] underline text-neutral-100"
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {/* if effieURl > 20 character, show 10 characters with ... */}
                        {effieURL.length > 20
                            ? `${effieURL.slice(
                                0,
                                10
                            )}...${effieURL.slice(
                                effieURL.length - 10,
                                effieURL.length
                            )}`
                            : effieURL}
                    </a>
                </p>
            </div>
        </div>
    )
}