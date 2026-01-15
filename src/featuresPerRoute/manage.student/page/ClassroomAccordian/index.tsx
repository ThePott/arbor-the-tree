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
import LocalAutoComplete from "@/packages/components/LocalAutoComplete"
import type { ValueLabel } from "@/shared/interfaces"
import { useLoaderData } from "@tanstack/react-router"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod/v3"

type ClassroomAccordianProps = { classroom: ExtendedClassroom }

const ClassroomAccordian = ({ classroom }: ClassroomAccordianProps) => {
    const { studentArray } = useLoaderData({ from: "/manage/student" })

    const setSelectedClassroom = useManageStudentStore((state) => state.setSelectedClassroom)
    const setModalKey = useManageStudentStore((state) => state.setModalKey)

    const postMutation = useMutation({
        mutationFn: async (body: { student_id: string }) => await instance.post("/manage/classroom/student", body),
    })

    const optionArray: ValueLabel[] = studentArray
        .filter((student) =>
            student.classroomStudents.every((classroomStudent) => classroomStudent.classroom_id !== classroom.id)
        )
        .map((student) => ({
            value: student.id,
            label: `${student.users.name}, ${student.school.name}, ${student.grade}`,
        }))
    const optionLabelArray = optionArray.map((option) => option.label)

    const schema = z.object({
        optionLabel: z
            .string()
            .min(1, "학생 정보를 입력해주세요")
            .refine((value) => optionLabelArray.includes(value)),
    })
    type Schema = z.input<typeof schema>
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: zodResolver(schema) })

    // TODO: react hook form 으로 나중에 바꿔야
    const onSubmit = (data: Schema) => {
        const student_id = optionArray.filter((el) => el.label === data.optionLabel)[0].value
        const classroom_id = classroom.id
        const body = { student_id, classroom_id }
        postMutation.mutate(body)
    }

    const handleClassroomDelete = () => {
        setSelectedClassroom(classroom)
        setModalKey("deleteClassroom")
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
        if (event.key !== "Enter") return
        event.preventDefault()
    }

    console.log({ component: "classroom accordian" })
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

                <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
                    <Hstack gap="xs">
                        <Controller
                            control={control}
                            name="optionLabel"
                            render={({ field: { onChange } }) => (
                                <LocalAutoComplete
                                    isRed={false}
                                    optionArray={optionArray}
                                    placeholder="학생 이름, 학교, 학년"
                                    onChange={onChange}
                                />
                            )}
                        />
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
