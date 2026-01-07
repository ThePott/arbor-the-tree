import { create } from "zustand"
import type { BookWriteStoreState } from "./_bookWriteStoreState"
import { splitByLineBreakThenTrim } from "@/shared/utils/stringManipulation"
import { createJSONStorage, persist } from "zustand/middleware"
import { BW_TOPIC_STEP_TAB_ARRAY, BW_DEFAULT_ROW_COUNT } from "../_bookWriteConstants"
import type { BookWriteRow } from "../_bookWriteInterfaces"
import { handleQuestionMutation } from "./bookWriteStoreOperations/handleMutateQuestion"
import { updateOverlayingColumn } from "./bookWriteStoreOperations/handleMutateOtherColumn/updateOverlayings"
import { calculateDash } from "./bookWriteStoreOperations/calculateDash"

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
                        }) as BookWriteRow
                ),
            updateRowArray: (rowIndex, columnKey, value) => {
                const rowArray = [...get().rowArray]
                const row = rowArray[rowIndex]
                const cell = row[columnKey]

                // NOTE: 빈 셀 클릭했으면 아무것도 안 함
                if (!value && !row[columnKey].value) return

                cell.value = value
                cell.isError = false

                if (value.match(/-$/)) {
                    calculateDash({ rowIndex, rowArray, columnKey, value })
                    set({ rowArray })
                    return
                }

                // NOTE: 문제를 지웠는데...
                if (columnKey === "question_name") {
                    handleQuestionMutation({ rowArray, rowIndex, value })
                } else {
                    updateOverlayingColumn({ rowArray, columnKey })
                }

                set({ rowArray })
            },
        }),
        {
            name: "book-write-store",
            storage: createJSONStorage(() => localStorage),
            // NOTE: THIS IS FOR EARLY DEVELOPMENT
            // NOTE: THIS MUST BE DELETED
            // TODO: THIS MUST BE DELETED
            partialize: () => ({
                // title: state.title,
                // topicInfo: state.topicInfo,
                // topicArray: state.topicArray,
                // stepInfo: state.stepInfo,
                // stepArray: state.stepArray,
                // rowArray: state.rowArray,
                // overlayingRowArray: state.overlayingRowArray,
            }),
        }
    )
)

export default useBookWriteStore
