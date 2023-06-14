import { create } from "zustand";

export const useBrowserStore = create((set) => ({
    username: "",
    setUsername: (username: string) => set(() => ({ username })),
}));

export default useBrowserStore;
