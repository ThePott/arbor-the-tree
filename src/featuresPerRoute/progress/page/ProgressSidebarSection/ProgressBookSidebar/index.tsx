import type { AssignedJoinedSyllabus } from "@/featuresPerRoute/progress/types"
import { instance } from "@/packages/api/axiosInstances"
import { Vstack } from "@/packages/components/layouts"
import Title from "@/packages/components/Title/Title"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi, useLoaderData } from "@tanstack/react-router"
import ProgressSyllabusAssignedButton from "./ProgressSyllabusAssignedButton"
import ProgressBookForm from "./ProgressSyllabusForm"

const route = getRouteApi("/progress/")

// NOTE: 서버로 넘어오는 것이 classroom_syllabus인지 student_syllabus인지는 모르나, 한 화면에서 둘이 섞일 일은 없다
const ProgressSyllabusSidebar = () => {
    const { studentArray, classroomArray } = useLoaderData({ from: "/progress/" })
    const { student_id, classroom_id } = route.useSearch()

    const { data } = useQuery({
        queryKey: ["progressSyllabusAssigned", { classroom_id, student_id: classroom_id ? undefined : student_id }],
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
        <Vstack className="w-[300px] p-my-md overflow-y-scroll pl-0">
            <Title as="h3">{title}</Title>
            <ProgressBookForm />

            <Vstack gap="none">
                {data && data.length > 0 && (
                    <>
                        <ProgressSyllabusAssignedButton assignedJoinedSyllabus={null} />
                        {data.map((assignedJoinedSyllabus) => (
                            <ProgressSyllabusAssignedButton
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

export default ProgressSyllabusSidebar
