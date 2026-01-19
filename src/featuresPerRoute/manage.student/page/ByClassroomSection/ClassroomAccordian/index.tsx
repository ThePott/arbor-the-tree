import { instance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import { Vstack, Hstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Plus, Trash } from "lucide-react"
import ClassroomTable from "./ClassroomTable"
import LocalAutoComplete from "@/packages/components/LocalAutoComplete"
import type { Classroom, ClassroomStudent, ValueLabel } from "@/shared/interfaces"
import { useLoaderData } from "@tanstack/react-router"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod/v3"
import {
    ManageStudentLoaderQueryOptions,
    type ManageStudentLoaderResponseData,
} from "@/featuresPerRoute/manage.student/loader"
import useManageStudentStore from "@/featuresPerRoute/manage.student/store"

type ClassroomAccordianProps = { classroom: Classroom }
type PostBody = {
    student_id: string
    classroom_id: string
}

const ClassroomAccordian = ({ classroom }: ClassroomAccordianProps) => {
    console.log("LOG: ClassroomAccordian render", classroom.name)
    useQuery(ManageStudentLoaderQueryOptions)
    const loaderData = useLoaderData({ from: "/manage/student" })
    const { data: queryData } = useQuery(ManageStudentLoaderQueryOptions)
    const studentArray = queryData?.studentArray ?? loaderData.studentArray
    const classroomStudentArray = queryData?.classroomStudentArray ?? loaderData.classroomStudentArray

    const setSelectedClassroom = useManageStudentStore((state) => state.setSelectedClassroom)
    const setModalKey = useManageStudentStore((state) => state.setModalKey)

    // NOTE: 여기서는 classroomStudent를 추가하기만 한다. <<<< 반에 학생 추가
    // TODO: refactor
    const postMutation = useMutation({
        mutationFn: async (body: PostBody) => await instance.post("/manage/classroom-student", body),
        onMutate: async ({ student_id, classroom_id }, context) => {
            await context.client.cancelQueries({ queryKey: ["manageStudent"] })
            const previous = context.client.getQueryData(["manageStudent"]) as ManageStudentLoaderResponseData

            const targetStudent = previous.studentArray.find((student) => student.id === student_id)
            if (!targetStudent) return { previous }

            const classroomStudentArray: ClassroomStudent[] = [
                ...previous.classroomStudentArray,
                {
                    id: crypto.randomUUID(),
                    classroom_id,
                    student_id,
                },
            ]
            const newData = { ...previous, classroomStudentArray }
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

    // TODO: refactor
    // NOTE: local auto complete options
    // NOTE: 해당 반에 아직 등록되지 않은 학생 목록
    const optionArray: ValueLabel[] = studentArray
        .filter((student) => {
            const index = classroomStudentArray.findIndex(
                (classroomStudent) =>
                    classroomStudent.student_id === student.id && classroomStudent.classroom_id === classroom.id
            )
            return index === -1
        })
        .map((student) => ({
            value: student.id,
            label: `${student.users.name}, ${student.school.name}, ${student.grade}`,
        }))
    const optionLabelArray = optionArray.map((option) => option.label)
    console.log({ optionLabelArray })

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
                <ClassroomTable classroom={classroom} />

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
