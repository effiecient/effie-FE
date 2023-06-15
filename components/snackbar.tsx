import infoIcon from "@/public/icons/info_blue.svg";
import warningIcon from "@/public/icons/warning_yellow.svg";
import errorIcon from "@/public/icons/error_red.svg";
import successIcon from "@/public/icons/success_green.svg";
import Image from "next/image";
import CrossIcon from "@/public/icons/cross";
import { use, useEffect, useRef } from "react";
import { useSnackbarStore } from "@/hooks";
type SnackbarProps = {
    className?: string;
};

export default function Snackbar({ className }: SnackbarProps) {
    const showSnackbar = useSnackbarStore((state: any) => state.showSnackbar);
    const setShowSnackbar = useSnackbarStore(
        (state: any) => state.setShowSnackbar
    );

    const snackbarType = useSnackbarStore((state: any) => state.snackbarType);
    const snackbarTitle = useSnackbarStore((state: any) => state.snackbarTitle);
    const snackbarMessage = useSnackbarStore(
        (state: any) => state.snackbarMessage
    );

    const hideSnackbarTimer = useRef<any>(null);
    const showSnackbarTimer = useRef<any>(null);

    const onClose = () => {
        setShowSnackbar(false);
    };
    useEffect(() => {
        if (!showSnackbar) return;
        // start a timer to close the snackbar
        hideSnackbarTimer.current = setTimeout(() => {
            onClose();
        }, 5000);
        return () => clearTimeout(hideSnackbarTimer.current);
    }, [showSnackbar]);

    // remove the previous snackbar on title, message, or type change
    useEffect(() => {
        if (showSnackbar) {
            onClose();
            showSnackbarTimer.current = setTimeout(() => {
                setShowSnackbar(true);
            }, 100);
            return () => clearTimeout(showSnackbarTimer.current);
        }
    }, [snackbarTitle, snackbarMessage, snackbarType]);
    return (
        // bg EFF8FF opacity 80%
        <div
            className={`${className} fixed bottom-4 right-4 border-2 p-4 rounded-xl w-[20rem] opacity-80 max-h-[10rem] overflow-y-clip hover:opacity-100 transition-all duration-500
            ${showSnackbar ? "translate-y-0" : "translate-y-96"}
            ${
                snackbarType === "success"
                    ? "border-success-500 bg-[#E3FCEC] text-success-500"
                    : snackbarType === "error"
                    ? "border-danger-500 bg-[#F8E5E5] text-danger-500"
                    : snackbarType === "warning"
                    ? "border-warning-500 bg-[#FFFCF4] text-warning-500"
                    : "border-info-500 bg-[#EFF8FF] text-info-500"
            }`}
            onMouseEnter={() => clearTimeout(hideSnackbarTimer.current)}
            onMouseLeave={() => {
                if (showSnackbar) {
                    hideSnackbarTimer.current = setTimeout(() => {
                        onClose();
                    }, 3000);
                }
            }}
        >
            <div className="flex items-center">
                <Image
                    src={
                        snackbarType === "success"
                            ? successIcon
                            : snackbarType === "error"
                            ? errorIcon
                            : snackbarType === "warning"
                            ? warningIcon
                            : infoIcon
                    }
                    alt="icon"
                    height={28}
                    width={28}
                />
                <p className="font-bold text-lg ml-2">{snackbarTitle}</p>
            </div>
            <div className="ml-9 break-words">
                <p>{snackbarMessage}</p>
            </div>
            <button className="absolute top-2 right-2" onClick={onClose}>
                <CrossIcon />
            </button>
        </div>
    );
}
