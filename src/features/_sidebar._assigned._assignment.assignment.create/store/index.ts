import type { ApiError } from "@/shared/interfaces"
import type { AxiosError } from "axios"
import { create } from "zustand"

type AssignmentCreateStoreState = {
    modalKey: "success" | "error" | null
    setModalKey: (modalKey: "success" | "error" | null) => void

    mutationError: AxiosError<ApiError> | null
    setMutationError: (mutationError: AxiosError<ApiError> | null) => void
}

const useAssignmentCreateStore = create<AssignmentCreateStoreState>()((set) => ({
    modalKey: null,
    setModalKey: (modalKey) => set({ modalKey }),

    mutationError: null,
    setMutationError: (mutationError) => set({ mutationError }),
}))

export default useAssignmentCreateStore
