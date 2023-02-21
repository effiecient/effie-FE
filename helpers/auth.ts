import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBIlSbwlKUovrLptRCcByKoesYU8rZXMlw",
    authDomain: "effie-be.firebaseapp.com",
    projectId: "effie-be",
    storageBucket: "effie-be.appspot.com",
    messagingSenderId: "1094450506359",
    appId: "1:1094450506359:web:6f7b97eefc899603dd3472",
    measurementId: "G-9670T0JENL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Log in with Google
export const handleLogIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // ...
        // setIsLoggedIn(true);
        // set user to local storage
        if (localStorage) {
            localStorage.setItem("uid", user.uid);
        }
        // get id token
        auth.currentUser?.getIdToken(true)
        .then((idToken) => {
            if (localStorage) {
                localStorage.setItem("idToken", idToken);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    })
    .catch((error) => {
        console.error(error);
    });

    // const [isLoading, setIsLoading] = useState(true);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // let [userData, setUserData] = useState<any>(null);

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         // User is signed in, see docs for a list of available properties
    //         const uid = user.uid;
    //         console.log("user is signed in");
    //         console.log(uid);
    //         setIsLoggedIn(true);
    //         // set user to local storage
    //         if (typeof localStorage !== "undefined") {
    //         localStorage.setItem("uid", uid);
    //         }
    //         // get id token
    //         auth.currentUser
    //         ?.getIdToken(true)
    //         .then(function (idToken) {
    //             // Send token to your backend via HTTPS
    //             // ...
    //             if (typeof localStorage !== "undefined") {
    //             localStorage.setItem("idToken", idToken);
    //             }
    //         })
    //         .catch(function (error) {
    //             // Handle error
    //             console.log(error);
    //         });
    //         setUserData(user);
    //     } else {
    //         // User is signed out
    //         // ...
    //         console.log("user is signed out");
    //         setIsLoggedIn(false);
    //         // remove user from local storage
    //         //    prevent localStorage not defined error
    //         if (typeof localStorage !== "undefined") {
    //         localStorage.removeItem("uid");
    //         localStorage.removeItem("idToken");
    //         }
    //     }
    //     setIsLoading(false);
    //     });
    // }, [auth]);
}

export function handleSignOut() {
    signOut(auth)
    .then(() => {
        // Sign-out successful.
        console.log("Sign out success.");
        // remove user from local storage
        if (typeof localStorage !== "undefined") {
        localStorage.removeItem("uid");
        localStorage.removeItem("idToken");
        }
    })
    .catch((error) => {
        // An error happened.
        console.error("Sign out failed. ", error);
    });
    // setIsLoggedIn(false);
}