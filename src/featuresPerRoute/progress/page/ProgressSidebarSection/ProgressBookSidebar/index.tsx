import { instance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import Labeled from "@/packages/components/Labeled/Labeled"
import { Hstack, Vstack } from "@/packages/components/layouts"
import LocalAutoComplete from "@/packages/components/LocalAutoComplete"
import Title from "@/packages/components/Title/Title"
import { ClientError } from "@/shared/error/clientError"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import type { ValueLabel } from "@/shared/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getRouteApi, useLoaderData, useNavigate } from "@tanstack/react-router"
import { Plus, X } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import z from "zod/v3"

const route = getRouteApi("/progress/")

type PostBody = {
    book_id: string
    classroom_id?: string
    student_id?: string
}
type JoinedBook = {
    id: string
    classroom_id?: string
    student_id?: string
    book: {
        id: string
        title: string
        published_year: number
    }
}
type ProgressBookButtonProps = {
    joinedBook: JoinedBook | null
}
const ProgressBookButton = ({ joinedBook }: ProgressBookButtonProps) => {
    const navigate = useNavigate({ from: "/progress/" })
    const searchParams = route.useSearch()

    const deleteMutation = useSimpleMutation({
        method: "delete",
        url: `/progress/book/${joinedBook?.book.id}`,
        params: { student_id: joinedBook?.student_id, classroom_id: joinedBook?.classroom_id },
        queryKey: ["progressBook", { student_id: joinedBook?.student_id, classroom_id: joinedBook?.classroom_id }],
        update: (previous: JoinedBook[]) => previous.filter((el) => el.book.id !== joinedBook?.book.id),
    })

    const handleBodyClick = () => {
        navigate({ search: { ...searchParams, book_id: joinedBook?.book.id } })
    }
    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation()
        deleteMutation.mutate()
    }

    const isDeleteButtonVisible =
        Boolean(searchParams.classroom_id) !== Boolean(searchParams.student_id) && joinedBook?.book.id

    return (
        <Button isBorderedOnHover color="black" isOnLeft onClick={handleBodyClick} className="grow">
            <Hstack className="w-full">
                <p className="grow">{joinedBook ? joinedBook.book.title : "전체"}</p>

                {isDeleteButtonVisible && (
                    <Button color="black" isBorderedOnHover onClick={handleDeleteClick}>
                        <X size={16} />
                    </Button>
                )}
            </Hstack>
        </Button>
    )
}

const ProgressBookSidebar = () => {
    const { studentArray, classroomArray, bookArray } = useLoaderData({ from: "/progress/" })
    const { student_id, classroom_id } = route.useSearch()
    const { data } = useQuery({
        queryKey: ["progressBook", { classroom_id, student_id: classroom_id ? undefined : student_id }],
        queryFn: async () => {
            const response = await instance.get("/progress/book", {
                params: { classroom_id, student_id: classroom_id ? undefined : student_id },
            })
            return response.data as JoinedBook[]
        },
        enabled: Boolean(classroom_id || student_id),
    })

    const classroom = classroomArray.find((el) => el.id === classroom_id)
    const student = studentArray.find((el) => el.id === student_id)
    const title = [classroom?.name, student?.users.name].filter((value) => value).join(" / ")

    const optionArray: ValueLabel[] = bookArray.map((book) => ({ value: book.id, label: book.title }))

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

    const postMutation = useMutation({
        mutationFn: async ({ body, book_title: _book_title }: { body: PostBody; book_title: string }) =>
            await instance.post("/progress/book", body),
        onMutate: ({ book_title }, context) => {
            context.client.cancelQueries({ queryKey: ["progressBook", { student_id, classroom_id }] })
            const previous = context.client.getQueryData(["progressBook", { student_id, classroom_id }]) as JoinedBook[]
            const newJoinedBook = {
                id: "",
                book: {
                    id: "",
                    title: book_title,
                    published_year: 2000,
                },
            }
            const newData: JoinedBook[] = [...previous, newJoinedBook]
            context.client.setQueryData(["progressBook", { student_id, classroom_id }], newData)
            return { previous }
        },
        onError: (_error, _variables, onMutateResult, context) => {
            context.client.setQueryData(["progressBook", { student_id, classroom_id }], onMutateResult?.previous)
        },
        onSettled: (_data, _error, _vaiables, _onMutateResult, context) => {
            context.client.invalidateQueries({ queryKey: ["progressBook", { student_id, classroom_id }] })
        },
    })

    const onSubmit = (data: Schema) => {
        const book_id = optionArray.find((option) => option.label === data.book_title)?.value
        if (!book_id) throw ClientError.Unexpected("문제집을 못 찾았어요")

        const body: PostBody = classroom_id
            ? {
                  book_id,
                  classroom_id,
              }
            : {
                  book_id,
                  student_id,
              }

        postMutation.mutate({ body, book_title: data.book_title })
    }

    const isFormVisible = (classroom_id && !student_id) || (!classroom_id && student_id)

    if (!student_id && !classroom_id) return <p>학생 또는 반을 선택해주세요 ---- 이거 더 예쁘게 만들어야</p>
    return (
        <Vstack>
            <Title as="h3">{title}</Title>
            {isFormVisible && (
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
            )}

            <Vstack gap="none">
                {data && data.length > 0 && (
                    <>
                        <ProgressBookButton joinedBook={null} />
                        {data.map((joinedBook) => (
                            <ProgressBookButton key={joinedBook.id} joinedBook={joinedBook} />
                        ))}
                    </>
                )}
            </Vstack>
        </Vstack>
    )
}

export default ProgressBookSidebar
