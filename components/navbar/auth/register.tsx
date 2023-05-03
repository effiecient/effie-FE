import { Button } from "@/ui";
import SideModal from "../side-modal";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { initializeApp } from "firebase/app";

import { FIREBASE_CONFIG, BE_BASE_URL } from "@/config";
import { useRouter } from "next/router";

import { setToLocalStorage } from "@/helpers";

type RegisterProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function Register({ isOpen, onClose }: RegisterProps) {
    // Initialize Firebase
    const app = initializeApp(FIREBASE_CONFIG);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const router = useRouter();

    function handleOnRegisterButtonClick() {
        signInWithPopup(auth, provider)
            .then(async (result: any) => {
                // The signed-in user info.
                // set user to local storage
                setToLocalStorage("uid", result.user.uid);

                // get id token
                setToLocalStorage("accessToken", result.user.accessToken);
                setToLocalStorage("photoURL", result.user.photoURL);

                // now we have uid and accessToken
                // hit api check (check if uid is associated with username)
                const body = {
                    uid: result.user.uid,
                };
                const res = await fetch(`${BE_BASE_URL}/user/check-google`, {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        Authorization: result.user.accessToken,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });
                const data = await res.json();
                console.log("coba hit");
                console.log(data);
                // TODO: Handle klik login belom regis
                if (!data.data.isRegistered) {
                    // navigate to /createUsername
                    onClose();
                    router.push("/create-username");
                } else {
                    // if yes, then error (user already registered)
                    // TODO: Buat toast
                    console.error("Udah regis");
                    alert("Udah regis");
                }
                // TODO: change this behaviour to - if registered, then just do login, while giving a little toast saying "you're already registered"
                // else, open modal and user can input username.
                // redirect to createUsername
            })
            .catch((error) => {
                console.error(error);
            });
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
