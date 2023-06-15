import { EFFIE_AUTH_TOKEN } from "@/constants";
import { FE_DOMAIN, FE_TOP_LEVEL_DOMAIN } from "./config";

export function getEffieAuthTokenFromCookie() {
    return getKeyFromCookie(EFFIE_AUTH_TOKEN);
}

export function getKeyFromCookie(key: string) {
    let value = "";
    if (typeof window !== "undefined") {
        const cookie = document.cookie;
        const cookieArr = cookie.split(";");
        const keyvalue = cookieArr.find((item) => item.includes(key));
        if (keyvalue) {
            value = keyvalue.split("=")[1];
        }
    }
    return value;
}

export function saveToCookie(key: string, value: string) {
    if (typeof window !== "undefined") {
        // set to cookie to be used accross subdomains. expire in 1 year
        document.cookie = `${key}=${value}; path=/; domain=${FE_DOMAIN}.${FE_TOP_LEVEL_DOMAIN};expires=${new Date(
            new Date().getTime() + 365 * 24 * 60 * 60 * 1000
        ).toUTCString()};`;
    }
}

export function removeFromCookie(key: string) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${FE_DOMAIN}.${FE_TOP_LEVEL_DOMAIN};`;
}
