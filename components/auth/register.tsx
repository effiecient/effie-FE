import { Button, SideModal, Modal, Input } from "@/components";

import { useState } from "react";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { initializeApp } from "firebase/app";

import { FIREBASE_CONFIG } from "@/config";

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

    const [sudahLoginGoogleBelom, setSudahLoginGoogleBelom] = useState(false);
    function handleOnRegisterButtonClick() {
        // contact firebase auth,
        signInWithPopup(auth, provider)
            .then((result) => {
                setSudahLoginGoogleBelom(true);

                // The signed-in user info.
                const user = result.user;
                // set user to local storage
                if (typeof localStorage !== "undefined") {
                    localStorage.setItem("uid", user.uid);
                }

                // get accessToken
                auth.currentUser
                    ?.getIdToken(true)
                    .then(function (accessToken) {
                        // Send token to your backend via HTTPS
                        console.log("accessToken");
                        console.log(accessToken);
                        if (typeof localStorage !== "undefined") {
                            localStorage.setItem("accessToken", accessToken);
                        }
                        // hit api check (check if uid is associated with username)
                        // if yes, then error (user already registered)
                        // TODO: change this behaviour to - if registered, then just do login, while giving a little toast saying "you're already registered"
                        // else, open modal and user can input username.
                        // redirect to createUsername
                    })
                    .catch(function (error) {
                        // Handle error
                        console.log("error");
                    });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
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
