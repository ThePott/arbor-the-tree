import { create } from "zustand"
import type { BookWriteStoreState } from "./_bookWriteStoreState"
import { BW_DEFAULT_ROW_COUNT, BW_TOPIC_STEP_TAB_ARRAY } from "./_bookWriteConstants"
import type { BookWriteRow } from "./_bookWriteInterfaces"
import { splitByLineBreakThenTrim } from "@/shared/utils/stringManipulation"
import { updateOverlayingColumn } from "./_bookWriteStoreOperations"
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
                const firstValue = state.rowArray[0].topic.value
                state.updateRowArray(0, "topic", firstValue)
            },
            stepInfo: "",
            setStepInfo: (stepInfo) => {
                const stepArray = splitByLineBreakThenTrim(stepInfo)
                set({ stepInfo, stepArray })

                const state = get()
                const firstValue = state.rowArray[0].topic.value
                state.updateRowArray(0, "step", firstValue)
            },

            subBookTitle: null,
            setSubBookTitle: (subBookTitle) => set({ subBookTitle }),

            // NOTE: `fill({})`를 하면 같은 reference address를 같는 하나의 {}로 채우게 됨
            rowArray: Array(BW_DEFAULT_ROW_COUNT)
                .fill(null)
                .map(
                    () =>
                        ({
                            topic: {},
                            step: {},
                            question_name: {},
                            question_page: {},
                            solution_page: {},
                            session: {},
                            sub_question_name: {},
                        }) as BookWriteRow
                ),
            updateRowArray: (rowIndex, columnKey, value) => {
                const rowArray = [...get().rowArray]
                if (!value && !rowArray[rowIndex][columnKey].value) return

                rowArray[rowIndex][columnKey].value = value

                updateOverlayingColumn({ columnKey, rowArray })

                set({ rowArray })
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
                stepArray: state.stepArray,
                // rowArray: state.rowArray,
                // overlayingRowArray: state.overlayingRowArray,
            }),
        }
    )
)

export default useBookWriteStore
