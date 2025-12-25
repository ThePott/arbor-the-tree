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
    tableData: Array(50)
        .fill(null)
        .map(() => ({}) as BookDetail),
    updateTableData: (rowIndex, columnId, value) => {
        const tableData = [...get().tableData]
        const targetRow = tableData[rowIndex]
        targetRow[columnId] = value

        set({ tableData })
    },
}))

export default useBookWriteStore
