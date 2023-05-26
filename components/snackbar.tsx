import infoIcon from "@/public/icons/info_blue.svg";
import warningIcon from "@/public/icons/warning_yellow.svg";
import errorIcon from "@/public/icons/error_red.svg";
import successIcon from "@/public/icons/success_green.svg";
import Image from "next/image";
import CrossIcon from "@/public/icons/cross";
import { useEffect } from "react";
type SnackbarProps = {
    type: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
    isShowing: boolean;
    onClose: () => void;
};

export default function Snackbar({
    type,
    title,
    message,
    isShowing,
    onClose,
}: SnackbarProps) {
    useEffect(() => {
        if (!isShowing) return;
        // start a timer to close the snackbar
        const timer = setTimeout(() => {
            onClose();
        }, 5000);
        return () => clearTimeout(timer);
    }, [isShowing]);
    return (
        // bg EFF8FF opacity 80%
        <div
            className={`fixed bottom-4 right-4 border-2 p-4 rounded-xl w-[20rem] opacity-80 max-h-[10rem] overflow-y-clip hover:opacity-100 transition-all duration-500
            ${isShowing ? "translate-y-0" : "translate-y-96"}
            ${
                type === "success"
                    ? "border-success-500 bg-[#E3FCEC] text-success-500"
                    : type === "error"
                    ? "border-danger-500 bg-[#F8E5E5] text-danger-500"
                    : type === "warning"
                    ? "border-warning-500 bg-[#FFFCF4] text-warning-500"
                    : "border-info-500 bg-[#EFF8FF] text-info-500"
            }`}
        >
            <div className="flex items-center">
                <Image
                    src={
                        type === "success"
                            ? successIcon
                            : type === "error"
                            ? errorIcon
                            : type === "warning"
                            ? warningIcon
                            : infoIcon
                    }
                    alt="icon"
                    height={28}
                    width={28}
                />
                <p className="font-bold text-lg ml-2">{title}</p>
            </div>
            <div className="ml-9 break-words">
                <p>{message}</p>
            </div>
            <button className="absolute top-2 right-2" onClick={onClose}>
                <CrossIcon />
            </button>
        </div>
    );
}
