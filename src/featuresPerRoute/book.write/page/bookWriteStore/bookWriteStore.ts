import { debugStore } from "@/shared/config/debug/"
import { splitByLineBreakThenTrim } from "@/shared/utils/stringManipulation"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { BW_DEFAULT_ROW_COUNT, BW_TOPIC_STEP_TAB_ARRAY } from "../_bookWriteConstants"
import type { BookWriteRow } from "../_bookWriteInterfaces"
import type { BookWriteStoreState } from "./_bookWriteStoreState"
import { calculateDash } from "./bookWriteStoreOperations/calculateDash"
import { updateOverlayingColumn } from "./bookWriteStoreOperations/handleMutateOtherColumn/updateOverlayings"
import { handleQuestionMutation } from "./bookWriteStoreOperations/handleMutateQuestion"

const useBookWriteStore = create<BookWriteStoreState>()(
    persist(
        (set, get) => ({
            title: "",
            setTitle: (title) => {
                debugStore("BookWriteStore:setTitle %o", title)
                set({ title })
            },
            publishedYear: undefined,
            setPublishedYear: (publishedYear) => {
                debugStore("BookWriteStore:setPublishedYear %o", publishedYear)
                set({ publishedYear: publishedYear })
            },

            selectedTab: BW_TOPIC_STEP_TAB_ARRAY[0],
            setSelectedTab: (selectedTab) => {
                debugStore("BookWriteStore:setSelectedTab %o", selectedTab)
                set({ selectedTab })
            },

            topicArray: [],
            stepArray: [],
            topicInfo: "",
            setTopicInfo: (topicInfo) => {
                debugStore("BookWriteStore:setTopicInfo %o", topicInfo)
                const topicArray = splitByLineBreakThenTrim(topicInfo)
                set({ topicInfo, topicArray })

                const state = get()
                const firstValue = state.rowArray[0].topic.value
                state.updateRowArray(0, "topic", firstValue)
            },
            stepInfo: "",
            setStepInfo: (stepInfo) => {
                debugStore("BookWriteStore:setStepInfo %o", stepInfo)
                const stepArray = splitByLineBreakThenTrim(stepInfo)
                set({ stepInfo, stepArray })

                const state = get()
                const firstValue = state.rowArray[0].topic.value
                state.updateRowArray(0, "step", firstValue)
            },

            subBookTitle: null,
            setSubBookTitle: (subBookTitle) => {
                debugStore("BookWriteStore:setSubBookTitle %o", subBookTitle)
                set({ subBookTitle })
            },

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
                debugStore("BookWriteStore:updateRowArray row:%d col:%s val:%o", rowIndex, columnKey, value)
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

                if (columnKey === "question_name") {
                    handleQuestionMutation({ rowArray, rowIndex, value })
                } else {
                    updateOverlayingColumn({ rowArray, columnKey })
                }

                set({ rowArray })
            },

            register: null,
            setRegister: (register) => {
                debugStore("BookWriteStore:setRegister %o", register)
                set({ register })
            },
            errors: null,
            setErrors: (errors) => {
                debugStore("BookWriteStore:setErrors %o", errors)
                set({ errors })
            },

            isPending: false,
            setIsPending: (isPending) => {
                debugStore("BookWriteStore:setIsPending %o", isPending)
                set({ isPending })
            },

            mutationError: null,
            setMutationError: (mutationError) => {
                debugStore("BookWriteStore:setMutationError %o", mutationError)
                set({ mutationError })
            },

            modalKey: null,
            setModalKey: (modalKey) => {
                debugStore("BookWriteStore:setModalKey %o", modalKey)
                set({ modalKey })
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
