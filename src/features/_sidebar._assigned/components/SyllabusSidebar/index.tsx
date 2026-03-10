import { Vstack } from "@/packages/components/layouts"
import Title from "@/packages/components/Title/Title"
import { makeProgressSyllabusAssignedQueryOptions } from "@/shared/queryOptions/progressSyllabusAssignedQueryOptions"
import { makeReviewAssignmentQueryOptions } from "@/shared/queryOptions/reviewAssignmentQueryOptions"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi, useLoaderData } from "@tanstack/react-router"
import type { ReactNode } from "react"
import AllButton from "./AllButton"
import CreatedReviewAssignmentButton from "./CreatedReviewAssignmentButton"
import SyllabusAssignedButton from "./SyllabusAssignedButton"

const commonSidebarRoute = getRouteApi("/_sidebar")

const SyllabusSidebarAllButton = () => {
    const { student_id, classroom_id } = commonSidebarRoute.useSearch()
    const { assignedJoinedSyllabusArray: loaderDataSyllabus, assignmentMetaInfoArray: loaderDataAssignment } =
        useLoaderData({
            from: "/_sidebar/_assigned",
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

    if (dataAssignment.length === 0 && dataSyllabus.length === 0) return null

    return <AllButton />
}

type SyllabusSidebarButtonManyProps = {
    isDeletable?: boolean
}
const SyllabusSidebarButtonMany = ({ isDeletable }: SyllabusSidebarButtonManyProps) => {
    const { student_id, classroom_id } = commonSidebarRoute.useSearch()
    const { assignedJoinedSyllabusArray: loaderDataSyllabus, assignmentMetaInfoArray: loaderDataAssignment } =
        useLoaderData({ from: "/_sidebar/_assigned" })

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

    if (!student_id && !classroom_id) return null

    return (
        <>
            {dataAssignment.length > 0 && <CreatedReviewAssignmentButton />}
            {dataSyllabus.length > 0 && (
                <>
                    {dataSyllabus.map((assignedJoinedSyllabus) => (
                        <SyllabusAssignedButton
                            isDeletable={isDeletable}
                            key={assignedJoinedSyllabus.syllabus.id}
                            assignedJoinedSyllabus={assignedJoinedSyllabus}
                        />
                    ))}
                </>
            )}
        </>
    )
}

type SyllabusSidebarButtonGroupProps = { children: ReactNode }
const SyllabusSidebarButtonGroup = ({ children }: SyllabusSidebarButtonGroupProps) => {
    return <Vstack gap="none">{children}</Vstack>
}

type SyllabusSidebarProps = {
    children: ReactNode
}
const SyllabusSidebar = ({ children }: SyllabusSidebarProps) => {
    const { student_id, classroom_id } = commonSidebarRoute.useSearch()
    const {
        extendedStudentArray: { studentArray, classroomArray },
    } = useLoaderData({ from: "/_sidebar" })

    const classroom = classroomArray.find((el) => el.id === classroom_id)
    const student = studentArray.find((el) => el.id === student_id)
    const title = [classroom?.name, student?.users.name].filter((value) => value).join(" / ")

    if (!student_id && !classroom_id) return null
    return (
        <Vstack className="w-[240px] py-my-lg overflow-y-auto pl-my-md">
            <Title as="h3">{title}</Title>

            {children}
        </Vstack>
    )
}

SyllabusSidebar.ButtonGroup = SyllabusSidebarButtonGroup
SyllabusSidebar.ButtonMany = SyllabusSidebarButtonMany
SyllabusSidebar.AllButton = SyllabusSidebarAllButton

export default SyllabusSidebar
