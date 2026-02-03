import type { AssignedJoinedSyllabus } from "@/featuresPerRoute/progress/types"
import { instance } from "@/packages/api/axiosInstances"
import { Vstack } from "@/packages/components/layouts"
import Title from "@/packages/components/Title/Title"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi, useLoaderData } from "@tanstack/react-router"
import SyllabusAssignedButton from "./SyllabusAssignedButton"
import SyllabusForm from "./SyllabusForm"

// TODO: 이거 어떻게 해야하지??
const route = getRouteApi("/_sidebar-section")

// NOTE: syllabus 목록은 syllabus form 에서만 사용하므로 여기선 가져올 필요 없다
// NOTE: 여기서 필요한 것: 학생 목록
// NOTE: 여기서 필요한 것: 학생에게 부여된 실라버스 목록 (syllabus assigned)
const SyllabusSidebar = () => {
    const { student_id, classroom_id } = route.useSearch()
    const { studentArray, classroomArray } = useLoaderData({ from: "/_sidebar-section" })

    const { data } = useQuery({
        queryKey: ["syllabusAssigned", { classroom_id, student_id: classroom_id ? undefined : student_id }],
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
        <Vstack className="w-[300px] p-my-md pl-1.5 overflow-y-scroll pl-0">
            <Title as="h3">{title}</Title>
            <SyllabusForm />

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
