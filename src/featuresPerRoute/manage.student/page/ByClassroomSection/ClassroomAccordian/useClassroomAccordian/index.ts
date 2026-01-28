import {
    ManageStudentLoaderQueryOptions,
    type ManageStudentLoaderResponseData,
} from "@/featuresPerRoute/manage.student/loader"
import useManageStudentStore from "@/featuresPerRoute/manage.student/store"
import { instance } from "@/packages/api/axiosInstances"
import { debugCache, debugForm, debugMutation } from "@/shared/config/debug/"
import type { Classroom, ClassroomStudent, ValueLabel } from "@/shared/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useLoaderData } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import z from "zod/v3"

type PostBody = {
    student_id: string
    classroom_id: string
}

const useClassrromAccordianForm = (classroom: Classroom) => {
    const loaderData = useLoaderData({ from: "/manage/student" })
    const { data: queryData } = useQuery(ManageStudentLoaderQueryOptions)
    const studentArray = queryData?.studentArray ?? loaderData.studentArray
    const classroomStudentArray = queryData?.classroomStudentArray ?? loaderData.classroomStudentArray

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

    const schema = z.object({
        optionLabel: z
            .string()
            .min(1, "학생 정보를 입력해주세요")
            .refine((value) => optionLabelArray.includes(value)),
    })
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ resolver: zodResolver(schema) })

    return { control, errors, handleSubmit, schema, optionArray }
}

const useClassroomAccordianMutation = () => {
    // NOTE: 여기서는 classroomStudent를 추가하기만 한다. <<<< 반에 학생 추가
    // TODO: refactor
    const postMutation = useMutation({
        mutationFn: async (body: PostBody) => await instance.post("/manage/classroom-student", body),
        onMutate: async ({ student_id, classroom_id }, context) => {
            debugMutation("ClassroomAccordian:onMutate - adding student:%s to classroom:%s", student_id, classroom_id)
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
            debugCache("ClassroomAccordian - cache updated, added student to classroom")

            return { previous }
        },
        onError: (_error, _variables, onMutateResult, context) => {
            debugMutation("ClassroomAccordian:onError - rolling back")
            context.client.setQueryData(["manageStudent"], onMutateResult?.previous)
        },
        onSettled: (_data, _error, _variables, _onMutateResult, context) => {
            debugMutation("ClassroomAccordian:onSettled - invalidating queries")
            context.client.invalidateQueries({ queryKey: ["manageStudent"] })
        },
    })

    return { postMutation }
}

const useClassroomAccordian = (classroom: Classroom) => {
    const { control, errors, handleSubmit, schema: _schema, optionArray } = useClassrromAccordianForm(classroom)
    const { postMutation } = useClassroomAccordianMutation()

    const setSelectedClassroom = useManageStudentStore((state) => state.setSelectedClassroom)
    const setModalKey = useManageStudentStore((state) => state.setModalKey)

    type Schema = z.input<typeof _schema>
    const onSubmit = (data: Schema) => {
        debugForm("ClassroomAccordian:onSubmit %o", data)
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

    return { control, errors, handleSubmit: handleSubmit(onSubmit), handleClassroomDelete, handleKeyDown, optionArray }
}

export default useClassroomAccordian
