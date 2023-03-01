import { Button, Input } from "@/components";
import { useState } from "react";
import { BASE_URL } from "@/config";
import { LOCAL_STORAGE_TOKEN } from "@/constants";

export default function CreateUsername() {
    function handleUsernameInput(e: any) {
        console.log(e.target.value);
        setUsername(e.target.value);
    }

    const [username, setUsername] = useState("");

    function handleCreateUsernameOnClick() {
        // hit register.
        const accessToken = localStorage.getItem("accessToken");
        const uid = localStorage.getItem("uid");

        if (!accessToken || !uid || !username) {
            console.error("error");
        } else {
            fetch(`${BASE_URL}/user/register`, {
                method: "POST",
                body: JSON.stringify({
                    uid,
                    username,
                }),
                headers: {
                    Authorization: accessToken,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    localStorage.setItem(LOCAL_STORAGE_TOKEN, data.token);
                });
        }

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
