import { create } from "zustand"
import type { BookWriteStoreState } from "./_bookWriteStoreState"
import { BW_TOPIC_STEP_TAB_ARRAY } from "./_bookWriteConstants"
import type { BookDetail } from "./_bookWriteInterfaces"
import { splitByLineBreakThenTrim } from "@/shared/utils/stringManipulation"
import { findPreviousOverlayingValue, makeNewOverlayingValue } from "./_bookWriteStoreOperations"

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
    },
    stepInfo: "",
    setStepInfo: (stepInfo) => {
        const stepArray = splitByLineBreakThenTrim(stepInfo)
        set({ stepInfo, stepArray })
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

        let previousOverlayingValue = findPreviousOverlayingValue(rowIndex, columnKey, state)

        const overlayingRowArray = state.overlayingRowArray.map((row, index) => {
            const isRightHere = index === rowIndex
            const isFollowingAbove = index > rowIndex && !state.rowArray[index][columnKey]

            if (isRightHere) {
                row[columnKey] = value === "/" ? makeNewOverlayingValue(previousOverlayingValue, columnKey, state) : ""
                previousOverlayingValue = row[columnKey]
            } else if (isFollowingAbove) {
                if (row[columnKey] === "/") {
                    previousOverlayingValue = findPreviousOverlayingValue(index, columnKey, state)
                    const newValue = makeNewOverlayingValue(previousOverlayingValue, columnKey, state)
                    row[columnKey] = newValue
                } else {
                    row[columnKey] = previousOverlayingValue ?? "---- wrong"
                }
            }

            return row
        })

        set({ overlayingRowArray })
    },
}))

export default useBookWriteStore
