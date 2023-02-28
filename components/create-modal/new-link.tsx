import Button from "../button";
import Modal from "../modal";

type NewLinkProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function NewLink({ isOpen, onClose } : NewLinkProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="flex flex-col gap-6">
            <h1 className="text-neutral-900">Create a new Effie account</h1>
            <Button>Register with Google</Button>
        </Modal>
    );
}