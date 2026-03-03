import type { AttemptStatus } from "@/shared/interfaces"
import { create } from "zustand"
import type { IdToChangedInfo, IndexInfo } from "../types"

type ReviewCheckStoreState = {
    status: AttemptStatus | null
    setStatus: (status: AttemptStatus | null) => void

    isMultiSelecting: boolean
    setIsMultiSelecting: (isMultiSelecting: boolean) => void

    recentIndexInfoArray: IndexInfo[]
    insertRecentIndexInfo: (indexInfo: IndexInfo) => void
    resetRecentIndexInfoArray: () => void

    idToChangedInfo: IdToChangedInfo
    setIdToChangedInfo: (idToRequestInfo: IdToChangedInfo) => void

    idToChangedInfoByMultiSelect: IdToChangedInfo
    setIdToChangedInfoByMultiSelect: (idToChangedInfoByMultiSelect: IdToChangedInfo) => void
    applyIdToChangedInfoByMultiSelect: () => void
}
const useReviewCheckStore = create<ReviewCheckStoreState>()((set, get) => ({
    status: "CORRECT",
    setStatus: (status) => {
        const state = get()
        if (state.isMultiSelecting) {
            // NOTE: 다중 선택 중 status 바꾸면 일단 적용함
            state.applyIdToChangedInfoByMultiSelect()
        }
        set({ status })
    },

    isMultiSelecting: true,
    setIsMultiSelecting: (isMultiSelecting) => {
        if (!isMultiSelecting) {
            get().applyIdToChangedInfoByMultiSelect()
            set({ idToChangedInfoByMultiSelect: {} })
        }
        set({ isMultiSelecting })
    },

    recentIndexInfoArray: [],
    insertRecentIndexInfo: (reviewCheckInfo) => {
        const lastReviewCheck = get().recentIndexInfoArray.pop()
        if (!lastReviewCheck) {
            set({ recentIndexInfoArray: [reviewCheckInfo] })
            return
        }

        set({ recentIndexInfoArray: [lastReviewCheck, reviewCheckInfo] })
    },
    resetRecentIndexInfoArray: () => set({ recentIndexInfoArray: [] }),

    idToChangedInfo: {},
    setIdToChangedInfo: (changedReviewChecks) => set({ idToChangedInfo: changedReviewChecks }),

    applyIdToChangedInfoByMultiSelect: () => {
        const state = get()
        const changedReviewChecksByMultiSelect = state.idToChangedInfoByMultiSelect
        const changedReviewChecks = { ...state.idToChangedInfo }
        const entryArray = Object.entries(changedReviewChecksByMultiSelect)
        entryArray.forEach(([key, value]) => {
            changedReviewChecks[key] = value
        })
        set({ idToChangedInfo: changedReviewChecks, recentIndexInfoArray: [] })
    },

    idToChangedInfoByMultiSelect: {},
    setIdToChangedInfoByMultiSelect: (changedReviewChecksByMultiSelect) =>
        set({ idToChangedInfoByMultiSelect: changedReviewChecksByMultiSelect }),
}))

export default useReviewCheckStore
