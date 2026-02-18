import type { AssignedJoinedSyllabus } from "@/features/_sidebar._progress.progress/types"
import { instance } from "@/packages/api/axiosInstances"
import { Vstack } from "@/packages/components/layouts"
import Title from "@/packages/components/Title/Title"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi, useLoaderData } from "@tanstack/react-router"
import type { ReactNode } from "react"
import SyllabusAssignedButton from "./SyllabusAssignedButton"

const commonSidebarRoute = getRouteApi("/_sidebar")

type SyllabusSidebarProps = {
    children?: ReactNode
    // syllabusAssignedButton?: (props: SyllabusAssignedButtonProps) => JSX.Element
}
const SyllabusSidebar = ({ children }: SyllabusSidebarProps) => {
    const { student_id, classroom_id } = commonSidebarRoute.useSearch()
    const { studentArray, classroomArray } = useLoaderData({ from: "/_sidebar" })

    const { data } = useQuery({
        // NOTE: progress에서만 mutate을 하므로 progress prefix 사용
        queryKey: ["progressSyllabusAssigned", classroom_id, classroom_id ? undefined : student_id],
        queryFn: async () => {
            const response = await instance.get("/progress/syllabus/assigned", {
                params: { classroom_id, student_id: classroom_id ? undefined : student_id },
            })
            return response.data as AssignedJoinedSyllabus[]
        },
        enabled: Boolean(classroom_id || student_id),
    })

    const classroom = classroomArray.find((el) => el.id === classroom_id)
    const student = studentArray.find((el) => el.id === student_id)
    const title = [classroom?.name, student?.users.name].filter((value) => value).join(" / ")

    if (!student_id && !classroom_id) return null
    return (
        <Vstack className="w-[300px] p-my-md pl-1.5 overflow-y-scroll">
            <Title as="h3">{title}</Title>

            {children}

            <Vstack gap="none">
                {data && data.length > 0 && (
                    <>
                        <SyllabusAssignedButton assignedJoinedSyllabus={null} />
                        {data.map((assignedJoinedSyllabus) => (
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
