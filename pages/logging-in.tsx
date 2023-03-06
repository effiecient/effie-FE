import { BASE_URL } from "@/config";
import {
    FE_BASE_URL,
    FE_DOMAIN,
    FE_PROTOCOL,
    FE_TOP_LEVEL_DOMAIN,
} from "@/config/fe-config";
import { EFFIE_AUTH_TOKEN } from "@/constants";
import { useFetchEffieBE } from "@/hooks";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export default function LoggingIn() {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState<string>("");
    const [uid, setUid] = useState<string>("");

    useEffect(() => {
        if (typeof localStorage !== "undefined") {
            setAccessToken(localStorage.getItem("accessToken") || "");
            setUid(localStorage.getItem("uid") || "");
        }
    }, []);

    const memoizedParams: any = useMemo(() => {
        return {
            url:
                accessToken === "" || uid === ""
                    ? ""
                    : `${BASE_URL}/user/login`,
            method: "POST",
            auth: accessToken,
            body: { uid },
        };
    }, [accessToken, uid]);

    const { isLoading, isError, response } = useFetchEffieBE(memoizedParams);

    console.log("isLoading", isLoading);
    console.log("isError", isError);

    useEffect(() => {
        if (response && response.status !== "ERROR") {
            console.log("response");
            console.log(response);
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
        }
    }, [response]);

    if (isLoading) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        );
    }

    if (isError) {
        return (
            <div>
                <h1>Error</h1>
            </div>
        );
    }
    if (response.status === "ERROR") {
        return (
            <div>
                <h1>Error</h1>
            </div>
        );
    }

    return <>redirecting...</>;
}
