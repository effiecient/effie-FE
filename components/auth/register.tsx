import { Button, SideModal, Modal, Input } from "@/components";
import { useState } from "react";
type RegisterProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function Register({ isOpen, onClose }: RegisterProps) {
    function handleOnRegisterButtonClick() {
        // contact firebase auth,
        // set uid and accessToken in localStorage
        // hit api check (check if uid is associated with username)
        // if yes, then error (user already registered)
        // TODO: change this behaviour to - if registered, then just do login, while giving a little toast saying "you're already registered"
        // else, open modal and user can input username.
        // redirect to createUsername
    }

    return (
        <>
            <SideModal
                isOpen={isOpen}
                onClose={onClose}
                className="flex flex-col gap-6"
            >
                <h1 className="text-neutral-900">Create a new Effie account</h1>
                <Button onClick={handleOnRegisterButtonClick}>
                    Register with Google
                </Button>
            </SideModal>
        </>
    );
}
