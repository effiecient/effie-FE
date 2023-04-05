import { Button } from "@/ui";
import { useState } from "react";
import { BE_BASE_URL } from "@/config";
import { EFFIE_AUTH_TOKEN } from "@/constants";
import { useRouter } from "next/router";
import Icon from "@/public/icons/create-username.svg";
import Image from "next/image";
export default function CreateUsername() {
    function handleUsernameInput(e: any) {
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
        <div className="flex w-full h-full justify-center items-center">
            {/* <Modal isOpen={isModalOpen} onClose={handleModalClose}> */}
            <div className="flex flex-row h-fit w-fit gap-8">
                <div>
                    <Image src={Icon} alt="create username icon"></Image>
                </div>
                <div>
                    <h1 className="text-neutral-900">Create your username.</h1>
                    <div className="flex flex-col my-6 gap-1">
                        <p className="text-neutra-900">
                            One last step! Your Effie username will be used in
                            your personal shareable link.
                        </p>
                        <p className="text-danger-400">
                            This username is permanent and cannot be changed
                            once created.
                        </p>
                    </div>
                    <form onSubmit={handleCreateUsernameOnClick} className="flex flex-row gap-6">
                        <input
                            className="input flex flex-grow"
                            required
                            type="text"
                            id="usernameInput"
                            name="usernameInput"
                            onChange={handleUsernameInput}
                            placeholder="Username"
                        />
                        <Button onClick={handleCreateUsernameOnClick} className="p-3 flex items-center">
                            Create Username
                        </Button>
                    </form>
                    <p className="text-neutral-500 mt-6">Your shareable Effie link: https://<span className="text-primary-500 font-bold">username</span>.effie.boo/path/to/file</p>
                </div>
            </div>
            {/* </Modal> */}
        </div>
    );
}
