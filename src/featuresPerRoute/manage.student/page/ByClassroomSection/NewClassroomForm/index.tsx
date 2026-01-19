import type { ManageStudentLoaderResponseData } from "@/featuresPerRoute/manage.student/loader"
import { instance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import Input from "@/packages/components/Input/Input"
import Labeled from "@/packages/components/Labeled/Labeled"
import { Hstack } from "@/packages/components/layouts"
import type { Classroom } from "@/shared/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useLoaderData } from "@tanstack/react-router"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import z from "zod/v3"

const NewClassroomForm = () => {
    const { classroomArray } = useLoaderData({ from: "/manage/student" })
    const classroomNameArray = classroomArray.map((classroom) => classroom.name)

    const schema = z.object({
        classroom_name: z
            .string()
            .min(1, "새 반의 이름을 적어주세요")
            .refine((value) => !classroomNameArray.includes(value), "중복된 이름이에요"),
    })

    type Schema = z.input<typeof schema>

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ resolver: zodResolver(schema) })

    const postMutation = useMutation({
        mutationFn: async (body: Schema) => {
            await instance.post("/manage/classroom", body)
        },
        onMutate: async ({ classroom_name }, context) => {
            await context.client.cancelQueries()
            const previous = context.client.getQueryData(["manageStudent"]) as ManageStudentLoaderResponseData

            const newClassroom: Classroom = {
                id: crypto.randomUUID(),
                hagwon_id: previous.classroomArray[0]?.hagwon_id ?? "",
                name: classroom_name,
            }
            const newOne: ManageStudentLoaderResponseData = {
                ...previous,
                classroomArray: [...previous.classroomArray, newClassroom],
            }
            context.client.setQueryData(["manageStudent"], newOne)

            return { previous }
        },
        onError: (_error, _variables, onMutateResult, context) => {
            context.client.setQueryData(["manageStudent"], onMutateResult?.previous)
        },
        onSettled: (_data, _error, _variables, _onMutateResult, context) => {
            context.client.invalidateQueries({ queryKey: ["manageStudent"] })
        },
    })

    const onSubmit = (data: Schema) => {
        postMutation.mutate(data)
        reset()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Labeled isInDanger={Boolean(errors.classroom_name)}>
                <Hstack>
                    <Input
                        {...register("classroom_name")}
                        isRed={Boolean(errors.classroom_name)}
                        name="classroom_name"
                        placeholder="새 반 이름"
                        className="grow"
                    />
                    <Button color="green">
                        <Plus />
                    </Button>
                </Hstack>
                <Labeled.Footer>{errors.classroom_name?.message}</Labeled.Footer>
            </Labeled>
        </form>
    )
}

export default NewClassroomForm
