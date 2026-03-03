import type { AssignedJoinedSyllabus } from "@/features/_sidebar._assigned._progress.progress/types"
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

const route = getRouteApi("/_sidebar")
const SyllabusForm = () => {
    const { extendedSyllabusArray } = useLoaderData({ from: "/_sidebar/_assigned/_progress" })
    const queryClient = useQueryClient()
    const searchParams = route.useSearch()
    const { student_id, classroom_id } = searchParams
    const data = queryClient.getQueryData(["progressSyllabusAssigned", student_id, classroom_id]) as
        | AssignedJoinedSyllabus[]
        | null

    const assignedSyllabusIdArray: string[] = data ? data.map((joinedSyllabus) => joinedSyllabus.syllabus_id) : []
    const optionArray = extendedSyllabusArray
        .filter((syllabus) => !assignedSyllabusIdArray.includes(syllabus.id))
        .map((extendedSyllabus) => ({
            value: extendedSyllabus.id,
            label: `${extendedSyllabus.book.title}, ${extendedSyllabus.created_at.slice(0, 10)}`,
        }))

    const postMutation = useSimpleMutation({
        method: "post",
        url: "/progress/syllabus/assigned",
        // NOTE: 반, 혹은 학생에 부여된 실라버스 목록을 보여주는 것이니 개별 실라버스가 선택되었든 말든은 중요치 않다
        queryKey: ["progressSyllabusAssigned", classroom_id, student_id],
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
        additionalOnSetteled: (client) =>
            client.invalidateQueries({ queryKey: ["progressSession", classroom_id, student_id] }),
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

export default SyllabusForm
