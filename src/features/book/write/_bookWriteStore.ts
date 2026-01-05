import { create } from "zustand"
import type { BookWriteStoreState } from "./_bookWriteStoreState"
import { BW_DEFAULT_ROW_COUNT, BW_TOPIC_STEP_TAB_ARRAY } from "./_bookWriteConstants"
import { BOOK_DETAIL_KEY_ARRAY, type BookWriteRow } from "./_bookWriteInterfaces"
import { splitByLineBreakThenTrim } from "@/shared/utils/stringManipulation"
import { recalculateColumn } from "./_bookWriteStoreOperations"
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
                const row = rowArray[rowIndex]
                const cell = row[columnKey]
                if (!value && !row[columnKey].value) return

                cell.value = value
                cell.isError = false

                // NOTE: 문제를 지웠는데...
                if (!value && columnKey === "question_name") {
                    const lastQuestionIndex = rowArray.reduce((acc, row, index) => {
                        if (row.question_name.value) return index
                        return acc
                    }, 0)

                    // NOTE: 문제를 지웠는데 중간을 지운 거라면 오류
                    if (rowIndex < lastQuestionIndex) {
                        cell.isError = true
                    } else {
                        const { question_name: _question_name, ...rest } = row
                        const isClearingOverlay = Object.entries(rest).every(([_key, column]) => !column.value)
                        if (isClearingOverlay) {
                            // NOTE: 문제를 지웠는데 같은 행 다른 열에 값이 없으면 모든 오버레이 초기화
                            Object.entries(row).forEach(([_key, column]) => {
                                column.overlaying = ""
                            })
                        } else {
                            // NOTE: 다른 값이 있으면 오류 띄우기
                            cell.isError = true
                        }
                    }
                }

                // NOTE: 문제 말고 다른 걸 입력했는데 문제가 없으면 -> 오류
                if (value && !row.question_name.value) {
                    row.question_name.isError = true
                }

                recalculateColumn({ rowArray, columnKey })
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
