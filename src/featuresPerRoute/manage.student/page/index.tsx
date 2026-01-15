import { Container, Vstack } from "@/packages/components/layouts"
import TabBar, { type Tab } from "@/packages/components/TabBar/TabBar"
import Title from "@/packages/components/Title/Title"
import { useLoaderData } from "@tanstack/react-router"
import ClassroomAccordian from "./ClassroomAccordian"
import DeleteClassroomModal from "./DeleteClassroomModal"
import IsolatedStudentTable from "./IsolatedStudentTable"
import NewClassroomForm from "./NewClassroomForm"
import { useQuery } from "@tanstack/react-query"
import { ManageStudentLoaderQueryOptions } from "../loader"

const MANAGE_STUDENT_TAB_ARRAY: Tab<string>[] = [
    { label: "반별", value: "classroom" },
    { label: "학생별", value: "student" },
]

const ManageStudentPage = () => {
    const { classroomArray } = useLoaderData({ from: "/manage/student" })
    const { data } = useQuery(ManageStudentLoaderQueryOptions)
    const finalClassroomArray = data?.classroomArray ?? classroomArray

    return (
        <>
            <Container width="xl" isPadded>
                <Vstack gap="lg">
                    <Title as="h1">학생 관리</Title>
                    <TabBar variant="underline" tabArray={MANAGE_STUDENT_TAB_ARRAY} onSelect={() => {}} />

                    {finalClassroomArray.map((classroom) => (
                        <ClassroomAccordian key={classroom.id} classroom={classroom} />
                    ))}

                    <NewClassroomForm />
                    <IsolatedStudentTable />
                </Vstack>
            </Container>
            <DeleteClassroomModal />
        </>
    )
}

export default ManageStudentPage
