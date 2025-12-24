import { create } from "zustand"
import type { BookWriteStoreState } from "./_bookWriteStoreState"
import { BW_TOPIC_STEP_TAB_ARRAY } from "./_bookWriteConstants"

const useBookWriteStore = create<BookWriteStoreState>()((set) => ({
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
}))

export default useBookWriteStore
