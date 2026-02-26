import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getRouteApi, useLoaderData } from "@tanstack/react-router"
import { useEffect } from "react"
import {
    makeReviewCheckAssignmentQueryOptions,
    makeReviewCheckQueryOptions,
    type ReviewCheckAssignmentResponseData,
    type ReviewCheckResponseData,
} from "../../loader"
import useReviewCheckStore from "../../store"
import type { IdToChangedInfo } from "../../types"
import { checkIsMultiSelected } from "../../utils/check-is-muti-selected"
import { findAssignmentQuestion, findJoinedQuestion } from "../../utils/find-question"
import {
    makeUpdatedReviewCheckQueryData,
    revertReviewCheckQueryDataAfterMultiSelect,
    updateReviewCheckQueryData,
} from "../../utils/optimistically-update-for-syllabus"

const route = getRouteApi("/_sidebar")

const useReviewCheckQuery = () => {
    const searchParams = route.useSearch()
    const { classroom_id, student_id, syllabus_id, is_assignment } = searchParams
    const { extendedBook: extendedBookLoaderData, assignmentWithBooksArray: assignmentWithBooksArrayLoaderData } =
        useLoaderData({
            from: "/_sidebar/_assigned/_check/check/",
        })

    const { data: extendedBookQueryData } = useQuery({
        ...makeReviewCheckQueryOptions({ classroom_id, student_id, syllabus_id }),
        enabled: Boolean(student_id && !is_assignment),
    })
    const { data: assignmentWithBooksArrayQueryData } = useQuery({
        ...makeReviewCheckAssignmentQueryOptions({ classroom_id, student_id }),
        enabled: Boolean(student_id && is_assignment),
    })
    const extendedBook = extendedBookQueryData ?? extendedBookLoaderData
    const assignmentWithBooksArray = assignmentWithBooksArrayQueryData ?? assignmentWithBooksArrayLoaderData
    return { extendedBook, assignmentWithBooksArray }
}

const useReviewCheckMutateForSyllabus = () => {
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
const filterReallyChangedForSyllabus = (queryData: ReviewCheckResponseData): IdToChangedInfo => {
    debugger
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
const useDetectIdToChanedInfoThenMutateForSyllabus = (mutate: ReviewCheckMutateForSyllabus) => {
    const changedIdToRequestInfo = useReviewCheckStore((state) => state.idToChangedInfo)
    const setChangedIdToRequestInfo = useReviewCheckStore((state) => state.setIdToChangedInfo)
    const changedIdToRequestInfoByMultiSelect = useReviewCheckStore((state) => state.idToChangedInfoByMultiSelect)
    const queryClient = useQueryClient()
    const { classroom_id, student_id, syllabus_id, is_assignment } = route.useSearch()

    useEffect(() => {
        if (is_assignment) return
        debugger
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

const useReviewCheckMutateForAssignment = () => {
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
const filterReallyChangedForAssignment = (queryData: ReviewCheckAssignmentResponseData): IdToChangedInfo => {
    const changedIdToRequestInfo = useReviewCheckStore.getState().idToChangedInfo
    const entryArray = Object.entries(changedIdToRequestInfo)
    const filteredEntryArray = entryArray.filter((entry) => {
        try {
            const joinedQuestion = findAssignmentQuestion({ queryData, changedEntry: entry })
            return entry[1].status !== joinedQuestion.review_check_status
        } catch {
            return true
        }
    })
    const isFiltered = entryArray.length !== filteredEntryArray.length
    return isFiltered ? Object.fromEntries(filteredEntryArray) : changedIdToRequestInfo
}
const useDetectIdToChanedInfoThenMutateForAssignment = (mutate: ReviewCheckMutateForAssignment) => {
    const changedIdToRequestInfo = useReviewCheckStore((state) => state.idToChangedInfo)
    const setChangedIdToRequestInfo = useReviewCheckStore((state) => state.setIdToChangedInfo)
    const changedIdToRequestInfoByMultiSelect = useReviewCheckStore((state) => state.idToChangedInfoByMultiSelect)
    const queryClient = useQueryClient()
    const { classroom_id, student_id, syllabus_id, is_assignment } = route.useSearch()

    useEffect(() => {
        if (!is_assignment) return
        if (Object.entries(changedIdToRequestInfo).length === 0) return
        if (Object.values(changedIdToRequestInfoByMultiSelect).length > 0) return

        const timeout = setTimeout(async () => {
            debugger
            const queryData = queryClient.getQueryData([
                "reviewCheckAssignment",
                classroom_id,
                student_id,
                syllabus_id,
            ]) as ReviewCheckAssignmentResponseData
            const reallyChanged = filterReallyChangedForAssignment(queryData)
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
const useConvertRecentToChanged = (data: ReviewCheckResponseData | undefined) => {
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

const useResetChangedWhenSearchParamsChanged = () => {
    const setChangedIdToRequestInfo = useReviewCheckStore((state) => state.setIdToChangedInfo)
    const setChangedIdToRequestInfoByMultiSelect = useReviewCheckStore((state) => state.setIdToChangedInfoByMultiSelect)
    const { student_id, syllabus_id, classroom_id } = route.useSearch()
    useEffect(() => {
        setChangedIdToRequestInfo({})
        setChangedIdToRequestInfoByMultiSelect({})
    }, [student_id, syllabus_id, classroom_id])
}

const useReviewCheck = () => {
    const { assignmentWithBooksArray, extendedBook } = useReviewCheckQuery()

    const { mutate: mutateForSyllabus } = useReviewCheckMutateForSyllabus()
    useDetectIdToChanedInfoThenMutateForSyllabus(mutateForSyllabus)

    const { mutate: mutateForAssignment } = useReviewCheckMutateForAssignment()
    useDetectIdToChanedInfoThenMutateForAssignment(mutateForAssignment)

    useConvertRecentToChanged(extendedBook)
    useResetChangedWhenSearchParamsChanged()

    return { extendedBook, assignmentWithBooksArray }
}

export default useReviewCheck
