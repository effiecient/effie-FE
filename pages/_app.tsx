import { BE_BASE_URL, BE_STATUS_ERROR } from "@/config";
import { EFFIE_AUTH_TOKEN } from "@/constants";

import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--poppins",
});
import "@/styles/globals.css";
import "@/styles/text.css";
import CheckUser from "@/middlewares/checkUser";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <CheckUser>
            <div
                className={`${poppins.variable} selection:bg-secondary-500 accent-tertiary-500`}
            >
                <Component {...pageProps} />
            </div>
        </CheckUser>
    );
}

// server side
// handle redirect server side.
export async function getInitialProps({ req, res }: { req: any; res: any }) {
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
