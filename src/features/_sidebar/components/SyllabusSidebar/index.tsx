import { makeProgressSyllabusAssignedQueryOptions } from "@/features/_sidebar._progress/loader"
import { makeReviewAssignmentQueryOptions } from "@/features/_sidebar.review._assignment.assignment/loader"
import { Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi, useLoaderData } from "@tanstack/react-router"
import type { ReactNode } from "react"
import SyllabusAssignedButton from "./SyllabusAssignedButton"

const commonSidebarRoute = getRouteApi("/_sidebar")

type SyllabusSidebarProps = {
    children?: ReactNode
}
const SyllabusSidebar = ({ children }: SyllabusSidebarProps) => {
    const { student_id, classroom_id } = commonSidebarRoute.useSearch()
    const { studentArray, classroomArray } = useLoaderData({ from: "/_sidebar" })
    const { assignedJoinedSyllabusArray: loaderDataSyllabus, assignmentMetaInfoArray: loaderDataAssignment } =
        useLoaderData({
            from: "/_sidebar/_progress",
        })

    const { data: queryDataSyllabus } = useQuery({
        ...makeProgressSyllabusAssignedQueryOptions({ classroom_id, student_id }),
        enabled: Boolean(classroom_id || student_id),
    })
    const { data: queryDataAssignment } = useQuery({
        ...makeReviewAssignmentQueryOptions({ classroom_id, student_id }),
        enabled: Boolean(student_id),
    })

    const dataSyllabus = queryDataSyllabus ?? loaderDataSyllabus
    const dataAssignment = queryDataAssignment ?? loaderDataAssignment

    const classroom = classroomArray.find((el) => el.id === classroom_id)
    const student = studentArray.find((el) => el.id === student_id)
    const title = [classroom?.name, student?.users.name].filter((value) => value).join(" / ")

    if (!student_id && !classroom_id) return null
    return (
        <Vstack className="w-[300px] p-my-md pl-1.5 overflow-y-scroll">
            <Title as="h3">{title}</Title>

            {children}

            <Vstack gap="none">
                <SyllabusAssignedButton assignedJoinedSyllabus={null} />
                {dataAssignment.length > 0 && (
                    <RoundBox padding="xl" isBordered>
                        placeholder for assignement
                    </RoundBox>
                )}
                {dataSyllabus.length > 0 && (
                    <>
                        {dataSyllabus.map((assignedJoinedSyllabus) => (
                            <SyllabusAssignedButton
                                key={assignedJoinedSyllabus.syllabus.id}
                                assignedJoinedSyllabus={assignedJoinedSyllabus}
                            />
                        ))}
                    </>
                )}
            </Vstack>
        </Vstack>
    )
}

export default SyllabusSidebar
