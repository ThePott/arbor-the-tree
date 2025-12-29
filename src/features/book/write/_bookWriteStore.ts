import { create } from "zustand"
import type { BookWriteStoreState } from "./_bookWriteStoreState"
import { BW_TOPIC_STEP_TAB_ARRAY } from "./_bookWriteConstants"
import type { BookDetail } from "./_bookWriteInterfaces"
import { splitByLineBreakThenTrim } from "@/shared/utils/stringManipulation"
import { findPreviousOverlayingValue, makeNewOverlayingRowArray } from "./_bookWriteStoreOperations"

const useBookWriteStore = create<BookWriteStoreState>()((set, get) => ({
    title: "",
    setTitle: (title) => set({ title }),

    selectedTab: BW_TOPIC_STEP_TAB_ARRAY[0],
    setSelectedTab: (selectedTab) => set({ selectedTab }),

    topicArray: [],
    stepArray: [],
    topicInfo: "",
    setTopicInfo: (topicInfo) => {
        const topicArray = splitByLineBreakThenTrim(topicInfo)
        set({ topicInfo, topicArray })

        const state = get()
        const firstValue = state.rowArray[0].topic
        state.updateOverlayingRowArray(0, "topic", firstValue)
    },
    stepInfo: "",
    setStepInfo: (stepInfo) => {
        const stepArray = splitByLineBreakThenTrim(stepInfo)
        set({ stepInfo, stepArray })

        const state = get()
        const firstValue = state.rowArray[0].step
        state.updateOverlayingRowArray(0, "step", firstValue)
    },

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
        if (!value) return

        const state = get()
        // NOTE: 바뀌지 않았을 때만 이 로직 실행하기 위해서는 이 함수를 이벤트 핸들러가 아니라
        // NOTE: updateRowArray 안에서 실행해야 한다.
        // NOTE: 우선은 최적화 없이 진행하자

        const previousOverlayingValue = findPreviousOverlayingValue(rowIndex, columnKey, state)
        const overlayingRowArray = makeNewOverlayingRowArray(previousOverlayingValue, rowIndex, columnKey, value, state)

        set({ overlayingRowArray })
    },
}))

export default useBookWriteStore
