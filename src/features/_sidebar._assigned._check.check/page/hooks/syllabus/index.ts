import type { ReviewCheckResponseData } from "@/features/_sidebar._assigned._check.check/loader"
import useReviewCheckStore from "@/features/_sidebar._assigned._check.check/store"
import type { IdToChangedInfo } from "@/features/_sidebar._assigned._check.check/types"
import { checkIsMultiSelected } from "@/features/_sidebar._assigned._check.check/utils/check-is-muti-selected"
import { findJoinedQuestion } from "@/features/_sidebar._assigned._check.check/utils/find-question"
import {
    makeUpdatedReviewCheckQueryData,
    revertReviewCheckQueryDataAfterMultiSelect,
    updateReviewCheckQueryData,
} from "@/features/_sidebar._assigned._check.check/utils/optimistically-update-for-syllabus"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import { useQueryClient } from "@tanstack/react-query"
import { getRouteApi } from "@tanstack/react-router"
import { useEffect } from "react"

const route = getRouteApi("/_sidebar")

export const useReviewCheckMutateForSyllabus = () => {
    const searchParams = route.useSearch()
    const { classroom_id, student_id, syllabus_id } = searchParams
    const { mutate } = useSimpleMutation({
        method: "post",
        url: "/review/check",
        queryKey: ["reviewCheck", classroom_id, student_id, syllabus_id],
        params: searchParams,
        update: makeUpdatedReviewCheckQueryData,
        additionalOnSetteled: (client) =>
            client.invalidateQueries({ queryKey: ["progressSession", classroom_id, student_id] }),
    })
    return { mutate }
}

type ReviewCheckMutateForSyllabus = ReturnType<typeof useReviewCheckMutateForSyllabus>["mutate"]
export const filterReallyChangedForSyllabus = (queryData: ReviewCheckResponseData): IdToChangedInfo => {
    const changedIdToRequestInfo = useReviewCheckStore.getState().idToChangedInfo
    const entryArray = Object.entries(changedIdToRequestInfo)
    const filteredEntryArray = entryArray.filter((entry) => {
        try {
            const joinedQuestion = findJoinedQuestion({ queryData, changedEntry: entry })
            return entry[1].status !== joinedQuestion.review_check_status
        } catch {
            return true
        }
    })
    const isFiltered = entryArray.length !== filteredEntryArray.length
    return isFiltered ? Object.fromEntries(filteredEntryArray) : changedIdToRequestInfo
}

export const useDetectIdToChanedInfoThenMutateForSyllabus = (mutate: ReviewCheckMutateForSyllabus) => {
    const changedIdToRequestInfo = useReviewCheckStore((state) => state.idToChangedInfo)
    const setChangedIdToRequestInfo = useReviewCheckStore((state) => state.setIdToChangedInfo)
    const changedIdToRequestInfoByMultiSelect = useReviewCheckStore((state) => state.idToChangedInfoByMultiSelect)
    const queryClient = useQueryClient()
    const { classroom_id, student_id, syllabus_id, is_assignment } = route.useSearch()

    useEffect(() => {
        if (is_assignment) return
        if (Object.entries(changedIdToRequestInfo).length === 0) return
        if (Object.values(changedIdToRequestInfoByMultiSelect).length > 0) return

        const timeout = setTimeout(async () => {
            const queryData = queryClient.getQueryData([
                "reviewCheck",
                classroom_id,
                student_id,
                syllabus_id,
            ]) as ReviewCheckResponseData
            const reallyChanged = filterReallyChangedForSyllabus(queryData)
            setChangedIdToRequestInfo(reallyChanged)
            const body = {
                student_id,
                syllabus_id,
                changedReviewChecks: changedIdToRequestInfo,
            }
            mutate({ body, additionalData: changedIdToRequestInfo })
        }, 500)
        return () => clearTimeout(timeout)
    }, [changedIdToRequestInfo, changedIdToRequestInfoByMultiSelect])
}

// NOTE: recent array (다중 선택)에 있는 것을 changed에 저장해두는 역할
// NOTE: 이건 syllabus 한정.
export const useConvertRecentToChangedForSyllabus = (data: ReviewCheckResponseData | undefined) => {
    const setChangedReviewChecksByMultiSelect = useReviewCheckStore((state) => state.setIdToChangedInfoByMultiSelect)
    const status = useReviewCheckStore((state) => state.status)
    const recentIndexInfoArray = useReviewCheckStore((state) => state.recentIndexInfoArray)
    const searchParams = route.useSearch()

    useEffect(() => {
        if (searchParams.is_assignment) return
        if (recentIndexInfoArray.length === 0) return

        const newIdToChangedInfo: IdToChangedInfo = {}
        if (recentIndexInfoArray.length === 1) {
            const recentIndexInfo = recentIndexInfoArray[0]
            const targetQuestion = findJoinedQuestion({ queryData: data, orderInfo: recentIndexInfo })
            if (targetQuestion.review_check_status === status) return

            newIdToChangedInfo[targetQuestion.id] = {
                status,
                forWhat: "syllabus",
                indexInfo: recentIndexInfo,
                session_id: targetQuestion.session_id,
            }
            updateReviewCheckQueryData({
                idToChangedInfo: newIdToChangedInfo,
                searchParams,
                storeCallback: () => setChangedReviewChecksByMultiSelect(newIdToChangedInfo),
            })
            return
        }

        data?.topics.forEach((topic, titleIndex) =>
            topic.steps.forEach((step, subtitleIndex) =>
                step.questions.forEach((question, checkboxIndex) => {
                    const isMultiSelected = checkIsMultiSelected({
                        titleIndex,
                        subtitleIndex,
                        checkboxIndex,
                    })
                    if (!isMultiSelected) return

                    newIdToChangedInfo[question.id] = {
                        forWhat: "syllabus",
                        status,
                        session_id: question.session_id,
                        indexInfo: {
                            titleIndex,
                            subtitleIndex,
                            checkboxIndex,
                        },
                    }
                })
            )
        )

        revertReviewCheckQueryDataAfterMultiSelect({
            newChangedIdToRequestInfoByMultiSelect: newIdToChangedInfo,
            searchParams,
        })
        updateReviewCheckQueryData({
            idToChangedInfo: newIdToChangedInfo,
            searchParams,
            storeCallback: () => setChangedReviewChecksByMultiSelect(newIdToChangedInfo),
        })
    }, [recentIndexInfoArray])
}
