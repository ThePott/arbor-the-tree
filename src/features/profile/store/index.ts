import type { ApiError } from "@/shared/interfaces"
import type { AxiosError } from "axios"
import { create } from "zustand"

type ProfileStoreState = {
    modalKey: "success" | "fail" | null
    setModalKey: (modalKey: "success" | "fail" | null) => void

    mutationError: AxiosError<ApiError> | null
    setMutationError: (mutationError: AxiosError<ApiError> | null) => void
}

const useProfileStore = create<ProfileStoreState>()((set) => ({
    modalKey: null,
    setModalKey: (modalKey) => set({ modalKey }),

    mutationError: null,
    setMutationError: (mutationError) => set({ mutationError }),
}))

export default useProfileStore
