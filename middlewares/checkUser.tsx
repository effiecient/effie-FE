import { BASE_URL } from "@/config";
import { FE_DOMAIN } from "@/config/fe-config";
import { EFFIE_AUTH_TOKEN } from "@/constants";

import { useFetchEffieBE, useUserStore } from "@/hooks";

// used to set isLoggedIn, username, isSubdomain, subdomain
export default function CheckUser({ children }: any) {
    const setUsername = useUserStore((state: any) => state.setUsername);
    const setIsLoggedIn = useUserStore((state: any) => state.setIsLoggedIn);
    const setIsSubdomain = useUserStore((state: any) => state.setIsSubdomain);
    const setSubdomain = useUserStore((state: any) => state.setSubdomain);

    // if effie_auth_token exist, set user to logged in
    let effieAuthToken = "";

    // get effie_auth_token from cookie
    if (typeof window !== "undefined") {
        document.cookie.split(";").forEach((cookie) => {
            const [key, value] = cookie.split("=");
            if (key === EFFIE_AUTH_TOKEN) {
                // set user to logged in
                effieAuthToken = value;
            }
        });
    }

    console.log("effieAuthToken", effieAuthToken);

    // check auth
    const { isLoading, isError, respond } = useFetchEffieBE(
        effieAuthToken !== "" ? `${BASE_URL}/auth` : "",
        "POST",
        effieAuthToken
    );

    if (isLoading) {
        return <div>global page Loading</div>;
    }

    if (isError) {
        setIsLoggedIn(false);
    } else {
        if (respond.success) {
            console.log("respond.username", respond.username);
            setUsername(respond.username);
            setIsLoggedIn(true);
        }
    }

    // set isSubdomain and subdomain
    let isSubdomain = false;
    if (typeof window !== "undefined") {
        const arrayOfURL = window.location.hostname.split(".");
        console.log("arrayOfURL", arrayOfURL);
        // check the index location of domain
        const indexOfDomain = arrayOfURL.indexOf(FE_DOMAIN);
        // if index 0, it is not a subdomain
        if (indexOfDomain === 0) {
            isSubdomain = false;
        }
        // if index 1, it is a subdomain, check if it's www
        if (indexOfDomain === 1) {
            if (arrayOfURL[0] === "www") {
                isSubdomain = false;
            } else {
                isSubdomain = true;
            }
        }

        setIsSubdomain(isSubdomain);
        setSubdomain(arrayOfURL[0]);
    }
    console.log("isSubdomain", isSubdomain);

    return children;
}
