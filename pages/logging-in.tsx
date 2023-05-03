import { BE_BASE_URL } from "@/config";

// TODO: update this to import from config only
import {
    FE_BASE_URL,
    FE_DOMAIN,
    FE_PROTOCOL,
    FE_TOP_LEVEL_DOMAIN,
} from "@/config/fe-config";

import { EFFIE_AUTH_TOKEN } from "@/constants";
import { useFetchEffieBENew } from "@/hooks/useFetchEffieBENew";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoggingIn() {
    const router = useRouter();
    const [{ isLoading, isError, response, fetchStarted }, fetcher] =
        useFetchEffieBENew();

    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            const accessToken = localStorage.getItem("accessToken") || "";
            const uid = localStorage.getItem("uid") || "";
            const photoURL = localStorage.getItem("photoURL") || "";

            if (accessToken !== "" && uid !== "" && photoURL !== "") {
                fetcher({
                    url: `${BE_BASE_URL}/user/login-google`,
                    method: "POST",
                    auth: accessToken,
                    body: { uid, photoURL },
                });
            }
        }
    }, []);

    // return
    if (isError) {
        return (
            <div>
                <h1>Error</h1>
            </div>
        );
    }

    if (isLoading || !fetchStarted) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        );
    }

    // set token to local storage
    if (typeof localStorage !== "undefined") {
        localStorage.setItem(EFFIE_AUTH_TOKEN, response.token);
    }
    // set to cookie to be used accross subdomains. expire in 1 year
    document.cookie = `${EFFIE_AUTH_TOKEN}=${
        response.token
    }; path=/; domain=${FE_DOMAIN}.${FE_TOP_LEVEL_DOMAIN};expires=${new Date(
        new Date().getTime() + 365 * 24 * 60 * 60 * 1000
    ).toUTCString()};`;

    router.push(`${FE_PROTOCOL}://${response.username}.${FE_BASE_URL}`);

    return <>redirecting...</>;
}
