import type { ApiError } from "@/shared/interfaces"
import type { AxiosError } from "axios"
import { create } from "zustand"

type TestLoginStoreState = {
    modalKey: "signupSuccess" | "error" | null
    setModalKey: (modalKey: "signupSuccess" | "error" | null) => void
    error: AxiosError<ApiError> | null
    setError: (error: AxiosError<ApiError> | null) => void
}

const useTestLoginStore = create<TestLoginStoreState>()((set, get) => ({
    modalKey: null,
    setModalKey: (modalKey) => set({ modalKey }),
    error: null,
    setError: (error) => {
        const setModalKey = get().setModalKey
        setModalKey("error")
        set({ error })
    },
}))

export default useTestLoginStore
