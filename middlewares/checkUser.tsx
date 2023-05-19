import { BE_BASE_URL } from "@/config";

// TODO: update this to import from config only
import { FE_DOMAIN, FE_TOP_LEVEL_DOMAIN } from "@/config/fe-config";

import { useUserStore } from "@/hooks";
import { useEffect, useState } from "react";
import { useFetchEffieBENew } from "@/hooks/useFetchEffieBENew";
import LoadingPage from "@/components/loading-page";
import Link from "next/link";
import { Button } from "@/ui";
import { getEffieAuthTokenFromCookie } from "@/helper";
import { EFFIE_AUTH_TOKEN } from "@/constants";

// used to set isLoggedIn, username, isSubdomain, subdomain
export default function CheckUser({ children }: any) {
    const setUsername = useUserStore((state: any) => state.setUsername);
    const setIsLoggedIn = useUserStore((state: any) => state.setIsLoggedIn);
    const setIsSubdomain = useUserStore((state: any) => state.setIsSubdomain);
    const setSubdomain = useUserStore((state: any) => state.setSubdomain);
    const setPhotoURL = useUserStore((state: any) => state.setPhotoURL);
    const setPathname = useUserStore((state: any) => state.setPathname);
    const [effieAuthToken, setEffieAuthToken] = useState<any>(null);
    let pathname;
    // get effie_auth_token from cookie on first render
    useEffect(() => {
        setEffieAuthToken(getEffieAuthTokenFromCookie());

        // set isSubdomain and subdomain
        let isSubdomain = false;
        const arrayOfURL = window.location.hostname.split(".");
        // check the index location of domain
        let indexOfDomain;
        // handle if FE_SUBDOMAIN contain dot
        if (FE_DOMAIN.indexOf(".") === -1) {
            indexOfDomain = arrayOfURL.indexOf(FE_DOMAIN);
        } else {
            // get the first index of FE_DOMAIN splited using dot
            indexOfDomain = arrayOfURL.indexOf(FE_DOMAIN.split(".")[0]);
        }
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
        // get the URLLocation
        setIsSubdomain(isSubdomain);
        setSubdomain(arrayOfURL[0]);

        if (typeof window !== "undefined") {
            pathname = window.location.pathname;
            // console.log(pathname);
            // remove if start with /
            setPathname(pathname.replace(/^\//, ""));
        }
    }, []);
    const [{ isLoading, isError, response, fetchStarted }, fetcher] =
        useFetchEffieBENew();

    // trigger fetch
    useEffect(() => {
        if (effieAuthToken !== "" && effieAuthToken !== null) {
            fetcher({
                url: `${BE_BASE_URL}/auth`,
                method: "POST",
                auth: effieAuthToken,
            });
        }
    }, [effieAuthToken]);

    // short circuit
    // if /logout, return children
    if (typeof window !== "undefined") {
        if (window.location.pathname === "/logout") {
            setIsLoggedIn(false);
            return children;
        }
    }

    if (effieAuthToken === "") {
        setIsLoggedIn(false);
        return children;
    } else if (effieAuthToken !== null) {
        if (isError) {
            setIsLoggedIn(false);

            return (
                <>
                    <div>error: {response.message}</div>
                    <Button>
                        <Link href="/logout">Logout</Link>
                    </Button>
                </>
            );
        }

        if (isLoading || !fetchStarted) {
            return <LoadingPage />;
        } else {
            setUsername(response.data.username);
            setIsLoggedIn(true);
            setPhotoURL(response.data.photoURL);
            // set new token
            // set to cookie to be used accross subdomains. expire in 1 year
            document.cookie = `${EFFIE_AUTH_TOKEN}=${
                response.data.token
            }; path=/; domain=${FE_DOMAIN}.${FE_TOP_LEVEL_DOMAIN};expires=${new Date(
                new Date().getTime() + 365 * 24 * 60 * 60 * 1000
            ).toUTCString()};`;

            return children;
        }
    }
}
