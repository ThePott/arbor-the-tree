import { debugRender } from "@/shared/config/debug/"
import { useQuery } from "@tanstack/react-query"
import { useLoaderData } from "@tanstack/react-router"
import { ManageStudentLoaderQueryOptions } from "../../loader"
import ClassroomAccordian from "./ClassroomAccordian"
import DeleteClassroomModal from "./DeleteClassroomModal"
import IsolatedStudentTable from "./IsolatedStudentTable"
import NewClassroomForm from "./NewClassroomForm"

const ByClassroomSection = () => {
    debugRender("ByClassroomSection")
    const { classroomArray } = useLoaderData({ from: "/manage/student" })
    const { data } = useQuery(ManageStudentLoaderQueryOptions)
    const finalClassroomArray = data?.classroomArray ?? classroomArray

    return (
        <>
            {finalClassroomArray.map((classroom) => (
                <ClassroomAccordian key={classroom.id} classroom={classroom} />
            ))}

            <NewClassroomForm />
            <IsolatedStudentTable />
            <DeleteClassroomModal />
        </>
    )
}

export default ByClassroomSection
