import { Button } from "@/ui";
import SideModal from "../side-modal";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { initializeApp } from "firebase/app";

import { FIREBASE_CONFIG, BE_BASE_URL, FE_FULL_BASE_URL } from "@/config";
import { useRouter } from "next/router";
import { useFetchEffieBE, useSnackbarStore } from "@/hooks";
import { useState } from "react";
import { saveToCookie } from "@/helper";

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

    const setShowSnackbar = useSnackbarStore(
        (state: any) => state.setShowSnackbar
    );
    const setSsnackbarType = useSnackbarStore(
        (state: any) => state.setSnackbarType
    );
    const setSnackbarTitle = useSnackbarStore(
        (state: any) => state.setSnackbarTitle
    );
    const setSnackbarMessage = useSnackbarStore(
        (state: any) => state.setSnackbarMessage
    );
    const [{ isLoading, isError, response }, fetcher] = useFetchEffieBE();
    const [doneGoogleLogin, setDoneGoogleLogin] = useState(false);

    function handleOnRegisterButtonClick() {
        signInWithPopup(auth, provider)
            .then(async (result: any) => {
                // The signed-in user info.
                // set user to local storage
                saveToCookie("uid", result.user.uid);

                // get id token
                saveToCookie("accessToken", result.user.accessToken);
                saveToCookie("photoURL", result.user.photoURL);

                // now we have uid and accessToken
                // hit api check (check if uid is associated with username)
                fetcher({
                    url: `${BE_BASE_URL}/user/check-google`,
                    method: "POST",
                    auth: result.user.accessToken,
                    body: { uid: result.user.uid },
                });
                setDoneGoogleLogin(true);
            })
            .catch((error) => {
                console.error(error);
                setShowSnackbar(true);
                setSsnackbarType("error");
                setSnackbarTitle("google register error!");
                setSnackbarMessage(error.message);
            });
    }

    if (doneGoogleLogin) {
        // return
        if (isError) {
            setShowSnackbar(true);
            setSsnackbarType("error");
            setSnackbarTitle("register error!");
            setSnackbarMessage(response.message);
        } else if (isLoading) {
            // console.log("loading...");
        } else {
            if (!response.data.isRegistered) {
                // navigate to /createUsername
                onClose();
                router.push(`${FE_FULL_BASE_URL}/create-username`);
            } else {
                // if yes, then error (user already registered)

                setShowSnackbar(true);
                setSsnackbarType("error");
                setSnackbarTitle("user already registered!");
                setSnackbarMessage("Please login instead.");
                setDoneGoogleLogin(false);
            }
        }
    }
    return (
        <>
            <SideModal
                isOpen={isOpen}
                onClose={onClose}
                className="flex flex-col gap-6"
            >
                <h1 className="text-neutral-900">Create a new Effie account</h1>
                <Button
                    onClick={handleOnRegisterButtonClick}
                    disabled={doneGoogleLogin && isLoading}
                >
                    {doneGoogleLogin && isLoading
                        ? "Loading..."
                        : "Register with Google"}
                </Button>
            </SideModal>
        </>
    );
}

function setToLocalStorage(key: string, value: string) {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem(key, value);
    }
}
