import { Vstack } from "@/packages/components/layouts"
import Title from "@/packages/components/Title/Title"
import { getRouteApi, useLoaderData } from "@tanstack/react-router"

const route = getRouteApi("/progress/")

const ProgressBookSidebar = () => {
    const { studentArray, classroomArray } = useLoaderData({ from: "/progress/" })
    const { student: studentInParams, classroom: classroomInParams } = route.useSearch()

    const classroom = classroomArray.find((el) => el.id === classroomInParams)
    const student = studentArray.find((el) => el.id === studentInParams)
    const title = [classroom?.name, student?.users.name].filter((value) => value).join(" / ")

    return (
        <Vstack>
            <Title as="h3">{title}</Title>
        </Vstack>
    )
}

export default ProgressBookSidebar
