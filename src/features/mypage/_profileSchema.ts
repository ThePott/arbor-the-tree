import z from "zod/v3"

export const profileSchema = z.object({
    name: z.string().min(1, "이름을 입력하세요"),
    phone_number: z.string().min(1, "비밀번호를 입력하세요"),
    role: z.string().min(1, "권한을 선택해주세요"),
    hagwon: z.string().nullish(),
    school: z.string().nullish(),
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
