import { create } from "zustand";
import {devtools, persist} from "zustand/middleware"

interface RegisterState {
    isRegisterOpen: boolean,
    setIsRegisterOpen: (by: boolean) => void
}

export const useRegister = create<RegisterState>()(
    devtools(
        persist(
            (set) => ({
                isRegisterOpen: false,
                setIsRegisterOpen: (by) => set((state) => ({isRegisterOpen: by})),
            }),
            {
                name: 'register-storage',
            }
        )
    )
)