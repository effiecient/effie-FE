import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--poppins",
});
import "@/styles/globals.css";
import "@/styles/text.css";
import Navbar from "@/components/navbar";
import CheckUser from "@/middlewares/checkUser";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <CheckUser>
            <div
                className={`${poppins.variable} selection:bg-secondary-500 accent-tertiary-500`}
            >
                <Navbar isOnLanding />
                {/* add top margin, for navbar */}
                <div className="pt-[75px]">
                    <Component {...pageProps} />
                </div>
            </div>
        </CheckUser>
    );
}
