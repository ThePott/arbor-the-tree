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

export const useResetChangedWhenSearchParamsChanged = () => {
    const setChangedIdToRequestInfo = useReviewCheckStore((state) => state.setIdToChangedInfo)
    const setChangedIdToRequestInfoByMultiSelect = useReviewCheckStore((state) => state.setIdToChangedInfoByMultiSelect)
    const { student_id, syllabus_id, classroom_id, is_assignment } = route.useSearch()
    useEffect(() => {
        setChangedIdToRequestInfo({})
        setChangedIdToRequestInfoByMultiSelect({})
    }, [student_id, syllabus_id, classroom_id, is_assignment])
}
