import { makeReviewAssignmentQueryOptions } from "@/features/_sidebar/loader"
import { FlexOneContainer, Hstack, Vstack } from "@/packages/components/layouts"
import Toggle from "@/packages/components/Toggle"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi, useLoaderData } from "@tanstack/react-router"
import { useState } from "react"
import { makeProgressSessionQueryOptions } from "../../loader"
import AssignmentColumn from "./AssignmentColumn"
import ProgressColumn from "./ProgressColumn"
import ProgressColumnSummarizedMany from "./ProgressColumnSummarizedMany"

const commonSidebarRoute = getRouteApi("/_sidebar")
const progressSidebarRoute = getRouteApi("/_sidebar/_progress")
const ProgressColumnSection = () => {
    const [isSummarized, setIsSummarized] = useState(false)
    const { classroom_id, student_id, syllabus_id } = commonSidebarRoute.useSearch()
    const { is_assignment } = progressSidebarRoute.useSearch()

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
                            {!syllabus_id && assignmentData.length > 0 && (
                                <AssignmentColumn assignmentData={assignmentData} />
                            )}
                            {!is_assignment &&
                                conciseSyllabusArray.map((conciseSyllabus) => (
                                    <ProgressColumn key={conciseSyllabus.id} conciseSyllabus={conciseSyllabus} />
                                ))}
                        </>
                    )}
                    {isSummarized && <ProgressColumnSummarizedMany conciseSyllabusArray={conciseSyllabusArray} />}
                </Hstack>
            </Vstack>
        </FlexOneContainer>
    )
}

export default ProgressColumnSection
