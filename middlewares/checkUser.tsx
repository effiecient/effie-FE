import { BASE_URL } from "@/config";
import { EFFIE_AUTH_TOKEN } from "@/constants";

import { useFetchEffieBE, useUserStore } from "@/hooks";

export default function CheckUser({ children }: any) {
    const setUsername = useUserStore((state: any) => state.setUsername);
    const setIsLoggedIn = useUserStore((state: any) => state.setIsLoggedIn);
    // if effie_auth_token exist, set user to logged in

    let effieAuthToken;
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
        `${BASE_URL}/auth`,
        "POST",
        effieAuthToken
    );

    console.log(respond);
    // setup global variables for user

    if (isLoading) {
        return <div>global page Loading</div>;
    }

    if (respond.success) {
        setUsername(respond.username);
        setIsLoggedIn(true);
    } else {
        setIsLoggedIn(false);
    }
    return children;
}
