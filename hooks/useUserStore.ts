import { getKeyFromCookie } from "@/helper";
import { create } from "zustand";

const useUserStore = create((set) => ({
    username: "",
    isLoggedIn: false,
    photoURL: "",
    isSubdomain: false,
    subdomain: "",
    theme: "",

    setUsername: (username: string) => set(() => ({ username })),
    setTheme: (theme: string) => set(() => ({ theme })),
    setIsLoggedIn: (by: boolean) => set(() => ({ isLoggedIn: by })),
    setPhotoURL: (photoURL: string) => set(() => ({ photoURL })),
    setIsSubdomain: (by: boolean) => set(() => ({ isSubdomain: by })),
    setSubdomain: (subdomain: string) => set(() => ({ subdomain })),
}));

export default useUserStore;
