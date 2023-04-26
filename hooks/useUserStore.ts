import { create } from "zustand";

const useUserStore = create((set) => ({
    isLoggedIn: false,
    username: "",
    isSubdomain: false,
    subdomain: "",
    hasPhotoURL: false,
    photoURL: "",
    theme: "effie",
    setUsername: (username: string) => set(() => ({ username })),
    setIsLoggedIn: (by: boolean) => set(() => ({ isLoggedIn: by })),
    setIsSubdomain: (by: boolean) => set(() => ({ isSubdomain: by })),
    setSubdomain: (subdomain: string) => set(() => ({ subdomain })),
    setHasPhotoURL: (by: boolean) => set(() => ({ hasPhotoURL: by })),
    setPhotoURL: (photoURL: string) => set(() => ({ photoURL })),
    setTheme: (theme: string) => set(() => ({ theme })),
}));

export default useUserStore;
