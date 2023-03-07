// server side middleware
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BE_BASE_URL, BE_STATUS_ERROR } from "./config";
import { EFFIE_AUTH_TOKEN } from "./constants";
import { cookies } from "next/headers";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // let authToken = request.cookies.get("authToken")?.value;
    // // console.log(authToken);
    // const host = request.headers.get("host");
    // // console.log("host", host);
    // const path = request.nextUrl.pathname;

    const path2 = request.headers.get("referer");
    const hosts2: any = request.headers.get("host");
    if (!path2 || !hosts2) {
        return NextResponse.next();
    }

    // find host inside path, and get the pathname which is the one after hosts
    const path3 = path2?.split(hosts2)[1];
    if (request.nextUrl.pathname !== path3) {
        return NextResponse.next();
    }
    console.log("request", request);
    // const subdomain = hosts2.split(".")[0];

    // let linkOrFolderData;
    // try {
    //     const url = `${BE_BASE_URL}/directory/${subdomain}${path3}`;
    //     console.log("url", url);
    //     linkOrFolderData = await fetch(url, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json",
    //             Authorization: `${authToken}`,
    //         },
    //     }).then((res) => res.json());
    // } catch (e) {
    //     console.error("error fetching server side", e);
    //     return { props: {} };
    // }

    // console.log("linkOrFolderData", linkOrFolderData);

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
// export const config = {
//     matcher: "/about/:path*",
// };

// server side
// handle redirect server side.
export async function adf({ req, res }: { req: any; res: any }) {
    const { cookie } = req.headers;
    console.log("cookie", cookie);
    // check if authToken exist

    if (!cookie) {
        return { props: {} };
    }
    let authToken = "";
    cookie.split(";").forEach((cookie: any) => {
        const [key, value] = cookie.split("=");
        if (key === EFFIE_AUTH_TOKEN) {
            // set user to logged in
            authToken = value;
        }
    });

    if (authToken === "") {
        return { props: {} };
    }

    // check if authToken is valid
    let data: any = null;
    try {
        data = await fetch(`${BE_BASE_URL}/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `${authToken}`,
            },
        }).then((res) => res.json());
    } catch (e) {
        console.error("error fetching server side", e);
        return { props: {} };
    }

    if (data === null) {
        return { props: {} };
    }

    console.log("data", data);
    // parse path and fetch data from path
    const path = req.url;
    console.log("path", path);

    let location: any = path.split("/").slice(1);
    console.log("location", location);
    // if slugs is not an array, turn it into an array
    if (!Array.isArray(location)) {
        location = [location];
    }

    // get the subdomain
    const subdomain = req.headers.host.split(".")[0];
    console.log("subdomain", subdomain);
    // fit backend to get data based on path
    let linkOrFolderData: any = null;
    try {
        const url = `${BE_BASE_URL}/directory/${subdomain}/${location.join(
            "/"
        )}`;
        console.log("url", url);
        linkOrFolderData = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }).then((res) => res.json());
    } catch (e) {
        console.error("error fetching server side", e);
        return { props: {} };
    }

    console.log("linkOrFolderData", linkOrFolderData);

    if ((linkOrFolderData.status = BE_STATUS_ERROR)) {
        return { props: {} };
    }

    // check if isLink
    if (linkOrFolderData.data.type == "folder") {
        return { props: {} };
    }
    return { props: {} };

    // return {
    //     redirect: {
    //         destination: linkOrFolderData.data.link,
    //         permanent: true, //i don't
    //     },
    // };
}
