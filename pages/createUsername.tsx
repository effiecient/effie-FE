import { Button, Input } from "@/components";
import { useState } from "react";

export default function CreateUsername() {
    function handleUsernameInput(e: any) {
        setUsername(e.value);
    }

    const [username, setUsername] = useState("");

    function handleCreateUsernameOnClick() {
        // hit register.
        // if token is given, save token and username to localStorage
        // else, give error
    }
    return (
        <>
            {/* <Modal isOpen={isModalOpen} onClose={handleModalClose}> */}
            <label htmlFor="usernameInput">Username :</label>
            <Input
                required
                type="text"
                id="usernameInput"
                name="usernameInput"
                onChange={handleUsernameInput}
                placeholder="username"
            />
            <Button onClick={handleCreateUsernameOnClick}>
                create username
            </Button>
            {/* </Modal> */}
        </>
    );
}
