import { BASE_URL } from "@/config";
import { FE_DOMAIN } from "@/config/fe-config";
import { EFFIE_AUTH_TOKEN } from "@/constants";

import { useFetchEffieBE, useUserStore } from "@/hooks";
import { useEffect, useState } from "react";

// used to set isLoggedIn, username, isSubdomain, subdomain
export default function CheckUser({ children }: any) {
    const setUsername = useUserStore((state: any) => state.setUsername);
    const setIsLoggedIn = useUserStore((state: any) => state.setIsLoggedIn);
    const setIsSubdomain = useUserStore((state: any) => state.setIsSubdomain);
    const setSubdomain = useUserStore((state: any) => state.setSubdomain);

    // if effie_auth_token exist, set user to logged in
    // let effieAuthToken = "";
    const [effieAuthToken, setEffieAuthToken] = useState<any>(null);
    const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false);

    // get effie_auth_token from cookie
    useEffect(() => {
        document.cookie.split(";").forEach((cookie) => {
            const [key, value] = cookie.split("=");
            if (key === EFFIE_AUTH_TOKEN) {
                // set user to logged in
                setEffieAuthToken(value);
            }
        });
        setIsAuthChecked(true);

        // set isSubdomain and subdomain
        let isSubdomain = false;
        const arrayOfURL = window.location.hostname.split(".");
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
    }, [setIsSubdomain, setSubdomain]);

    // check auth
    const { isLoading, isError, response } = useFetchEffieBE({
        url: effieAuthToken === null ? "" : `${BASE_URL}/auth`,
        method: "POST",
        auth: effieAuthToken,
    });

    if (!isAuthChecked) {
        return <div>global page Loading</div>;
    } else {
        if (isLoading) {
            return <div>global page Loading</div>;
        } else {
            if (effieAuthToken === null) {
                return children;
            } else {
                if (isError) {
                    setIsLoggedIn(false);

                    return <>error</>;
                } else {
                    if (response.success) {
                        setUsername(response.username);
                        setIsLoggedIn(true);
                    }
                    return children;
                }
            }
        }
    }
}
