import type { ReviewCheckStatus } from "@/shared/interfaces"
import { create } from "zustand"
import type { QuestionIdToRequestInfo, ReviewCheckOrderInfo } from "../types"

type ReviewCheckStoreState = {
    status: ReviewCheckStatus | null
    setStatus: (status: ReviewCheckStatus | null) => void

    isMultiSelecting: boolean
    setIsMultiSelecting: (isMultiSelecting: boolean) => void

    recentOrderInfoArray: ReviewCheckOrderInfo[]
    insertRecentOrderInfo: (reviewOrderInfo: ReviewCheckOrderInfo) => void
    resetRecentOrderInfoArray: () => void

    changedIdToRequestInfo: QuestionIdToRequestInfo
    setChangedIdToRequestInfo: (changedIdToRequestInfo: QuestionIdToRequestInfo) => void

    changedIdToRequestInfoByMultiSelect: QuestionIdToRequestInfo
    setChangedIdToRequestInfoByMultiSelect: (changedIdToRequestInfoByMultiSelect: QuestionIdToRequestInfo) => void
    applyChangedReviewChecksFromMultiSelect: () => void
}
const useReviewCheckStore = create<ReviewCheckStoreState>()((set, get) => ({
    status: "CORRECT",
    setStatus: (status) => {
        const state = get()
        if (state.isMultiSelecting) {
            // NOTE: 다중 선택 중 status 바꾸면 일단 적용함
            state.applyChangedReviewChecksFromMultiSelect()
        }
        set({ status })
    },

    isMultiSelecting: true,
    setIsMultiSelecting: (isMultiSelecting) => {
        if (!isMultiSelecting) {
            get().applyChangedReviewChecksFromMultiSelect()
            set({ changedIdToRequestInfoByMultiSelect: {} })
        }
        set({ isMultiSelecting })
    },

    recentOrderInfoArray: [],
    insertRecentOrderInfo: (reviewCheckInfo) => {
        const lastReviewCheck = get().recentOrderInfoArray.pop()
        if (!lastReviewCheck) {
            set({ recentOrderInfoArray: [reviewCheckInfo] })
            return
        }

        set({ recentOrderInfoArray: [lastReviewCheck, reviewCheckInfo] })
    },
    resetRecentOrderInfoArray: () => set({ recentOrderInfoArray: [] }),

    changedIdToRequestInfo: {},
    setChangedIdToRequestInfo: (changedReviewChecks) => set({ changedIdToRequestInfo: changedReviewChecks }),

    applyChangedReviewChecksFromMultiSelect: () => {
        const state = get()
        const changedReviewChecksByMultiSelect = state.changedIdToRequestInfoByMultiSelect
        const changedReviewChecks = { ...state.changedIdToRequestInfo }
        const entryArray = Object.entries(changedReviewChecksByMultiSelect)
        entryArray.forEach(([key, value]) => {
            changedReviewChecks[key] = value
        })
        set({ changedIdToRequestInfo: changedReviewChecks, recentOrderInfoArray: [] })
    },

    changedIdToRequestInfoByMultiSelect: {},
    setChangedIdToRequestInfoByMultiSelect: (changedReviewChecksByMultiSelect) =>
        set({ changedIdToRequestInfoByMultiSelect: changedReviewChecksByMultiSelect }),
}))

export default useReviewCheckStore
