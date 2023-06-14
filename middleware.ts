// server side middleware
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BE_BASE_URL, BE_STATUS_ERROR } from "./config";
import { EFFIE_AUTH_TOKEN } from "./constants";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/_next")) {
        console.log("out: _next");
        return NextResponse.next();
    }

    const refererPath = request.headers.get("referer");
    const host: any = request.headers.get("host");
    if (!host) {
        console.log("out: no host");
        // console.log(request);
        return NextResponse.next();
    }

    // find host inside path, and get the pathname which is the one after hosts
    const pathname = refererPath?.split(host)[1] ?? request.nextUrl.pathname;
    // if (request.nextUrl.pathname !== pathname) {
    //     return NextResponse.next();
    // }

    console.log("pathname", pathname);
    if (pathname === "/") {
        console.log("out: pathname === /");
        return NextResponse.next();
    }

    const authToken = request.cookies.get(EFFIE_AUTH_TOKEN)?.value;

    const subdomain = host.split(".")[0];

    if (!subdomain || subdomain === "www") {
        console.log("out: invalid subdomain");
        return NextResponse.next();
    }

    // TODO: handle public and private link, for now let's make everylink public
    // if (!authToken) {
    //     console.log("out: no auth token");
    //     return NextResponse.next();
    // }

    let linkOrFolderData;
    try {
        const url = `${BE_BASE_URL}/directory/${subdomain}${pathname}`;
        linkOrFolderData = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `${authToken}`,
            },
        }).then((res) => res.json());
    } catch (e) {
        console.error("error fetching server side", e);

        return NextResponse.next();
    }

    // console.log("linkOrFolderData", linkOrFolderData);

    // handling response
    if (linkOrFolderData.status == BE_STATUS_ERROR) {
        console.log("out: BE_STATUS_ERROR");

        return NextResponse.next();
    }

    // // check if isLink
    if (linkOrFolderData.data.type == "folder") {
        // pass data to page
        return NextResponse.next();
    }

    // console.log("linkOrFolderData.data.link", linkOrFolderData.data.link);
    return NextResponse.redirect(linkOrFolderData.data.link);
    // return NextResponse.redirect("https://www.bing.com");
}

// Path: /pages/[path].tsx
export const config = {
    matcher: "/:path*",
};
