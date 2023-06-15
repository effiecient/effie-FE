import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--poppins",
});
import "@/styles/globals.css";
import "@/styles/text.css";
import "@/styles/loading.css";
import "@/styles/theme.css";
import { useBrowserStore, useUserStore } from "@/hooks";
import { ReactElement, Suspense, useEffect, useState } from "react";
import { getEffieAuthTokenFromCookie, getKeyFromCookie } from "@/helper";
import { LoadingAnimation } from "@/ui";
import { GlobalStateSetter } from "@/middlewares";

export default function App({ Component, pageProps }: AppProps) {
    // const setTheme = useUserStore((state: any) => state.setTheme);
    const theme = useUserStore((state: any) => state.theme);

    console.log("page prop", pageProps);
    console.log("theme", theme);
    return (
        <SetGlobalStateFromCookie>
            <div
                className={`${poppins.variable} theme-${
                    theme === "" ? pageProps.theme : theme
                } text-black bg-white selection:bg-secondary-500 accent-tertiary-500 h-screen`}
            >
                <Component {...pageProps} />
            </div>
        </SetGlobalStateFromCookie>
    );
}

const SetGlobalStateFromCookie = ({ children }: any) => {
    const setTheme = useUserStore((state: any) => state.setTheme);
    const setView = useUserStore((state: any) => state.setView);
    const setSortOption = useUserStore((state: any) => state.setSortOption);
    const setIsSortAsc = useUserStore((state: any) => state.setIsSortAsc);

    useEffect(() => {
        const theme = getKeyFromCookie("theme");
        if (theme !== "") {
            setTheme(theme);
        }
        const view = getKeyFromCookie("view");
        if (view !== "") {
            setView(view);
        }
        const sortOption = getKeyFromCookie("sortOption");
        if (sortOption !== "") {
            setSortOption(sortOption);
        }
        const isSortAsc = getKeyFromCookie("isSortAsc");
        if (isSortAsc !== "") {
            setIsSortAsc(JSON.parse(isSortAsc));
        }
    }, []);

    return children;
};
