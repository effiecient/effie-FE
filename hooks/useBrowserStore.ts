import { create } from "zustand";

// settings that only affect the browser
export const useBrowserStore = create((set) => ({
    pathname: "/", // convention: always start with /
    view: "grid",
    sortOption: "name",
    isSortAsc: true,
    isNewLinkModalOpen: false,
    isNewFolderModalOpen: false,
    isRightSideBarPropertiesOpen: false,
    focusedItemData: undefined,
    doRefetch: false,
    currentDirectoryData: undefined,
    isConfirmationModalOpen: false,
    isClickedFromBreadcrumb: false,
    isMoveModalOpen: false,
    itemPathToMove: undefined,
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
    setFocusedItemData: (data: any) => set(() => ({ focusedItemData: data })),
    setDoRefetch: (by: boolean) => set(() => ({ doRefetch: by })),
    setCurrentDirectoryData: (data: any) =>
        set(() => ({ currentDirectoryData: data })),
    setIsConfirmationModalOpen: (by: boolean) =>
        set(() => ({ isConfirmationModalOpen: by })),
    setIsClickedFromBreadcrumb: (by: boolean) =>
        set(() => ({ isClickedFromBreadcrumb: by })),
    setIsMoveModalOpen: (by: boolean) => set(() => ({ isMoveModalOpen: by })),
    setItemPathToMove: (path: string) => set(() => ({ itemPathToMove: path })),
}));

export default useBrowserStore;
