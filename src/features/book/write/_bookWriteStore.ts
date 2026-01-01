import { create } from "zustand"
import type { BookWriteStoreState } from "./_bookWriteStoreState"
import { BW_DEFAULT_ROW_COUNT, BW_TOPIC_STEP_TAB_ARRAY } from "./_bookWriteConstants"
import type { BookWriteRow, BookWriteRowFlat } from "./_bookWriteInterfaces"
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
                const firstValue = state.flatRowArray[0].topic
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
                const firstValue = state.flatRowArray[0].step
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
            flatRowArray: Array(BW_DEFAULT_ROW_COUNT)
                .fill(null)
                .map(() => ({}) as BookWriteRowFlat),
            updateFlatRowArray: (rowIndex, columnKey, value) => {
                const state = get()
                const overlayingRowArray = updateOverlayingRowArray({ rowIndex, columnKey, value, state })

                const tableData = [...get().flatRowArray]
                const targetRow = tableData[rowIndex]
                targetRow[columnKey] = value

                set({ flatRowArray: tableData })
                if (!overlayingRowArray) return
                set({ overlayingRowArray })
            },

            overlayingRowArray: Array(BW_DEFAULT_ROW_COUNT)
                .fill(null)
                .map(() => ({}) as BookWriteRowFlat),
            // NOTE: DO NOT CALL THIS FUNCION OUTSIDE OF STORE

            rowArray: Array(BW_DEFAULT_ROW_COUNT)
                .fill(null)
                .map(() => ({}) as BookWriteRow),
            updateRowArray: (rowIndex, columnKey, value) => {
                const state = get()
                const overlayingRowArray = updateOverlayingRowArray({ rowIndex, columnKey, value, state })

                const tableData = [...get().flatRowArray]
                const targetRow = tableData[rowIndex]
                targetRow[columnKey] = value

                set({ flatRowArray: tableData })
                if (!overlayingRowArray) return
                set({ overlayingRowArray })
            },
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
