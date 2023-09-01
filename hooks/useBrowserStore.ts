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
    focusedPathname: undefined, //convention: always start with /
    doRefetch: false,
    currentDirectoryData: undefined,
    isDeleteConfirmationModalOpen: false,
    isMoveModalOpen: false,
    isInEditMode: false,
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
    setFocusedPathname: (pathname: string) =>
        set(() => ({ focusedPathname: pathname })),
    setDoRefetch: (by: boolean) => set(() => ({ doRefetch: by })),
    setCurrentDirectoryData: (data: any) =>
        set(() => ({ currentDirectoryData: data })),
    setIsDeleteConfirmationModalOpen: (by: boolean) =>
        set(() => ({ isDeleteConfirmationModalOpen: by })),
    setIsMoveModalOpen: (by: boolean) => set(() => ({ isMoveModalOpen: by })),
    setIsInEditMode: (by: boolean) => set(() => ({ isInEditMode: by })),
}));

export default useBrowserStore;
