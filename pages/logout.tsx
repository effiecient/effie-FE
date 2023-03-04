import { EFFIE_AUTH_TOKEN } from "@/constants";

import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";

import { initializeApp } from "firebase/app";

import { FIREBASE_CONFIG } from "@/config";
export default function Logout() {
    // Initialize Firebase
    const app = initializeApp(FIREBASE_CONFIG);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    function handleGoogleSignOut() {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                console.log("sign out success");
                // remove user from local storage
                if (typeof localStorage !== "undefined") {
                    localStorage.removeItem("uid");
                    localStorage.removeItem("accessToken");
                }
            })
            .catch((error) => {
                // An error happened.
                console.log("sign out failed");
            });
    }

    // remove EFFIE_AUTH_TOKEN from cookie
    if (typeof window !== "undefined") {
        document.cookie = `${EFFIE_AUTH_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    // remove EFFIE_AUTH_TOKEN from local storage
    if (typeof localStorage !== "undefined") {
        localStorage.removeItem(EFFIE_AUTH_TOKEN);
    }

    handleGoogleSignOut();

    // redirect to home
    window.location.href = "/";
}
