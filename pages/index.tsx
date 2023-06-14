import { Snackbar } from "@/components";
import { Browser, Landing } from "@/features";
import QuickCreate from "@/features/quick-create";
import { useUserStore } from "@/hooks";

import { NextResponse } from "next/server";
import { BE_BASE_URL, BE_STATUS_ERROR } from "@/config";
import { EFFIE_AUTH_TOKEN } from "@/constants";
import CheckUser from "@/middlewares/checkUser";

export default function Index({
    isLoggedIn,
    isAuthError,
    isError,
    response,
    authResponse,
    isSubdomain,
    subdomain,
}: any) {
    const checkUserProps = {
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
            <CheckUser {...checkUserProps}>
                <div className="flex h-full w-full flex-col">
                    <Browser {...browserProps} />
                    <Snackbar className="z-50" />
                </div>
            </CheckUser>
        );
    } else {
        if (isLoggedIn) {
            return (
                <CheckUser {...checkUserProps}>
                    <QuickCreate />
                    <Snackbar className="z-50" />
                </CheckUser>
            );
        } else {
            return (
                <>
                    <Landing />
                    <Snackbar className="z-50" />
                </>
            );
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

    // get authtoken
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
        },
    };
}
