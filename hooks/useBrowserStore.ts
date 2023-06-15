import { create } from "zustand";

// settings that only affect the browser
export const useBrowserStore = create((set) => ({
    pathname: "",
    view: "grid",
    sortOption: "name",
    isSortAsc: true,

    setPathname: (pathname: string) => set(() => ({ pathname })),
    setView: (view: string) => set(() => ({ view })),
    setSortOption: (sortOption: string) => set(() => ({ sortOption })),
    setIsSortAsc: (by: boolean) => set(() => ({ isSortAsc: by })),
}));

export default useBrowserStore;
