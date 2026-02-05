import type { ReviewCheckStatus } from "@/shared/interfaces"
import { create } from "zustand"

type ReviewCheckCreateStoreState = {
    status: ReviewCheckStatus | null
    setStatus: (status: ReviewCheckStatus | null) => void

    isMultiSelecting: boolean
    setIsMultiSelecting: (isMultiSelecting: boolean) => void
}
const useReviewCheckCreateStore = create<ReviewCheckCreateStoreState>()((set, _get) => ({
    status: null,
    setStatus: (status) => set({ status }),

    isMultiSelecting: true,
    setIsMultiSelecting: (isMultiSelecting) => set({ isMultiSelecting }),
}))

export default useReviewCheckCreateStore
