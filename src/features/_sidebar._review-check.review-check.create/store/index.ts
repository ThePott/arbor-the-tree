import type { ReviewCheckStatus } from "@/shared/interfaces"
import { create } from "zustand"

export type ReviewCheckInfo = {
    topic_order: number
    step_order: number
    question_order: number
}
type QuestionIdToInfo = Record<
    string, // NOTE: question_id
    {
        status: ReviewCheckStatus | null // NOTE: use to delete if null
        review_check_id: string | null // NOTE: use to patch if exists
        assigned_session_student_id: string | null
    }
>
type ReviewCheckCreateStoreState = {
    status: ReviewCheckStatus | null
    setStatus: (status: ReviewCheckStatus | null) => void

    isMultiSelecting: boolean
    setIsMultiSelecting: (isMultiSelecting: boolean) => void

    recentReviewCheckInfoArray: ReviewCheckInfo[]
    insertRecentReviewCheckInfo: (reviewCheckInfo: ReviewCheckInfo) => void
    resetRecentReviewCheckInfoArray: () => void

    // NOTE: question_id: review_check_status
    changedReviewChecks: QuestionIdToInfo
    setChangedReviewChecks: (changedReviewChecks: QuestionIdToInfo) => void
    // NOTE: this function is only called internally
    _applyChangedReviewChecksFromMultiSelect: () => void

    // TODO: 이전에 선택해둔 게 multi select 한다고 없어져서는 안 된다
    // TODO: multi select -> single select: staged change -> real change로 이관
    changedReviewChecksByMultiSelect: QuestionIdToInfo
    setChangedReviewChecksByMultiSelect: (changedReviewChecksByMultiSelect: QuestionIdToInfo) => void
}
const useReviewCheckCreateStore = create<ReviewCheckCreateStoreState>()((set, get) => ({
    status: null,
    setStatus: (status) => set({ status }),

    isMultiSelecting: true,
    setIsMultiSelecting: (isMultiSelecting) => {
        if (!isMultiSelecting) {
            get()._applyChangedReviewChecksFromMultiSelect()
        }
        set({ isMultiSelecting })
    },

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
    _applyChangedReviewChecksFromMultiSelect: () => {
        const state = get()
        const changedReviewChecksByMultiSelect = state.changedReviewChecksByMultiSelect
        const changedReviewChecks = { ...state.changedReviewChecks }
        const entryArray = Object.entries(changedReviewChecksByMultiSelect)
        entryArray.forEach(([key, value]) => {
            changedReviewChecks[key] = value
        })
        set({ changedReviewChecks, changedReviewChecksByMultiSelect: {}, recentReviewCheckInfoArray: [] })
    },

    changedReviewChecksByMultiSelect: {},
    setChangedReviewChecksByMultiSelect: (changedReviewChecksByMultiSelect) =>
        set({ changedReviewChecksByMultiSelect }),
}))

export default useReviewCheckCreateStore
