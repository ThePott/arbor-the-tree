import {
    makeReviewCheckAssignmentQueryOptions,
    makeReviewCheckQueryOptions,
} from "@/features/_sidebar._assigned._check.check/loader"
import useReviewCheckStore from "@/features/_sidebar._assigned._check.check/store"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi, useLoaderData } from "@tanstack/react-router"
import { useEffect } from "react"

const route = getRouteApi("/_sidebar")

export const useReviewCheckQuery = () => {
    const searchParams = route.useSearch()
    const { classroom_id, student_id, syllabus_id, is_assignment } = searchParams
    const { bookForSession: bookForSessionLoaderData, bookForAssignmentArray: bookForAssignmentArrayLoaderData } =
        useLoaderData({
            from: "/_sidebar/_assigned/_check/check/",
        })

    const { data: bookForSessionQueryData } = useQuery({
        ...makeReviewCheckQueryOptions({ classroom_id, student_id, syllabus_id }),
        enabled: Boolean(student_id && !is_assignment),
    })
    const { data: bookForAssignmentArrayQueryData } = useQuery({
        ...makeReviewCheckAssignmentQueryOptions({ classroom_id, student_id }),
        enabled: Boolean(student_id && is_assignment),
    })
    const bookForSession = bookForSessionQueryData ?? bookForSessionLoaderData
    const bookForAssignmentArray = bookForAssignmentArrayQueryData ?? bookForAssignmentArrayLoaderData
    return { bookForSession, bookForAssignmentArray }
}

export const useResetChangedWhenSearchParamsChanged = () => {
    const setChangedIdToRequestInfo = useReviewCheckStore((state) => state.setIdToChangedInfo)
    const setChangedIdToRequestInfoByMultiSelect = useReviewCheckStore((state) => state.setIdToChangedInfoByMultiSelect)
    const { student_id, syllabus_id, classroom_id, is_assignment } = route.useSearch()
    useEffect(() => {
        setChangedIdToRequestInfo({})
        setChangedIdToRequestInfoByMultiSelect({})
    }, [student_id, syllabus_id, classroom_id, is_assignment])
}
