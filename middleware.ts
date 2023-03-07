// server side middleware
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BE_BASE_URL, BE_STATUS_ERROR } from "./config";
import { EFFIE_AUTH_TOKEN } from "./constants";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const refererPath = request.headers.get("referer");
    const host: any = request.headers.get("host");
    if (!host) {
        console.log("out1");
        // console.log(request);
        return NextResponse.next();
    }
    // if (!refererPath) {
    //     console.log("out3");
    //     return NextResponse.next();
    // }

    // find host inside path, and get the pathname which is the one after hosts
    const path3 = refererPath?.split(host)[1] || request.nextUrl.pathname;
    // if (request.nextUrl.pathname !== path3) {
    //     return NextResponse.next();
    // }

    const authToken = request.cookies.get("authToken")?.value;

    const subdomain = host.split(".")[0];

    if (!authToken || !subdomain) {
        console.log("out2");
        return NextResponse.next();
    }

    let linkOrFolderData;
    try {
        const url = `${BE_BASE_URL}/directory/${subdomain}${path3}`;
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
        console.log("folder");

        return NextResponse.next();
    }

    // // check if isLink
    // if (linkOrFolderData.data.type == "folder") {
    //     return NextResponse.next();
    // }

    // console.log("linkOrFolderData.data.link", linkOrFolderData.data.link);
    return NextResponse.redirect(linkOrFolderData.data.link);
    // return NextResponse.redirect("https://www.bing.com");
}

// Path: /pages/[path].tsx
export const config = {
    matcher: "/:path*",
};
