export function setToLocalStorage(key: string, value: string) {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem(key, value);
    }
}
