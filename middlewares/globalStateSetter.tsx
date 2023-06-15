import { BE_BASE_URL } from "@/config";

// TODO: update this to import from config only
import { FE_DOMAIN, FE_TOP_LEVEL_DOMAIN } from "@/config/fe-config";

import { useUserStore } from "@/hooks";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/ui";
import { getKeyFromCookie, saveToCookie } from "@/helper";
import { EFFIE_AUTH_TOKEN } from "@/constants";

// used to set isLoggedIn, username, isSubdomain, subdomain
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

    const setView = useUserStore((state: any) => state.setView);
    const setSortOption = useUserStore((state: any) => state.setSortOption);
    const setIsSortAsc = useUserStore((state: any) => state.setIsSortAsc);

    // get effie_auth_token from cookie on first render
    useEffect(() => {
        setIsSubdomain(isSubdomain);
        setSubdomain(subdomain);

        // ### check browser preference ###
        const view = getKeyFromCookie("view");
        if (view !== "") {
            setView(view);
        }
        const sortOption = getKeyFromCookie("sortOption");
        if (sortOption) {
            setSortOption(sortOption);
        }
        const isSortAsc = getKeyFromCookie("isSortAsc");
        if (isSortAsc) {
            setIsSortAsc(JSON.parse(isSortAsc));
        }
    }, []);

    // normal return
    // 1. return if not logged in
    if (!isLoggedIn) {
        setIsLoggedIn(false);
        return children;
    } else {
        // 2. return if logged in
        if (isAuthError) {
            setIsLoggedIn(false);

            return (
                <>
                    <div>error: {authResponse.message}</div>
                    <Button>
                        <Link href="/logout">Logout</Link>
                    </Button>
                </>
            );
        }

        setUsername(authResponse.data.username);
        setIsLoggedIn(true);
        setPhotoURL(authResponse.data.photoURL);
        // set new token
        // set to cookie to be used accross subdomains. expire in 1 year
        saveToCookie(EFFIE_AUTH_TOKEN, authResponse.data.token);

        return children;
    }
}
