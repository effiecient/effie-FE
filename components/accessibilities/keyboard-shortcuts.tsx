import Modal from "@/ui/modal";

type KeyboardShortcutsModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function KeyboardShortcuts({
    isOpen,
    onClose,
}: KeyboardShortcutsModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} onOutsideClick={onClose}>
            <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold">Keyboard Shortcuts</h3>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <p className="text-neutral-500 font-bold">/</p>
                        <p className="text-neutral-500">Focus search bar</p>
                    </div>
                    <div className="flex gap-2">
                        <p className="text-neutral-500 font-bold">?</p>
                        <p className="text-neutral-500">Open this modal</p>
                    </div>
                    <div className="flex gap-2">
                        <p className="text-neutral-500 font-bold">n</p>
                        <p className="text-neutral-500">Create new folder</p>
                    </div>
                    <div className="flex gap-2">
                        <p className="text-neutral-500 font-bold">l</p>
                        <p className="text-neutral-500">Create new link</p>
                    </div>
                    <div className="flex gap-2">
                        <p className="text-neutral-500 font-bold">s</p>
                        <p className="text-neutral-500">Save current page</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
