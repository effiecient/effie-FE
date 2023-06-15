import { create } from "zustand";

// settings that only affect the browser
export const useBrowserStore = create((set) => ({
    pathname: "",
    view: "grid",
    sortOption: "name",
    isSortAsc: true,
    isNewLinkModalOpen: false,
    isNewFolderModalOpen: false,
    isRightSideBarPropertiesOpen: false,

    setPathname: (pathname: string) => set(() => ({ pathname })),
    setView: (view: string) => set(() => ({ view })),
    setSortOption: (sortOption: string) => set(() => ({ sortOption })),
    setIsSortAsc: (by: boolean) => set(() => ({ isSortAsc: by })),
    setIsNewLinkModalOpen: (by: boolean) =>
        set(() => ({ isNewLinkModalOpen: by })),
    setIsNewFolderModalOpen: (by: boolean) =>
        set(() => ({ isNewFolderModalOpen: by })),
    setIsRightSideBarPropertiesOpen: (by: boolean) =>
        set(() => ({ isRightSideBarPropertiesOpen: by })),
}));

export default useBrowserStore;