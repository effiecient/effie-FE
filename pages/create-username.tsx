import { Button } from "@/ui";
import { useState } from "react";
import { BE_BASE_URL } from "@/config";
import { EFFIE_AUTH_TOKEN } from "@/constants";
import { useRouter } from "next/router";
export default function CreateUsername() {
    function handleUsernameInput(e: any) {
        console.log(e.target.value);
        setUsername(e.target.value);
    }

    const [username, setUsername] = useState("");
    const router = useRouter();
    function handleCreateUsernameOnClick() {
        // hit register.
        const accessToken = localStorage.getItem("accessToken");
        const uid = localStorage.getItem("uid");

        if (!accessToken || !uid || !username) {
            console.error("error");
        } else {
            fetch(`${BE_BASE_URL}/user/register`, {
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
                    router.push("/logging-in");
                });
        }

        // if token is given, save token and username to localStorage
        // else, give error
    }
    return (
        <>
            {/* <Modal isOpen={isModalOpen} onClose={handleModalClose}> */}
            <label htmlFor="usernameInput">Username :</label>
            <input
                className="input"
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
