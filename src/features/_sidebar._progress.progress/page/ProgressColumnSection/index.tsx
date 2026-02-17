import { makeReviewAssignmentQueryOptions } from "@/features/_sidebar.review._assignment.assignment/loader"
import { FlexOneContainer, Hstack, Vstack } from "@/packages/components/layouts"
import Toggle from "@/packages/components/Toggle"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi, useLoaderData } from "@tanstack/react-router"
import { useState } from "react"
import { makeProgressSessionQueryOptions } from "../../loader"
import ProgressColumn from "./ProgressColumn"
import ProgressColumnSummarizedMany from "./ProgressColumnSummarizedMany"

const route = getRouteApi("/_sidebar")
const ProgressColumnSection = () => {
    const [isSummarized, setIsSummarized] = useState(false)
    const searchParams = route.useSearch()
    const { classroom_id, student_id, syllabus_id } = searchParams

    const { progressSessionData: progressSessionLoaderData, assignmentData: assignmentLoaderData } = useLoaderData({
        from: "/_sidebar/_progress/progress/",
    })
    const { data: progressSessionQueryData } = useQuery({
        ...makeProgressSessionQueryOptions({ classroom_id, student_id, syllabus_id }),
        enabled: Boolean(classroom_id || student_id),
    })
    const { data: assignmentQueryData } = useQuery({
        ...makeReviewAssignmentQueryOptions({ classroom_id, student_id }),
        enabled: Boolean(student_id),
    })
    const progressSessionData = progressSessionQueryData ?? progressSessionLoaderData
    const assignmentData = assignmentQueryData ?? assignmentLoaderData

    const conciseSyllabusArray = syllabus_id
        ? progressSessionData.filter((conciseSyllabus) => conciseSyllabus.id === syllabus_id)
        : progressSessionData

    return (
        <FlexOneContainer isXScrollable className="pt-my-lg pl-my-lg">
            <Vstack gap="none" className="h-full">
                <Toggle onChange={(value) => setIsSummarized(value)} defaultIsOn={isSummarized}>
                    요약
                </Toggle>
                <Hstack className="flex-1 overflow-y-hidden pb-my-lg">
                    {!isSummarized && (
                        <>
                            {conciseSyllabusArray.map((conciseSyllabus) => (
                                <ProgressColumn key={conciseSyllabus.id} conciseSyllabus={conciseSyllabus} />
                            ))}
                        </>
                    )}
                    {isSummarized && <ProgressColumnSummarizedMany conciseSyllabusArray={conciseSyllabusArray} />}
                </Hstack>
                <p>{JSON.stringify(assignmentData)}</p>
            </Vstack>
        </FlexOneContainer>
    )
}

export default ProgressColumnSection
