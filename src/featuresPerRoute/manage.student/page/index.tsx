import { Container, Vstack } from "@/packages/components/layouts"
import TabBar, { type Tab } from "@/packages/components/TabBar/TabBar"
import Title from "@/packages/components/Title/Title"
import { useLoaderData, useNavigate } from "@tanstack/react-router"
import ClassroomAccordian from "./ClassroomAccordian"
import DeleteClassroomModal from "./DeleteClassroomModal"
import IsolatedStudentTable from "./IsolatedStudentTable"
import NewClassroomForm from "./NewClassroomForm"
import { useQuery } from "@tanstack/react-query"
import { ManageStudentLoaderQueryOptions } from "../loader"
import type { ManageStudentSearch } from "../types"

const MANAGE_STUDENT_TAB_ARRAY: Tab<ManageStudentSearch>[] = [
    { label: "반별", value: "classroom" },
    { label: "학생별", value: "student" },
]

const ManageStudentPage = () => {
    const { classroomArray } = useLoaderData({ from: "/manage/student" })
    const { data } = useQuery(ManageStudentLoaderQueryOptions)
    const finalClassroomArray = data?.classroomArray ?? classroomArray
    const navigate = useNavigate({ from: "/manage/student" })

    return (
        <>
            <Container width="xl" isPadded>
                <Vstack gap="lg">
                    <Title as="h1">학생 관리</Title>
                    <TabBar
                        variant="underline"
                        tabArray={MANAGE_STUDENT_TAB_ARRAY}
                        onSelect={(tab) => {
                            navigate({ search: { by: tab.value } })
                        }}
                    />

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
