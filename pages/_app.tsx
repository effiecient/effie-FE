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
import { useUserStore } from "@/hooks";
import { useEffect } from "react";
import { getKeyFromCookie } from "@/helper";

export default function App({ Component, pageProps }: AppProps) {
    const setTheme = useUserStore((state: any) => state.setTheme);
    const theme = useUserStore((state: any) => state.theme);
    const setPathname = useUserStore((state: any) => state.setPathname);

    useEffect(() => {
        setPathname(window.location.pathname.replace(/^\//, ""));
        const themeCookie = getKeyFromCookie("theme");
        if (themeCookie !== "") {
            setTheme(themeCookie);
        }
    }, []);

    return (
        <>
            <div
                className={`${poppins.variable} theme-${theme} text-black bg-white selection:bg-secondary-500 accent-tertiary-500 h-screen`}
            >
                <Component {...pageProps} />
            </div>
        </>
    );
}
