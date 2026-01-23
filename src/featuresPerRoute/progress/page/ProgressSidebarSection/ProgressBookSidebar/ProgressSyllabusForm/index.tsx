import type { AssignedJoinedSyllabus } from "@/featuresPerRoute/progress/loader"
import Button from "@/packages/components/Button/Button"
import Labeled from "@/packages/components/Labeled/Labeled"
import { Hstack } from "@/packages/components/layouts"
import LocalAutoComplete from "@/packages/components/LocalAutoComplete"
import { ClientError } from "@/shared/error/clientError"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import type { ValueLabel } from "@/shared/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
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
    const { student_id, classroom_id } = route.useSearch()
    const optionArray: ValueLabel[] = extendedSyllabusArray.map((extendedSyllabus) => ({
        value: extendedSyllabus.id,
        label: extendedSyllabus.book.title,
    }))

    const postMutation = useSimpleMutation({
        method: "post",
        url: "/progress/syllabus/assigned",
        queryKey: ["progressSyllabusAssigned", { student_id, classroom_id }],
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
                    created_at: "",
                    book_id: "",
                    book: { id: "", title: book_title, published_year: 2000 },
                },
            },
        ],
    })

    const schema = z.object({
        book_title: z
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
        const syllabus_id = optionArray.find((option) => option.label === data.book_title)?.value
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

        postMutation.mutate({ body, additionalData: data.book_title })
    }

    const isFormVisible = Boolean((classroom_id && !student_id) || (!classroom_id && student_id))
    if (!isFormVisible) return null

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Labeled isInDanger={Boolean(errors.book_title)}>
                <Hstack gap="xs">
                    <Controller
                        control={control}
                        name="book_title"
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
                <Labeled.Footer>{errors.book_title?.message}</Labeled.Footer>
            </Labeled>
        </form>
    )
}

export default ProgressBookForm
