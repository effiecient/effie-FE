import { Button, Modal } from "@/ui";
import Image from "next/image";
import trashIcon from "@/public/icons/trash.svg";

type ConfirmationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    name?: string;
    cancelText?: string;
};

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    cancelText,
    name,
}: ConfirmationModalProps) {
    const closeModal = () => {
        onClose();
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} onOutsideClick={closeModal}>
            <div className="flex flex-col justify-center gap-4 p-4 max-w-full">
                <h3 className="text-neutral-800 text-left break-words">
                    {title ?? `Delete ${name ?? "item"}?`}
                </h3>
                <p className="text-neutral-800 text-left">
                    This item will be permanently deleted. Anyone who has access
                    to it will no longer be able to access it.
                </p>
                <div className="flex items-center justify-center gap-4">
                    <Button
                        onClick={onClose}
                        className="w-full flex justify-center items-center gap-1 h-12"
                        borderMode
                    >
                        {cancelText ?? "No, cancel"}
                    </Button>
                    <Button
                        className="w-full flex justify-center items-center gap-1 h-12"
                        type="danger"
                        borderMode
                        onClick={onConfirm}
                    >
                        <Image
                            src={trashIcon}
                            alt="trash icon"
                            height={24}
                            width={24}
                        />
                        Yes, delete it
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
