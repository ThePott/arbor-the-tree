import z from "zod/v3"

export const profileSchema = z.object({
    name: z.string().min(1, "이름을 입력하세요"),
    phone_number: z.string().min(1, "핸드폰 번호를 입력하세요"),
    role: z.preprocess((val) => (val ? val : ""), z.string().min(1, "권한을 선택해주세요")),
    hagwon: z.preprocess((val) => (val ? val : ""), z.string().min(1, "학원을 선택해주세요")),
    school: z.preprocess((val) => (val ? val : ""), z.string().min(1, "학교 이름을 입력해주세요")),
    children: z
        .array(
            z.object({
                childName: z.string(),
                childPhoneNumber: z.string(),
            })
        )
        .nullish(),
})

export type ProfileSchema = z.infer<typeof profileSchema>
