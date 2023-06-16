import { Button } from "@/ui";
import SideModal from "../side-modal";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { useState } from "react";

import { BE_BASE_URL, FIREBASE_CONFIG } from "@/config";
import { useSnackbarStore, useUserStore } from "@/hooks";
import { useRouter } from "next/router";

// TODO: update this to import from config only
import {
    FE_BASE_URL,
    FE_DOMAIN,
    FE_PROTOCOL,
    FE_TOP_LEVEL_DOMAIN,
} from "@/config/fe-config";

import { EFFIE_AUTH_TOKEN } from "@/constants";
import { useFetchEffieBENew } from "@/hooks/useFetchEffieBENew";
type LoginProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function Login({ isOpen, onClose }: LoginProps) {
    // Initialize Firebase
    const app = initializeApp(FIREBASE_CONFIG);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const isLoggedIn = useUserStore((state: any) => state.isLoggedIn);
    const username = useUserStore((state: any) => state.username);
    const pathname = useUserStore((state: any) => state.pathname);

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

    const [{ isLoading, isError, response }, fetcher] = useFetchEffieBENew();

    const [doneGoogleLogin, setDoneGoogleLogin] = useState(false);

    function handleLoginButton() {
        signInWithPopup(auth, provider)
            .then((result: any) => {
                console.log(result);
                // set user to local storage
                fetcher({
                    url: `${BE_BASE_URL}/user/login-google`,
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
                setSnackbarTitle("google login error!");
                setSnackbarMessage(error.message);
            });
    }

    if (doneGoogleLogin) {
        // return
        if (isError) {
            setShowSnackbar(true);
            setSsnackbarType("error");
            setSnackbarTitle("login error!");
            setSnackbarMessage(response.message);
            setDoneGoogleLogin(false);
        } else if (isLoading) {
        } else {
            // set token to local storage
            if (typeof localStorage !== "undefined") {
                localStorage.setItem(EFFIE_AUTH_TOKEN, response.data.token);
            }
            // set to cookie to be used accross subdomains. expire in 1 year
            document.cookie = `${EFFIE_AUTH_TOKEN}=${
                response.data.token
            }; path=/; domain=${FE_DOMAIN}.${FE_TOP_LEVEL_DOMAIN};expires=${new Date(
                new Date().getTime() + 365 * 24 * 60 * 60 * 1000
            ).toUTCString()};`;

            // if login in landing, redirect to dashboard. if not, reload page
            // onClose();
            if (pathname === "/") {
                router.push(
                    `${FE_PROTOCOL}://${response.data.username}.${FE_BASE_URL}`
                );
            } else {
                router.reload();
            }
        }
    }
    return (
        <SideModal
            isOpen={isOpen}
            onClose={onClose}
            className="flex flex-col gap-6 z-10"
        >
            <h1 className="text-neutral-900">Welcome back!</h1>

            <Button
                onClick={handleLoginButton}
                disabled={doneGoogleLogin && isLoading}
            >
                {doneGoogleLogin && isLoading
                    ? "Loading..."
                    : "Login with Google"}
            </Button>
        </SideModal>
    );
}
