import { BE_BASE_URL } from "@/config";

// TODO: update this to import from config only
import { FE_DOMAIN } from "@/config/fe-config";

import { useUserStore } from "@/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFetchEffieBENew } from "@/hooks/useFetchEffieBENew";
import { getEffieAuthTokenFromCookie } from "@/helpers";
import LoadingPage from "@/components/loading-page";

// used to set isLoggedIn, username, isSubdomain, subdomain
export default function CheckUser({ children }: any) {
    const router = useRouter();

    const setUsername = useUserStore((state: any) => state.setUsername);
    const setIsLoggedIn = useUserStore((state: any) => state.setIsLoggedIn);
    const setIsSubdomain = useUserStore((state: any) => state.setIsSubdomain);
    const setSubdomain = useUserStore((state: any) => state.setSubdomain);
    const setPhotoURL = useUserStore((state: any) => state.setPhotoURL);
    const setHasPhotoURL = useUserStore((state: any) => state.setHasPhotoURL);

    // if effie_auth_token exist, set user to logged in
    const [effieAuthToken, setEffieAuthToken] = useState<any>(null);

    // get effie_auth_token from cookie
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
    }, []);
    const [{ isLoading, isError, response, fetchStarted }, fetcher] =
        useFetchEffieBENew();

    useEffect(() => {
        if (effieAuthToken !== "") {
            fetcher({
                url: `${BE_BASE_URL}/auth`,
                method: "POST",
                auth: effieAuthToken,
            });
        }
    }, [effieAuthToken]);
    // short circuit
    // if /logout, return children
    if (router.pathname === "/logout") {
        return children;
    }

    if (effieAuthToken === "") {
        setIsLoggedIn(false);
        return children;
    } else {
        if (isError) {
            setIsLoggedIn(false);

            return (
                <>
                    <div>error: {response.message}</div>
                    TODO: add logout button
                </>
            );
        }

        if (isLoading || !fetchStarted) {
            return <LoadingPage />;
        } else {
            setUsername(response.username);
            setIsLoggedIn(true);
            if (response.photoURL !== undefined) {
                setPhotoURL(response.photoURL);
                setHasPhotoURL(true);
            } else {
                setHasPhotoURL(false);
            }

            return children;
        }
    }
}
