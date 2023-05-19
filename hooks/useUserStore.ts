import { create } from "zustand";

const useUserStore = create((set) => ({
    isLoggedIn: false,
    username: "",
    isSubdomain: false,
    subdomain: "",
    photoURL: "",
    pathname: "",
    theme: "effie",
    view: "grid",
    sortOption: "name",
    isSortAsc: true,
    setUsername: (username: string) => set(() => ({ username })),
    setIsLoggedIn: (by: boolean) => set(() => ({ isLoggedIn: by })),
    setIsSubdomain: (by: boolean) => set(() => ({ isSubdomain: by })),
    setSubdomain: (subdomain: string) => set(() => ({ subdomain })),
    setPhotoURL: (photoURL: string) => set(() => ({ photoURL })),
    setPathname: (pathname: string) => set(() => ({ pathname })),
    setTheme: (theme: string) => set(() => ({ theme })),
    setView: (view: string) => set(() => ({ view })),
    setSortOption: (sortOption: string) => set(() => ({ sortOption })),
    setIsSortAsc: (by: boolean) => set(() => ({ isSortAsc: by })),
}));

export default useUserStore;
