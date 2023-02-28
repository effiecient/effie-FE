import Button from "../button";
import SideModal from "../side-modal";

import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBIlSbwlKUovrLptRCcByKoesYU8rZXMlw",
  authDomain: "effie-be.firebaseapp.com",
  projectId: "effie-be",
  storageBucket: "effie-be.appspot.com",
  messagingSenderId: "1094450506359",
  appId: "1:1094450506359:web:6f7b97eefc899603dd3472",
  measurementId: "G-9670T0JENL",
};

type LoginProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function Login({ isOpen, onClose } : LoginProps) {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            const uid = user.uid;
            console.log("user is signed in");
            console.log(uid);
            setIsLoggedIn(true);
            // set user to local storage
            if (typeof localStorage !== "undefined") {
            localStorage.setItem("uid", uid);
            }
            // get id token
            auth.currentUser
            ?.getIdToken(true)
            .then(function (idToken) {
                // Send token to your backend via HTTPS
                // ...
                if (typeof localStorage !== "undefined") {
                localStorage.setItem("idToken", idToken);
                }
            })
            .catch(function (error) {
                // Handle error
                console.log(error);
            });
            setUserData(user);
        } else {
            // User is signed out
            // ...
            console.log("user is signed out");
            setIsLoggedIn(false);
            // remove user from local storage
            //    prevent localStorage not defined error
            if (typeof localStorage !== "undefined") {
            localStorage.removeItem("uid");
            localStorage.removeItem("idToken");
            }
        }
        setIsLoading(false);
        });
    }, [auth]);

    function handleSignOut() {
        signOut(auth)
        .then(() => {
            // Sign-out successful.
            console.log("sign out success");
            // remove user from local storage
            if (typeof localStorage !== "undefined") {
            localStorage.removeItem("uid");
            localStorage.removeItem("idToken");
            }
        })
        .catch((error) => {
            // An error happened.
            console.log("sign out failed");
        });
        setIsLoggedIn(false);
    }
    function handleLoginButton() {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            // ...
            setIsLoggedIn(true);
            // set user to local storage
            if (typeof localStorage !== "undefined") {
            localStorage.setItem("uid", user.uid);
            }
            // get id token
            auth.currentUser
            ?.getIdToken(true)
            .then(function (idToken) {
                // Send token to your backend via HTTPS
                // ...
                if (typeof localStorage !== "undefined") {
                localStorage.setItem("idToken", idToken);
                }
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
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    isLoading && <div>loading...</div>;
    
    return (
        <SideModal isOpen={isOpen} onClose={onClose} className="flex flex-col gap-6 z-10">
            <h1 className="text-neutral-900">Welcome back!</h1>
            
            {isLoggedIn ? (
                <div>
                    <p>Logged in as {userData.displayName}</p>
                    <Button onClick={handleSignOut}>Sign Out</Button>
                </div>
            ) : (
                <Button onClick={handleLoginButton}>Login with Google</Button>
            )}
        </SideModal>
    );
}