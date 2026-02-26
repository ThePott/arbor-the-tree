import queryClient from "@/packages/api/queryClient"
import type { SidebarSearchParams } from "@/routes/_sidebar"
import { produce } from "immer"
import type { ReviewCheckResponseData } from "../loader"
import useReviewCheckStore from "../store"
import type { IdToChangedInfo } from "../types"
import { findJoinedQuestion } from "./find-question"

// NOTE: useSimpleMutation update에서도 사용되어야 하므로 export 되어야 함
type MakeUpdatedReviewCheckQueryData = {
    previous: ReviewCheckResponseData
    additionalData: IdToChangedInfo
}
export const makeUpdatedReviewCheckQueryData = ({
    previous,
    additionalData,
}: MakeUpdatedReviewCheckQueryData): ReviewCheckResponseData => {
    debugger
    const newData = produce(previous, (draft) => {
        const entryArray = Object.entries(additionalData)
        entryArray.forEach((entry) => {
            const targetQuestion = findJoinedQuestion({ queryData: draft, changedEntry: entry })
            const [_, { status }] = entry
            targetQuestion.review_check_status_visual = status
        })
    })
    return newData
}

type UpdateReviewCheckQueryData = {
    idToChangedInfo: IdToChangedInfo
    searchParams: SidebarSearchParams
    storeCallback: () => void
}
export const updateReviewCheckQueryData = ({
    idToChangedInfo,
    searchParams: { classroom_id, student_id, syllabus_id },
    storeCallback,
}: UpdateReviewCheckQueryData): void => {
    debugger
    const queryKey = ["reviewCheck", classroom_id, student_id, syllabus_id]
    const previous = queryClient.getQueryData(queryKey) as ReviewCheckResponseData
    const newData = makeUpdatedReviewCheckQueryData({ previous, additionalData: idToChangedInfo })
    queryClient.setQueryData(queryKey, newData)

    storeCallback()
}

type MakeRevertedReviewChangedreviewChecksProps = {
    queryData: ReviewCheckResponseData
    newChangedIdToRequestInfoByMultiSelect: IdToChangedInfo
}
const makeRevertedReviewChangedreviewChecks = ({
    queryData,
    newChangedIdToRequestInfoByMultiSelect,
}: MakeRevertedReviewChangedreviewChecksProps): IdToChangedInfo => {
    debugger
    // NOTE: old 중 new와 겹치는 부분은 revert에서 제외
    const oldChangedIdToRequestInfoByMultiSelect = {
        ...useReviewCheckStore.getState().idToChangedInfoByMultiSelect,
    }
    Object.entries(newChangedIdToRequestInfoByMultiSelect).forEach(([question_id, _]) => {
        delete oldChangedIdToRequestInfoByMultiSelect[question_id]
    })

    const oldEntryArray = Object.entries(oldChangedIdToRequestInfoByMultiSelect)
    oldEntryArray.forEach((entry) => {
        const targetQuestion = findJoinedQuestion({ queryData, changedEntry: entry })
        entry[1].status = targetQuestion.review_check_status
    })

    const revertedChangedByMultiSelect = Object.fromEntries(oldEntryArray)

    return revertedChangedByMultiSelect
}

type RevertReviewCheckQueryDataAfterMultiSelectProps = {
    newChangedIdToRequestInfoByMultiSelect: IdToChangedInfo
    searchParams: SidebarSearchParams
}
export const revertReviewCheckQueryDataAfterMultiSelect = ({
    newChangedIdToRequestInfoByMultiSelect,
    searchParams: { classroom_id, student_id, syllabus_id },
}: RevertReviewCheckQueryDataAfterMultiSelectProps) => {
    const queryKey = ["reviewCheck", classroom_id, student_id, syllabus_id]
    const queryData = queryClient.getQueryData(queryKey) as ReviewCheckResponseData
    const revertedIdToRequestInfo = makeRevertedReviewChangedreviewChecks({
        queryData,
        newChangedIdToRequestInfoByMultiSelect,
    })
    const newData = makeUpdatedReviewCheckQueryData({ previous: queryData, additionalData: revertedIdToRequestInfo })
    queryClient.setQueryData(queryKey, newData)
}
