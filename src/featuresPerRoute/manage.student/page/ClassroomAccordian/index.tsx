import { instance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import Input from "@/packages/components/Input/Input"
import { Vstack, Hstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import { useMutation } from "@tanstack/react-query"
import { Plus, Trash } from "lucide-react"
import ClassroomTable from "./ClassroomTable"
import type { ExtendedClassroom } from "../../types"
import useManageStudentStore from "../../store"

type ClassroomAccordianProps = { classroom: ExtendedClassroom }

const ClassroomAccordian = ({ classroom }: ClassroomAccordianProps) => {
    const setSelectedClassroom = useManageStudentStore((state) => state.setSelectedClassroom)
    const setModalKey = useManageStudentStore((state) => state.setModalKey)
    const postMutation = useMutation({
        mutationFn: async (body: { student_id: string }) => await instance.post("/manage/classroom/student", body),
    })

    // TODO: react hook form 으로 나중에 바꿔야
    const handleSubmitEvent = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const student_id = event.currentTarget.student_id.value
        const classroom_id = classroom.id
        const body = { student_id, classroom_id }
        postMutation.mutate(body)
    }

    const handleClassroomDelete = () => {
        setSelectedClassroom(classroom)
        setModalKey("deleteClassroom")
    }

    return (
        <RoundBox color="bg0" isShadowed padding="lg" radius="lg">
            <Vstack>
                <Hstack className="items-end justify-between">
                    <Title as="h2">{classroom.name}</Title>
                    <Button onClick={handleClassroomDelete}>
                        <Trash size={16} />
                    </Button>
                </Hstack>
                <ClassroomTable extendedClassroom={classroom} />

                <form onSubmit={handleSubmitEvent}>
                    <Hstack gap="xs">
                        <Input name="student_id" placeholder="student_id" className="grow" />
                        <Button>
                            <Plus />
                        </Button>
                    </Hstack>
                </form>
            </Vstack>
        </RoundBox>
    )
}

export default ClassroomAccordian
