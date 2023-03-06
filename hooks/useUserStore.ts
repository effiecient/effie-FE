import { create } from "zustand";

const useUserStore = create((set) => ({
    isLoggedIn: false,
    username: "",
    isSubdomain: false,
    subdomain: "",
    setUsername: (username: string) => set(() => ({ username })),
    setIsLoggedIn: (by: boolean) => set(() => ({ isLoggedIn: by })),
    setIsSubdomain: (by: boolean) => set(() => ({ isSubdomain: by })),
    setSubdomain: (subdomain: string) => set(() => ({ subdomain })),
}));

export default useUserStore;
