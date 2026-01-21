import Button from "@/packages/components/Button/Button"
import Labeled from "@/packages/components/Labeled/Labeled"
import { Hstack, Vstack } from "@/packages/components/layouts"
import LocalAutoComplete from "@/packages/components/LocalAutoComplete"
import Title from "@/packages/components/Title/Title"
import { ClientError } from "@/shared/error/clientError"
import type { ValueLabel } from "@/shared/interfaces"
import { zodResolver } from "@hookform/resolvers/zod"
import { getRouteApi, useLoaderData } from "@tanstack/react-router"
import { Plus } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import z from "zod/v3"

const route = getRouteApi("/progress/")

const ProgressBookSidebar = () => {
    const { studentArray, classroomArray, bookArray } = useLoaderData({ from: "/progress/" })
    const { student: studentInParams, classroom: classroomInParams } = route.useSearch()

    const classroom = classroomArray.find((el) => el.id === classroomInParams)
    const student = studentArray.find((el) => el.id === studentInParams)
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

    const onSubmit = (data: Schema) => {
        const book_id = optionArray.find((option) => option.label === data.book_title)?.value
        if (!book_id) throw ClientError.Unexpected("문제집을 못 찾았어요")
    }

    return (
        <Vstack>
            <Title as="h3">{title}</Title>
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
        </Vstack>
    )
}

export default ProgressBookSidebar
