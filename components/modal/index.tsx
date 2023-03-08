type ModalProps = {
    children?: React.ReactNode;
    withCloseButton?: boolean;
    isOpen?: boolean;
    onClose?: () => void;
    onOutsideClick?: () => void;
    className?: string;
};
import styles from "./modal.module.css";

export default function Modal({
    children,
    withCloseButton = true,
    isOpen = false,
    onClose = () => {},
    onOutsideClick = () => {},
    className,
}: ModalProps) {
    // display
    return (
        <div
            className={`${styles.container} ${
                isOpen ? "z-50" : "-z-10 opacity-0"
            } duration-200`}
            onClick={onOutsideClick}
        >
            <div
                className={`${styles.modal} relative`}
                onClick={stopEventPropagationTry}
            >
                {withCloseButton && (
                    // top right corner
                    <button
                        className={`
            top-6 right-6 absolute hover:rotate-90 duration-300
            `}
                        onClick={onClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
                <div className={`${className} ${isOpen ? "block" : "hidden"}`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export const stopEventPropagationTry = (event: any) => {
    if (event.target === event.currentTarget) {
        event.stopPropagation();
    }
};
