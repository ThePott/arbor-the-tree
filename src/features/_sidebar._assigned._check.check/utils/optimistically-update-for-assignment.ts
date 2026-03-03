import queryClient from "@/packages/api/queryClient"
import type { SidebarSearchParams } from "@/routes/_sidebar"
import { produce } from "immer"
import type { ReviewCheckAssignmentResponseData } from "../loader"
import useReviewCheckStore from "../store"
import type { IdToChangedInfo } from "../types"
import { findAssignmentQuestion } from "./find-question"

// NOTE: useSimpleMutation update에서도 사용되어야 하므로 export 되어야 함
type MakeUpdatedReviewCheckAssignmentQueryData = {
    previous: ReviewCheckAssignmentResponseData
    additionalData: IdToChangedInfo
}
export const makeUpdatedReviewCheckAssignmentQueryData = ({
    previous,
    additionalData,
}: MakeUpdatedReviewCheckAssignmentQueryData): ReviewCheckAssignmentResponseData => {
    const newData = produce(previous, (draft) => {
        const entryArray = Object.entries(additionalData)
        entryArray.forEach((entry) => {
            const targetQuestion = findAssignmentQuestion({ queryData: draft, changedEntry: entry })
            const [_, { status }] = entry
            targetQuestion.attempt_status_visual = status
        })
    })
    return newData
}

type UpdateReviewCheckAssignmentQueryData = {
    idToChangedInfo: IdToChangedInfo
    searchParams: SidebarSearchParams
    storeCallback: () => void
}
export const updateReviewCheckAssignmentQueryData = ({
    idToChangedInfo,
    searchParams: { classroom_id, student_id },
    storeCallback,
}: UpdateReviewCheckAssignmentQueryData): void => {
    const queryKey = ["reviewCheckAssignment", classroom_id, student_id]
    const previous = queryClient.getQueryData(queryKey) as ReviewCheckAssignmentResponseData
    const newData = makeUpdatedReviewCheckAssignmentQueryData({ previous, additionalData: idToChangedInfo })
    queryClient.setQueryData(queryKey, newData)

    storeCallback()
}

type MakeRevertedIdToChangedInfoProps = {
    queryData: ReviewCheckAssignmentResponseData
    newChangedIdToRequestInfoByMultiSelect: IdToChangedInfo
}
const makeRevertedReviewChangedreviewChecks = ({
    queryData,
    newChangedIdToRequestInfoByMultiSelect,
}: MakeRevertedIdToChangedInfoProps): IdToChangedInfo => {
    // NOTE: old 중 new와 겹치는 부분은 revert에서 제외
    const oldChangedIdToRequestInfoByMultiSelect = {
        ...useReviewCheckStore.getState().idToChangedInfoByMultiSelect,
    }
    Object.entries(newChangedIdToRequestInfoByMultiSelect).forEach(([question_id, _]) => {
        delete oldChangedIdToRequestInfoByMultiSelect[question_id]
    })

    const oldEntryArray = Object.entries(oldChangedIdToRequestInfoByMultiSelect)
    oldEntryArray.forEach((entry) => {
        const targetQuestion = findAssignmentQuestion({ queryData, changedEntry: entry })
        entry[1].status = targetQuestion.attempt_status // NOTE: 원래 status 사용해야 함
    })

    const revertedChangedByMultiSelect = Object.fromEntries(oldEntryArray)

    return revertedChangedByMultiSelect
}

type RevertReviewCheckAssignmentQueryDataAfterMultiSelectProps = {
    newChangedIdToRequestInfoByMultiSelect: IdToChangedInfo
    searchParams: SidebarSearchParams
}
export const revertReviewCheckAssignmentQueryDataAfterMultiSelect = ({
    newChangedIdToRequestInfoByMultiSelect,
    searchParams: { classroom_id, student_id },
}: RevertReviewCheckAssignmentQueryDataAfterMultiSelectProps) => {
    const queryKey = ["reviewCheckAssignment", classroom_id, student_id]
    const queryData = queryClient.getQueryData(queryKey) as ReviewCheckAssignmentResponseData
    const revertedIdToRequestInfo = makeRevertedReviewChangedreviewChecks({
        queryData,
        newChangedIdToRequestInfoByMultiSelect,
    })
    const newData = makeUpdatedReviewCheckAssignmentQueryData({
        previous: queryData,
        additionalData: revertedIdToRequestInfo,
    })
    queryClient.setQueryData(queryKey, newData)
}
