import type { ReviewCheckStatus } from "@/shared/interfaces"
import { create } from "zustand"

type ReviewCheckInfo = {
    topic_order: number
    step_order: number
    question_order: number
}

type ReviewCheckCreateStoreState = {
    status: ReviewCheckStatus | null
    setStatus: (status: ReviewCheckStatus | null) => void

    isMultiSelecting: boolean
    setIsMultiSelecting: (isMultiSelecting: boolean) => void

    recentReviewCheckInfoArray: ReviewCheckInfo[]
    insertRecentReviewCheckInfo: (reviewCheckInfo: ReviewCheckInfo) => void
    resetRecentReviewCheckInfoArray: () => void
}
const useReviewCheckCreateStore = create<ReviewCheckCreateStoreState>()((set, get) => ({
    status: null,
    setStatus: (status) => set({ status }),

    isMultiSelecting: true,
    setIsMultiSelecting: (isMultiSelecting) => set({ isMultiSelecting }),

    recentReviewCheckInfoArray: [],
    insertRecentReviewCheckInfo: (reviewCheckInfo) => {
        const lastReviewCheck = get().recentReviewCheckInfoArray.pop()
        if (!lastReviewCheck) {
            set({ recentReviewCheckInfoArray: [reviewCheckInfo] })
            return
        }

        set({ recentReviewCheckInfoArray: [lastReviewCheck, reviewCheckInfo] })
    },
    resetRecentReviewCheckInfoArray: () => set({ recentReviewCheckInfoArray: [] }),
}))

export default useReviewCheckCreateStore
