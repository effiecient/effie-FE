import { create } from "zustand";

const useRenderingStore = create((set) => ({
    showSnackbar: false,
    setShowSnackbar: (by: boolean) => set(() => ({ showSnackbar: by })),
    snackbarTitle: "",
    setSnackbarTitle: (by: string) => set(() => ({ snackbarTitle: by })),
    snackbarMessage: "",
    setSnackbarMessage: (by: string) => set(() => ({ snackbarMessage: by })),
    snackbarType: "success", // type: "success" | "error" | "warning" | "info";
    setSnackbarType: (by: string) => set(() => ({ snackbarType: by })),
}));

export default useRenderingStore;
