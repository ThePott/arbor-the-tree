import { instance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import { Vstack, Hstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import { useMutation, useQuery } from "@tanstack/react-query"
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
import { ManageStudentLoaderQueryOptions, type ManageStudentLoaderResponseData } from "../../loader"

type ClassroomAccordianProps = { classroom: ExtendedClassroom }
type PostBody = {
    student_id: string
    classroom_id: string
}

const ClassroomAccordian = ({ classroom }: ClassroomAccordianProps) => {
    useQuery(ManageStudentLoaderQueryOptions)
    const { studentArray } = useLoaderData({ from: "/manage/student" })

    const setSelectedClassroom = useManageStudentStore((state) => state.setSelectedClassroom)
    const setModalKey = useManageStudentStore((state) => state.setModalKey)

    const postMutation = useMutation({
        mutationFn: async (body: PostBody) => await instance.post("/manage/classroom-student", body),
        onMutate: async ({ student_id, classroom_id }, context) => {
            await context.client.cancelQueries({ queryKey: ["manageStudent"] })
            const previous = context.client.getQueryData(["manageStudent"]) as ManageStudentLoaderResponseData

            const targetStudent = previous.studentArray.find((student) => student.id === student_id)
            if (!targetStudent) return { previous }

            const targetClassroom = previous.classroomArray.find((classroomItem) => classroomItem.id === classroom_id)
            if (!targetClassroom) return { previous }

            const newClassroomStudent: ExtendedClassroom["classroomStudents"][number] = {
                id: crypto.randomUUID(),
                classroom_id,
                student_id,
                student: targetStudent,
            }

            const updatedClassroomArray = previous.classroomArray.map((classroomItem) => {
                if (classroomItem.id !== classroom_id) return classroomItem
                return {
                    ...classroomItem,
                    classroomStudents: [...classroomItem.classroomStudents, newClassroomStudent],
                }
            })

            const newData: ManageStudentLoaderResponseData = {
                ...previous,
                classroomArray: updatedClassroomArray,
            }
            context.client.setQueryData(["manageStudent"], newData)

            return { previous }
        },
        onError: (_error, _variables, onMutateResult, context) => {
            context.client.setQueryData(["manageStudent"], onMutateResult?.previous)
        },
        onSettled: (_data, _error, _variables, _onMutateResult, context) => {
            context.client.invalidateQueries({ queryKey: ["manageStudent"] })
        },
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

    const onSubmit = (data: Schema) => {
        const student_id = optionArray.filter((el) => el.label === data.optionLabel)[0].value
        const classroom_id = classroom.id
        const body: PostBody = { student_id, classroom_id }
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
                                    isRed={Boolean(errors.optionLabel)}
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
