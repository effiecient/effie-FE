import { create } from "zustand";

const useRenderingStore = create((set) => ({
    showSkeleton: false,
    setShowSkeleton: (by: boolean) => set(() => ({ showSkeleton: by })),
}));

export default useRenderingStore;
