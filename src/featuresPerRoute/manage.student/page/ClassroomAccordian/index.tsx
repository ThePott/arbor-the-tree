import { instance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import Input from "@/packages/components/Input/Input"
import { Vstack, Hstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import type { Classroom } from "@/shared/interfaces"
import { useMutation } from "@tanstack/react-query"
import { Plus } from "lucide-react"

type ClassroomAccordianProps = { classroom: Classroom }

const ClassroomAccordian = ({ classroom }: ClassroomAccordianProps) => {
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

    return (
        <RoundBox color="bg0" isShadowed padding="lg" radius="lg">
            <Vstack>
                <Title as="h2">{classroom.name}</Title>
                <div className="rounded-my-md border-border-dim p-my-xl border">sameple table</div>

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
