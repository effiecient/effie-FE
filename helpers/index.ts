import { EFFIE_AUTH_TOKEN } from "@/constants";

export function setToLocalStorage(key: string, value: string) {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem(key, value);
    }
}

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
