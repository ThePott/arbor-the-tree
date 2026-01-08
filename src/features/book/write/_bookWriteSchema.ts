import z from "zod/v3"

export const bookWriteSchema = z.object({
    title: z.string().min(1, "제목을 입력하세요"),
    published_year: z.preprocess(
        (val) => Number(val),
        z
            .number()
            .min(2000, "2000년 이후로만 등록할 수 있습니다")
            .max(new Date().getFullYear() + 1, `${new Date().getFullYear()}년까지만 등록할 수 있습니다`)
    ),
})

export type BookWriteSchema = z.infer<typeof bookWriteSchema>
