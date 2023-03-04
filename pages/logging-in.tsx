import { BASE_URL, FE_BASE_URL } from "@/config";
import { FE_DOMAIN } from "@/config/fe-config";
import { EFFIE_AUTH_TOKEN } from "@/constants";
import { useFetchEffieBE } from "@/hooks";
import { useRouter } from "next/router";

export default function LoggingIn() {
    const router = useRouter();
    let accessToken = "";
    let uid;
    if (typeof localStorage !== "undefined") {
        accessToken = localStorage.getItem("accessToken") || "";
        uid = localStorage.getItem("uid");
    }

    const { isLoading, isError, respond } = useFetchEffieBE(
        `${BASE_URL}/user/login`,
        "POST",
        accessToken,
        { uid }
    );

    console.log("isLoading", isLoading);
    console.log("isError", isError);

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

    // set token to local storage
    if (typeof localStorage !== "undefined") {
        localStorage.setItem(EFFIE_AUTH_TOKEN, respond.token);
    }
    // set to cookie to be used accross subdomains
    document.cookie = `${EFFIE_AUTH_TOKEN}=${respond.token}; path=/; domain=${FE_DOMAIN};`;

    // redirect to dashboard
    router.push(`http://${respond.username}.${FE_BASE_URL}`);
    return <>redirecting...</>;
}
