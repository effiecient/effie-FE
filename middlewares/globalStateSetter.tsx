import { useEffect } from "react";
import Link from "next/link";

import { Button } from "@/ui";
import { useUserStore } from "@/hooks";
import { saveToCookie } from "@/helper";
import { EFFIE_AUTH_TOKEN } from "@/constants";

// set fetched data into zustand store
export default function GlobalStateSetter({
    children,
    isLoggedIn,
    isAuthError,
    authResponse,
    isSubdomain,
    subdomain,
}: any) {
    const setUsername = useUserStore((state: any) => state.setUsername);
    const setIsLoggedIn = useUserStore((state: any) => state.setIsLoggedIn);
    const setIsSubdomain = useUserStore((state: any) => state.setIsSubdomain);
    const setSubdomain = useUserStore((state: any) => state.setSubdomain);
    const setPhotoURL = useUserStore((state: any) => state.setPhotoURL);

    // get effie_auth_token from cookie on first render
    useEffect(() => {
        setIsSubdomain(isSubdomain);
        setSubdomain(subdomain);

        setIsLoggedIn(!isAuthError && isLoggedIn);

        if (isLoggedIn && !isAuthError) {
            setUsername(authResponse.data.username);
            setIsLoggedIn(true);
            setPhotoURL(authResponse.data.photoURL);
            // set new token
            // set to cookie to be used accross subdomains. expire in 1 year
            saveToCookie(EFFIE_AUTH_TOKEN, authResponse.data.token);
        }
    }, []);

    if (isLoggedIn && isAuthError) {
        return (
            <>
                <div>error: {authResponse.message}</div>
                <Button>
                    <Link href="/logout">Logout</Link>
                </Button>
            </>
        );
    }

    return children;
}
