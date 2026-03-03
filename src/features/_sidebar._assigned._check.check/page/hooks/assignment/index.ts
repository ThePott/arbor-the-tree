import type { ReviewCheckAssignmentResponseData } from "@/features/_sidebar._assigned._check.check/loader"
import useReviewCheckStore from "@/features/_sidebar._assigned._check.check/store"
import type { IdToChangedInfo } from "@/features/_sidebar._assigned._check.check/types"
import { checkIsMultiSelected } from "@/features/_sidebar._assigned._check.check/utils/check-is-muti-selected"
import { findAssignmentQuestion } from "@/features/_sidebar._assigned._check.check/utils/find-question"
import {
    revertReviewCheckAssignmentQueryDataAfterMultiSelect,
    updateReviewCheckAssignmentQueryData,
} from "@/features/_sidebar._assigned._check.check/utils/optimistically-update-for-assignment"
import { ClientError } from "@/shared/error/clientError"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import { useQueryClient } from "@tanstack/react-query"
import { getRouteApi } from "@tanstack/react-router"
import { useEffect } from "react"

const route = getRouteApi("/_sidebar")

export const useReviewCheckMutateForAssignment = () => {
    const searchParams = route.useSearch()
    const { classroom_id, student_id } = searchParams
    const { mutate } = useSimpleMutation({
        method: "post",
        url: "/review/check/assignment",
        queryKey: ["reviewCheckAssignment", classroom_id, student_id],
        params: searchParams,
        update: ({ previous }) => previous,
        additionalOnSetteled: (client) =>
            client.invalidateQueries({ queryKey: ["progressSession", classroom_id, student_id] }),
    })
    return { mutate }
}

type ReviewCheckMutateForAssignment = ReturnType<typeof useReviewCheckMutateForAssignment>["mutate"]
export const filterReallyChangedForAssignment = (queryData: ReviewCheckAssignmentResponseData): IdToChangedInfo => {
    const changedIdToRequestInfo = useReviewCheckStore.getState().idToChangedInfo
    const entryArray = Object.entries(changedIdToRequestInfo)
    const filteredEntryArray = entryArray.filter((entry) => {
        try {
            const assginmentQuestion = findAssignmentQuestion({ queryData, changedEntry: entry })
            return entry[1].status !== assginmentQuestion.attempt_status // NOTE: 원본으로
        } catch {
            return true
        }
    })
    const isFiltered = entryArray.length !== filteredEntryArray.length
    return isFiltered ? Object.fromEntries(filteredEntryArray) : changedIdToRequestInfo
}

export const useDetectIdToChanedInfoThenMutateForAssignment = (mutate: ReviewCheckMutateForAssignment) => {
    const idToChangedInfo = useReviewCheckStore((state) => state.idToChangedInfo)
    const setChangedIdToRequestInfo = useReviewCheckStore((state) => state.setIdToChangedInfo)
    const changedIdToRequestInfoByMultiSelect = useReviewCheckStore((state) => state.idToChangedInfoByMultiSelect)
    const queryClient = useQueryClient()
    const { classroom_id, student_id, is_assignment } = route.useSearch()

    useEffect(() => {
        if (!is_assignment) return
        if (Object.entries(idToChangedInfo).length === 0) return
        if (Object.values(changedIdToRequestInfoByMultiSelect).length > 0) return

        const timeout = setTimeout(async () => {
            const queryData = queryClient.getQueryData([
                "reviewCheckAssignment",
                classroom_id,
                student_id,
            ]) as ReviewCheckAssignmentResponseData
            const reallyChanged = filterReallyChangedForAssignment(queryData)
            setChangedIdToRequestInfo(reallyChanged)
            const body = {
                student_id,
                idToChangedInfo,
            }
            mutate({ body, additionalData: idToChangedInfo })
        }, 500)
        return () => clearTimeout(timeout)
    }, [idToChangedInfo, changedIdToRequestInfoByMultiSelect])
}

// NOTE: recent array (다중 선택)에 있는 것을 changed에 저장해두는 역할
// NOTE: 이건 assignment 한정.
export const useConvertRecentToChangedForAssignment = (data: ReviewCheckAssignmentResponseData | undefined) => {
    const setChangedReviewChecksByMultiSelect = useReviewCheckStore((state) => state.setIdToChangedInfoByMultiSelect)
    const status = useReviewCheckStore((state) => state.status)
    const recentIndexInfoArray = useReviewCheckStore((state) => state.recentIndexInfoArray)
    const searchParams = route.useSearch()

    useEffect(() => {
        if (!searchParams.is_assignment) return
        if (recentIndexInfoArray.length === 0) return

        const newIdToChangedInfo: IdToChangedInfo = {}
        if (recentIndexInfoArray.length === 1) {
            const recentIndexInfo = recentIndexInfoArray[0]
            const { attempt_status, attempt_id } = findAssignmentQuestion({
                queryData: data,
                orderInfo: recentIndexInfo,
            })
            if (attempt_status === status) return // NOTE: 원본 사용
            if (!attempt_id) throw ClientError.Unexpected("오답 체크 중 오류가 발생했어요")

            newIdToChangedInfo[attempt_id] = {
                status,
                forWhat: "assignment",
                indexInfo: recentIndexInfo,
            }
            updateReviewCheckAssignmentQueryData({
                idToChangedInfo: newIdToChangedInfo,
                searchParams,
                storeCallback: () => setChangedReviewChecksByMultiSelect(newIdToChangedInfo),
            })
            return
        }

        data?.forEach((assignment, titleIndex) => {
            assignment.books.forEach((book, subtitleIndex) => {
                book.questions.forEach((questionWithAttemptInfo, checkboxIndex) => {
                    const isMultiSelected = checkIsMultiSelected({
                        titleIndex,
                        subtitleIndex,
                        checkboxIndex,
                    })
                    if (!isMultiSelected) return

                    const attempt_id = questionWithAttemptInfo.attempt_id
                    if (!attempt_id) throw ClientError.Unexpected("오답 체크 중 오류가 발생했어요")
                    newIdToChangedInfo[attempt_id] = {
                        forWhat: "assignment",
                        status,
                        indexInfo: {
                            titleIndex,
                            subtitleIndex,
                            checkboxIndex,
                        },
                    }
                })
            })
        })

        revertReviewCheckAssignmentQueryDataAfterMultiSelect({
            newChangedIdToRequestInfoByMultiSelect: newIdToChangedInfo,
            searchParams,
        })
        updateReviewCheckAssignmentQueryData({
            idToChangedInfo: newIdToChangedInfo,
            searchParams,
            storeCallback: () => setChangedReviewChecksByMultiSelect(newIdToChangedInfo),
        })
    }, [recentIndexInfoArray])
}
