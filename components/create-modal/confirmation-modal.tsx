import Button from "../button";
import Modal from "../modal";

type ConfirmationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    confirmText?: string;
    cancelText?: string;
    confirmButtonClassName?: string;
    cancelButtonClassName?: string;
};

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    confirmText,
    cancelText,
    confirmButtonClassName,
    cancelButtonClassName,
}: ConfirmationModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col items-center justify-center gap-4 p-4">
                <h1 className="text-2xl font-bold">
                    {title ?? "Are you sure?"}
                </h1>
                <div className="flex items-center justify-center gap-4">
                    <Button
                        onClick={onConfirm}
                        type="custom"
                        className={`btn btn-primary ${confirmButtonClassName ? confirmButtonClassName : "bg-primary-500 text-white hover:bg-primary-700"} hover:bg-danger-300 border-danger-300 border-2 text-danger-300 hover:text-black`}
                    >
                        {confirmText ?? "Confirm"}
                    </Button>
                    <Button onClick={onClose} className={`btn btn-secondary ${cancelButtonClassName ? cancelButtonClassName : "bg-primary-500 text-white hover:bg-primary-700"}`}>
                        {cancelText ?? "Cancel"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
