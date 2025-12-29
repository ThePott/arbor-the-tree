import { create } from "zustand"
import type { BookWriteStoreState } from "./_bookWriteStoreState"
import { BW_TOPIC_STEP_TAB_ARRAY } from "./_bookWriteConstants"
import type { BookDetail } from "./_bookWriteInterfaces"

const useBookWriteStore = create<BookWriteStoreState>()((set, get) => ({
    title: "",
    setTitle: (title) => set({ title }),

    selectedTab: BW_TOPIC_STEP_TAB_ARRAY[0],
    setSelectedTab: (selectedTab) => set({ selectedTab }),

    topicInfo: "",
    setTopicInfo: (topicInfo) => set({ topicInfo }),
    stepInfo: "",
    setStepInfo: (stepInfo) => set({ stepInfo }),

    subBookTitle: null,
    setSubBookTitle: (subBookTitle) => set({ subBookTitle }),

    // NOTE: `fill({})`를 하면 같은 reference address를 같는 하나의 {}로 채우게 됨
    rowArray: Array(50)
        .fill(null)
        .map(() => ({}) as BookDetail),
    updateRowArray: (rowIndex, columnKey, value) => {
        const tableData = [...get().rowArray]
        const targetRow = tableData[rowIndex]
        targetRow[columnKey] = value

        set({ rowArray: tableData })
    },

    overlayingRowArray: Array(50)
        .fill(null)
        .map(() => ({}) as BookDetail),
    updateOverlayingRowArray: (rowIndex, columnKey, value) => {
        const state = get()

        if (value === "/") {
            return
        }

        const overlayingRowArray = state.overlayingRowArray.map((row, index) => {
            const isRightHere = index === rowIndex
            const isFollowingAbove = index > rowIndex && !state.rowArray[index][columnKey]

            if (isRightHere) {
                row[columnKey] = ""
            } else if (isFollowingAbove) {
                row[columnKey] = value
            }

            return row
        })

        set({ overlayingRowArray })
    },
}))

export default useBookWriteStore
