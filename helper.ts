import { EFFIE_AUTH_TOKEN } from "@/constants";
import { FE_DOMAIN, FE_TOP_LEVEL_DOMAIN } from "./config";

export function getEffieAuthTokenFromCookie() {
    let effieAuthToken = "";
    if (typeof window !== "undefined") {
        const cookie = document.cookie;
        const cookieArr = cookie.split(";");
        const token = cookieArr.find((item) => item.includes(EFFIE_AUTH_TOKEN));
        if (token) {
            effieAuthToken = token.split("=")[1];
        }
    }
    return effieAuthToken;
}

export function getKeyFromCookie(key: string) {
    let theme = "";
    if (typeof window !== "undefined") {
        const cookie = document.cookie;
        const cookieArr = cookie.split(";");
        const token = cookieArr.find((item) => item.includes(key));
        if (token) {
            theme = token.split("=")[1];
        }
    }
    return theme;
}

export function saveToCookie(key: string, value: string) {
    // set to cookie to be used accross subdomains. expire in 1 year
    document.cookie = `${key}=${value}; path=/; domain=${FE_DOMAIN}.${FE_TOP_LEVEL_DOMAIN};expires=${new Date(
        new Date().getTime() + 365 * 24 * 60 * 60 * 1000
    ).toUTCString()};`;
}
