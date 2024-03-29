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
import { useEffect } from "react";
import { getKeyFromCookie } from "@/helper";

export default function App({ Component, pageProps }: AppProps) {
    const theme = useUserStore((state: any) => state.theme);

    return (
        <SetGlobalStateFromCookie>
            <div
                className={`${poppins.variable} theme-${
                    theme === "" ? pageProps.theme || "effie" : theme
                } text-black bg-white selection:bg-secondary-500 accent-tertiary-500 h-screen`}
            >
                <Component {...pageProps} />
            </div>
        </SetGlobalStateFromCookie>
    );
}

const SetGlobalStateFromCookie = ({ children }: any) => {
    const setTheme = useUserStore((state: any) => state.setTheme);

    const setView = useBrowserStore((state: any) => state.setView);
    const setSortOption = useBrowserStore((state: any) => state.setSortOption);
    const setIsSortAsc = useBrowserStore((state: any) => state.setIsSortAsc);

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
