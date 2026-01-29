import type { AssignedJoinedSyllabus } from "@/featuresPerRoute/progress/types"
import Button from "@/packages/components/Button/Button"
import Labeled from "@/packages/components/Labeled/Labeled"
import { Hstack } from "@/packages/components/layouts"
import LocalAutoComplete from "@/packages/components/LocalAutoComplete"
import { ClientError } from "@/shared/error/clientError"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { getRouteApi, useLoaderData } from "@tanstack/react-router"
import { Plus } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import z from "zod/v3"

type PostBody = {
    syllabus_id: string
    classroom_id?: string
    student_id?: string
}

const route = getRouteApi("/progress/")
const ProgressBookForm = () => {
    const { extendedSyllabusArray } = useLoaderData({ from: "/progress/" })
    const queryClient = useQueryClient()
    const { student_id, classroom_id } = route.useSearch()
    const params = { student_id, classroom_id }
    const data = queryClient.getQueryData(["progressSyllabusAssigned", { student_id, classroom_id }]) as
        | AssignedJoinedSyllabus[]
        | null

    const assignedSyllabusIdArray: string[] = data ? data.map((joinedSyllabus) => joinedSyllabus.syllabus_id) : []
    const optionArray = extendedSyllabusArray
        .filter((syllabus) => !assignedSyllabusIdArray.includes(syllabus.id))
        .map((extendedSyllabus) => ({
            value: extendedSyllabus.id,
            label: `${extendedSyllabus.book.title}, ${extendedSyllabus.created_at.slice(0, 10)}`,
        }))

    // TODO: 양쪽의 query를 동시에 무효화해야 한다
    // TODO: 복잡한데??
    // NOTE: invalidate "progressSyllabusAssigned" with params, "progressSession" with params
    const postMutation = useSimpleMutation({
        method: "post",
        url: "/progress/syllabus/assigned",
        queryKeyWithoutParams: ["progressSyllabusAssigned"],
        additionalInvalidatingQueryKeyArray: [["progressSession", params]],
        params: { classroom_id, student_id },
        update: ({
            previous,
            additionalData: book_title,
        }: {
            previous: AssignedJoinedSyllabus[]
            additionalData: string
        }) => [
            ...previous,
            {
                id: "",
                completed_at: "",
                syllabus_id: "",
                syllabus: {
                    user_id: "",
                    id: "",
                    created_at: new Date().toISOString(),
                    book_id: "",
                    book: { id: "", title: book_title, published_year: 2000 },
                },
            },
        ],
    })

    const schema = z.object({
        syllabusInfo: z
            .string()
            .min(1, "문제집 제목을 입력해주세요")
            .refine(
                (value) => optionArray.find((option) => option.label === value),
                "등록된 문제집 제목을 입력해주세요"
            ),
    })
    type Schema = z.input<typeof schema>
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: zodResolver(schema),
    })
    const onSubmit = (data: Schema) => {
        const syllabus_id = optionArray.find((option) => option.label === data.syllabusInfo)?.value
        if (!syllabus_id) throw ClientError.Unexpected("문제집을 못 찾았어요")

        const body: PostBody = classroom_id
            ? {
                  syllabus_id,
                  classroom_id,
              }
            : {
                  syllabus_id,
                  student_id,
              }

        postMutation.mutate({ body, additionalData: data.syllabusInfo.split(",")[0] })
    }

    const isFormVisible = Boolean((classroom_id && !student_id) || (!classroom_id && student_id))
    if (!isFormVisible) return null

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Labeled isInDanger={Boolean(errors.syllabusInfo)}>
                <Hstack gap="xs">
                    <Controller
                        control={control}
                        name="syllabusInfo"
                        render={({ field: { onChange } }) => (
                            <LocalAutoComplete
                                optionArray={optionArray}
                                isRed={false}
                                onChange={onChange}
                                placeholder="문제집 이름"
                            />
                        )}
                    />
                    <Button color="green">
                        <Plus />
                    </Button>
                </Hstack>
                <Labeled.Footer>{errors.syllabusInfo?.message}</Labeled.Footer>
            </Labeled>
        </form>
    )
}

export default ProgressBookForm
