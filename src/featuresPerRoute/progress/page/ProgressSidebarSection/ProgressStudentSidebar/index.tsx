import { Vstack } from "@/packages/components/layouts"
import { useLoaderData } from "@tanstack/react-router"

const ProgressStudentSidebar = () => {
    const { studentArray, classroomArray, classroomStudentArray } = useLoaderData({ from: "/progress/" })
    return (
        <Vstack>
            <p>{JSON.stringify(studentArray)}</p>
            <p>{JSON.stringify(classroomArray)}</p>
            <p>{JSON.stringify(classroomStudentArray)}</p>
        </Vstack>
    )
}

export default ProgressStudentSidebar
