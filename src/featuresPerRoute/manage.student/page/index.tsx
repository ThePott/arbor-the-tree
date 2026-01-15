import { Container, Hstack, Vstack } from "@/packages/components/layouts"
import TabBar, { type Tab } from "@/packages/components/TabBar/TabBar"
import Title from "@/packages/components/Title/Title"
import IsolatedStudentTable from "./ManageStudentTable"
import Input from "@/packages/components/Input/Input"
import { Plus } from "lucide-react"
import Button from "@/packages/components/Button/Button"
import { useMutation } from "@tanstack/react-query"
import { instance } from "@/packages/api/axiosInstances"
import { useLoaderData } from "@tanstack/react-router"
import ClassroomAccordian from "./ClassroomAccordian"
import DeleteClassroomModal from "./DeleteClassroomModal"

const MANAGE_STUDENT_TAB_ARRAY: Tab<string>[] = [
    { label: "반별", value: "classroom" },
    { label: "학생별", value: "student" },
]

const ManageStudentPage = () => {
    const postMutation = useMutation({
        mutationFn: async (body: { name: string }) => {
            await instance.post("/manage/classroom", body)
        },
    })
    const handleSubmitEvent = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const classroom_name = event.currentTarget.classroom_name.value
        const body = { name: classroom_name }
        postMutation.mutate(body)
    }

    const { classroomArray } = useLoaderData({ from: "/manage/student" })

    return (
        <>
            <Container width="xl" isPadded>
                <Vstack gap="lg">
                    <Title as="h1">학생 관리</Title>
                    <TabBar variant="underline" tabArray={MANAGE_STUDENT_TAB_ARRAY} onSelect={() => {}} />

                    <form onSubmit={handleSubmitEvent}>
                        <Hstack>
                            <Input name="classroom_name" placeholder="새 반 이름" className="grow" />
                            <Button color="green">
                                <Plus />
                            </Button>
                        </Hstack>
                    </form>

                    {classroomArray.map((classroom) => (
                        <ClassroomAccordian key={classroom.id} classroom={classroom} />
                    ))}

                    <IsolatedStudentTable />
                </Vstack>
            </Container>
            <DeleteClassroomModal />
        </>
    )
}

export default ManageStudentPage
