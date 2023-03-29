import { Button, SideModal } from "@/ui";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";

import { BE_BASE_URL, FIREBASE_CONFIG } from "@/config";
import { useFetchEffieBE, useUserStore } from "@/hooks";
import { useRouter } from "next/router";

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

    function handleSignOut() {
        router.push("/logout");
    }

    function handleLoginButton() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                // set user to local storage
                if (typeof localStorage !== "undefined") {
                    localStorage.setItem("uid", user.uid);
                }
                // get id token
                auth.currentUser
                    ?.getIdToken(true)
                    .then(function (accessToken) {
                        if (typeof localStorage !== "undefined") {
                            localStorage.setItem("accessToken", accessToken);
                        }
                        // Send token to your backend via HTTPS
                        onClose();
                        router.push("/logging-in");
                    })
                    .catch(function (error) {
                        // Handle error
                        console.log("error");
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }

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
                <Button onClick={handleLoginButton}>Login with Google</Button>
            )}
        </SideModal>
    );
}
