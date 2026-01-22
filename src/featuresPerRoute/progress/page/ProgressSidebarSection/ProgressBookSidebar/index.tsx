import { instance } from "@/packages/api/axiosInstances"
import { Vstack } from "@/packages/components/layouts"
import Title from "@/packages/components/Title/Title"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi, useLoaderData } from "@tanstack/react-router"
import ProgressBookButton from "./ProgressBookButton"
import ProgressBookForm from "./ProgressBookForm"

const route = getRouteApi("/progress/")

export type JoinedBook = {
    id: string
    classroom_id?: string
    student_id?: string
    book: {
        id: string
        title: string
        published_year: number
    }
}
const ProgressBookSidebar = () => {
    const { studentArray, classroomArray } = useLoaderData({ from: "/progress/" })
    const { student_id, classroom_id } = route.useSearch()
    const { data } = useQuery({
        queryKey: ["progressBook", { classroom_id, student_id: classroom_id ? undefined : student_id }],
        queryFn: async () => {
            const response = await instance.get("/progress/book", {
                params: { classroom_id, student_id: classroom_id ? undefined : student_id },
            })
            return response.data as JoinedBook[]
        },
        enabled: Boolean(classroom_id || student_id),
    })

    const classroom = classroomArray.find((el) => el.id === classroom_id)
    const student = studentArray.find((el) => el.id === student_id)
    const title = [classroom?.name, student?.users.name].filter((value) => value).join(" / ")

    if (!student_id && !classroom_id) return <p>학생 또는 반을 선택해주세요 ---- 이거 더 예쁘게 만들어야</p>
    return (
        <Vstack>
            <Title as="h3">{title}</Title>
            <ProgressBookForm />

            <Vstack gap="none">
                {data && data.length > 0 && (
                    <>
                        <ProgressBookButton joinedBook={null} />
                        {data.map((joinedBook) => (
                            <ProgressBookButton key={joinedBook.id} joinedBook={joinedBook} />
                        ))}
                    </>
                )}
            </Vstack>
        </Vstack>
    )
}

export default ProgressBookSidebar
