import { About, Browser, CreateUsername, Logout } from "@/features";

import { GlobalStateSetter } from "@/middlewares";
import React from "react";

import { EFFIE_AUTH_TOKEN } from "@/constants";
import { BE_BASE_URL, BE_STATUS_ERROR } from "@/config";

export default function Directory({
    isLoggedIn,
    isAuthError,
    isError,
    response,
    authResponse,
    isSubdomain,
    subdomain,
    pathname,
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
    // console.log("response", response);
    console.log("pathname", pathname);
    console.log(globalStateSetterProps);

    // logout
    if (pathname == "/logout" && !isSubdomain) {
        return <Logout />;
    }

    // about
    if (pathname == "/about" && !isSubdomain) {
        return (
            <>
                <GlobalStateSetter {...globalStateSetterProps}>
                    <About />
                </GlobalStateSetter>
            </>
        );
    }

    // create username
    if (pathname == "/create-username" && !isSubdomain) {
        return (
            <>
                <GlobalStateSetter {...globalStateSetterProps}>
                    <CreateUsername />
                </GlobalStateSetter>
            </>
        );
    }

    // traversing directory
    return (
        <GlobalStateSetter {...globalStateSetterProps}>
            <Browser {...browserProps} />
        </GlobalStateSetter>
    );
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
    const pathname = context.resolvedUrl;

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
            pathname,
        },
    };
}
