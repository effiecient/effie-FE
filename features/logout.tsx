import { EFFIE_AUTH_TOKEN } from "@/constants";

import { getAuth, signOut } from "firebase/auth";

import { initializeApp } from "firebase/app";

import { FIREBASE_CONFIG } from "@/config";

// TODO: update this to import from config only
import { FE_FULL_BASE_URL } from "@/config";
import { useEffect } from "react";
import { removeFromCookie } from "@/helper";

export function Logout() {
    // Initialize Firebase
    const app = initializeApp(FIREBASE_CONFIG);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);

    function handleGoogleSignOut() {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                // console.log("sign out success");
                // remove user from local storage
                if (typeof localStorage !== "undefined") {
                    localStorage.removeItem("uid");
                    localStorage.removeItem("accessToken");
                }
            })
            .catch((error) => {
                // An error happened.
                // console.log("sign out failed");
            });
    }

    // redirect to landing
    useEffect(() => {
        // remove EFFIE_AUTH_TOKEN from cookie
        if (typeof window !== "undefined") {
            // document.cookie = `${EFFIE_AUTH_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${FE_DOMAIN}.${FE_TOP_LEVEL_DOMAIN};`;
            removeFromCookie(EFFIE_AUTH_TOKEN);
            removeFromCookie("theme");
            removeFromCookie("isSortAsc");
            removeFromCookie("sortOption");
            removeFromCookie("view");
        }

        handleGoogleSignOut();
        window.location.href = FE_FULL_BASE_URL;
    }, []);
    return <>logging out...</>;
}
