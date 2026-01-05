import { create } from "zustand"
import type { BookWriteStoreState } from "./_bookWriteStoreState"
import { splitByLineBreakThenTrim } from "@/shared/utils/stringManipulation"
import { createJSONStorage, persist } from "zustand/middleware"
import { BW_TOPIC_STEP_TAB_ARRAY, BW_DEFAULT_ROW_COUNT } from "../_bookWriteConstants"
import type { BookWriteRow } from "../_bookWriteInterfaces"
import { updateOverlayingInRow } from "./bwsOperations/bwsOtherColumnsOperations"
import { recalculateColumn } from "./bwsOperations/bwsQuestionOperations"

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

                    if (rowIndex < lastQuestionIndex) {
                        // NOTE: 중간을 지운 거라면-> 에러
                        cell.isError = true
                    } else {
                        // NOTE: 끝을 지원 거라면...
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

                        // NOTE: 마지막 인덱스 이후의 모든 오류 초기화
                        for (let i = lastQuestionIndex + 1; i < rowArray.length; i++) {
                            rowArray[i].question_name.isError = false
                        }
                    }
                }

                // NOTE: 문제를 입력했는데...
                if (value && columnKey === "question_name") {
                    // NOTE: 내 위로 빈 것이 있으면 그것들은 오류 처리
                    // NOTE: 내 위로 빈 행 필터
                    // NOTE: 원래 index를 살려야 하기 때문에 slice가 아닌 reduce 사용
                    const filteredArray = rowArray.reduce((acc: BookWriteRow[], row, index) => {
                        if (index >= rowIndex) return acc
                        if (!row.question_name.value) return [...acc, row]
                        return acc
                    }, [])

                    filteredArray.forEach((row) => {
                        row.question_name.isError = true
                    })

                    // NOTE: 지금 행 재계산
                    updateOverlayingInRow({ startRowIndex: rowIndex, endRowIndex: rowIndex, rowArray })
                }

                // NOTE: 문제 말고 다른 걸 입력했는데 문제 이름이 없으면...
                if (value && !row.question_name.value) {
                    // NOTE: 문제 비었다고 오류
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
