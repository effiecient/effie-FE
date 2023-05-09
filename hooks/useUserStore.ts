import { create } from "zustand";

const useUserStore = create((set) => ({
    isLoggedIn: false,
    username: "",
    isSubdomain: false,
    subdomain: "",
    photoURL: "",
    theme: "effie",
    pathname: "",
    setUsername: (username: string) => set(() => ({ username })),
    setIsLoggedIn: (by: boolean) => set(() => ({ isLoggedIn: by })),
    setIsSubdomain: (by: boolean) => set(() => ({ isSubdomain: by })),
    setSubdomain: (subdomain: string) => set(() => ({ subdomain })),
    setPhotoURL: (photoURL: string) => set(() => ({ photoURL })),
    setTheme: (theme: string) => set(() => ({ theme })),
    setPathname: (pathname: string) => set(() => ({ pathname })),
}));

export default useUserStore;
