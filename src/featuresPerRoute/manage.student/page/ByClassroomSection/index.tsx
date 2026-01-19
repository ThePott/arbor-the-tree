import ClassroomAccordian from "./ClassroomAccordian"
import IsolatedStudentTable from "./IsolatedStudentTable"
import NewClassroomForm from "./NewClassroomForm"
import { useQuery } from "@tanstack/react-query"
import { useLoaderData } from "@tanstack/react-router"
import { ManageStudentLoaderQueryOptions } from "../../loader"
import DeleteClassroomModal from "./DeleteClassroomModal"

const ByClassroomSection = () => {
    console.log("LOG: ByClassroomSection render")
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
