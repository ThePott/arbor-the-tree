import type { ReviewCheckStatus } from "@/shared/interfaces"
import { create } from "zustand"

export type ReviewCheckInfo = {
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

    // NOTE: question_id: review_check_status
    changedReviewChecks: Record<string, ReviewCheckStatus | null>
    setChangedReviewChecks: (changedReviewChecks: Record<number, ReviewCheckStatus | null>) => void
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

    changedReviewChecks: {},
    setChangedReviewChecks: (changedReviewChecks) => set({ changedReviewChecks }),
}))

export default useReviewCheckCreateStore
