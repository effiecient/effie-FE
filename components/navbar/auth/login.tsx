import { Button } from "@/ui";
import SideModal from "../side-modal";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { setToLocalStorage } from "@/helpers";

import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";

import { BE_BASE_URL, FIREBASE_CONFIG } from "@/config";
import { useFetchEffieBE, useUserStore } from "@/hooks";
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

    const router = useRouter();

    const [{ isLoading, isError, response, fetchStarted }, fetcher] =
        useFetchEffieBENew();

    function handleSignOut() {
        router.push("/logout");
    }

    const [doneGoogleLogin, setDoneGoogleLogin] = useState(false);

    function handleLoginButton() {
        signInWithPopup(auth, provider)
            .then((result: any) => {
                console.log(result);
                // set user to local storage

                doEffieLogin(
                    result.user.accessToken,
                    result.user.uid,
                    result.user.photoURL
                );
                setDoneGoogleLogin(true);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function doEffieLogin(accessToken: any, uid: any, photoURL: any) {
        fetcher({
            url: `${BE_BASE_URL}/user/login`,
            method: "POST",
            auth: accessToken,
            body: { uid, photoURL },
        });
    }
    if (doneGoogleLogin) {
        // return
        if (isError) {
            return (
                <SideModal isOpen={isOpen} onClose={onClose}>
                    <h1>Error{JSON.stringify(response)}</h1>
                </SideModal>
            );
        } else if (isLoading || !fetchStarted) {
            return (
                <SideModal isOpen={isOpen} onClose={onClose}>
                    <h1>Loading</h1>
                </SideModal>
            );
        } else {
            // set token to local storage
            if (typeof localStorage !== "undefined") {
                localStorage.setItem(EFFIE_AUTH_TOKEN, response.token);
            }
            // set to cookie to be used accross subdomains. expire in 1 year
            document.cookie = `${EFFIE_AUTH_TOKEN}=${
                response.token
            }; path=/; domain=${FE_DOMAIN}.${FE_TOP_LEVEL_DOMAIN};expires=${new Date(
                new Date().getTime() + 365 * 24 * 60 * 60 * 1000
            ).toUTCString()};`;

            // if login in landing, redirect to dashboard. if not, reload page
            onClose();
            if (window.location.pathname === "/") {
                router.push(
                    `${FE_PROTOCOL}://${response.username}.${FE_BASE_URL}`
                );
            } else {
                router.reload();
            }
            return <></>;
        }
    } else {
        return (
            <SideModal
                isOpen={isOpen}
                onClose={onClose}
                className="flex flex-col gap-6 z-10"
            >
                <h1 className="text-neutral-900">Welcome back!</h1>

                {isLoggedIn ? (
                    <div>
                        <p>Logged in as {username}</p>
                        <Button onClick={handleSignOut}>Sign Out</Button>
                    </div>
                ) : (
                    <Button onClick={handleLoginButton}>
                        Login with Google
                    </Button>
                )}
            </SideModal>
        );
    }
}
