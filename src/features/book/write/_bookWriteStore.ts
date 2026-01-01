import { create } from "zustand"
import type { BookWriteStoreState } from "./_bookWriteStoreState"
import { BW_DEFAULT_ROW_COUNT, BW_TOPIC_STEP_TAB_ARRAY } from "./_bookWriteConstants"
import type { BookDetail } from "./_bookWriteInterfaces"
import { splitByLineBreakThenTrim } from "@/shared/utils/stringManipulation"
import { updateOverlayingRowArray } from "./_bookWriteStoreOperations"
import { createJSONStorage, persist } from "zustand/middleware"

const useBookWriteStore = create<BookWriteStoreState>()(
    persist(
        (set, get) => ({
            title: "",
            setTitle: (title) => set({ title }),
            publishedYear: undefined,
            setPublishedYear: (publishedYear) => set({ publishedYear: publishedYear }),

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
                const overlayingRowArray = updateOverlayingRowArray({
                    rowIndex: 0,
                    columnKey: "topic",
                    value: firstValue,
                    state,
                })

                if (!overlayingRowArray) return
                set({ overlayingRowArray })
            },
            stepInfo: "",
            setStepInfo: (stepInfo) => {
                const stepArray = splitByLineBreakThenTrim(stepInfo)
                set({ stepInfo, stepArray })

                const state = get()
                const firstValue = state.rowArray[0].step
                const overlayingRowArray = updateOverlayingRowArray({
                    rowIndex: 0,
                    columnKey: "step",
                    value: firstValue,
                    state,
                })

                if (!overlayingRowArray) return
                set({ overlayingRowArray })
            },

            subBookTitle: null,
            setSubBookTitle: (subBookTitle) => set({ subBookTitle }),

            // NOTE: `fill({})`를 하면 같은 reference address를 같는 하나의 {}로 채우게 됨
            rowArray: Array(BW_DEFAULT_ROW_COUNT)
                .fill(null)
                .map(() => ({}) as BookDetail),
            updateRowArray: (rowIndex, columnKey, value) => {
                const state = get()
                const overlayingRowArray = updateOverlayingRowArray({ rowIndex, columnKey, value, state })

                const tableData = [...get().rowArray]
                const targetRow = tableData[rowIndex]
                targetRow[columnKey] = value

                set({ rowArray: tableData })
                if (!overlayingRowArray) return
                set({ overlayingRowArray })
            },

            overlayingRowArray: Array(BW_DEFAULT_ROW_COUNT)
                .fill(null)
                .map(() => ({}) as BookDetail),
            // NOTE: DO NOT CALL THIS FUNCION OUTSIDE OF STORE
        }),
        {
            name: "book-write-store",
            storage: createJSONStorage(() => localStorage),
            // NOTE: THIS IS FOR EARLY DEVELOPMENT
            // NOTE: THIS MUST BE DELETED
            // TODO: THIS MUST BE DELETED
            partialize: (state) => ({
                title: state.title,
                topicInfo: state.topicInfo,
                topicArray: state.topicArray,
                stepInfo: state.stepInfo,
                setArray: state.stepArray,
                // rowArray: state.rowArray,
                // overlayingRowArray: state.overlayingRowArray,
            }),
        }
    )
)

export default useBookWriteStore
