import Button from "./button";
import SideModal from "./side-modal";

type RegisterProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function Login({ isOpen, onClose } : RegisterProps) {
    return (
        <SideModal isOpen={isOpen} onClose={onClose} className="flex flex-col gap-6">
            <h1 className="text-neutral-900">Welcome back!</h1>
            <Button>Login with Google</Button>
        </SideModal>
    );
}