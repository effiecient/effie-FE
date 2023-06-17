import { Snackbar } from "@/components";
import { Browser, Landing } from "@/features";
import { QuickCreate } from "@/features";

import { BE_BASE_URL, BE_STATUS_ERROR } from "@/config";
import { EFFIE_AUTH_TOKEN } from "@/constants";
import { GlobalStateSetter } from "@/middlewares";

export default function Index({
    isLoggedIn,
    isAuthError,
    isError,
    response,
    authResponse,
    isSubdomain,
    subdomain,
}: any) {
    const globalStateSetterProps = {
        isLoggedIn,
        isAuthError,
        authResponse,
        isSubdomain,
        subdomain,
    };
    const browserProps = {
        isError,
        response,
    };

    if (isSubdomain) {
        return (
            <GlobalStateSetter {...globalStateSetterProps}>
                <Browser {...browserProps} />
            </GlobalStateSetter>
        );
    } else {
        if (isLoggedIn) {
            return (
                <GlobalStateSetter {...globalStateSetterProps}>
                    <QuickCreate />
                </GlobalStateSetter>
            );
        } else {
            return <Landing />;
        }
    }
}

export async function getServerSideProps(context: any) {
    let isLoggedIn = false;
    let isSubdomain = false;
    let subdomain = null;

    let authResponse = null;
    let isAuthError = false;

    let response = null;
    let isError = false;

    let theme = "";

    // get data from cookie
    const cookies = context.req.headers.cookie;
    let authToken = undefined;

    if (cookies) {
        const cookieArr = cookies.split(";");

        const token = cookieArr.find((item: any) =>
            item.includes(EFFIE_AUTH_TOKEN)
        );
        if (token) {
            authToken = token.split("=")[1];
            isLoggedIn = true;
        }
        const keyvalue = cookieArr.find((item: any) => item.includes("theme"));
        if (keyvalue) {
            theme = keyvalue.split("=")[1];
        }
    }

    // # fetch auth
    if (isLoggedIn) {
        try {
            const url = `${BE_BASE_URL}/auth`;
            authResponse = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `${authToken}`,
                },
            }).then((res) => res.json());
        } catch (e) {
            isAuthError = true;
        }

        if (authResponse.status == BE_STATUS_ERROR) {
            isAuthError = true;
        }
    }

    // get subdomain
    const host = context.req.headers.host;
    subdomain = host.split(".")[0];

    // get pathname
    const pathname = context.req.url;
    console.log("pathname server side", pathname);

    if (subdomain && subdomain !== "www") {
        isSubdomain = true;
        // # fetch initial data
        try {
            const url = `${BE_BASE_URL}/directory/${subdomain}${pathname}`;
            response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `${authToken}`,
                },
            }).then((res) => res.json());
        } catch (e) {
            isError = true;
        }

        if (response.status == BE_STATUS_ERROR) {
            isError = true;
        }
    } else {
        isError = true;
    }

    return {
        props: {
            isLoggedIn,
            isAuthError,
            isError,
            response,
            authResponse,
            isSubdomain,
            subdomain,
            theme,
        },
    };
}
