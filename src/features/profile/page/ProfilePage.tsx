import { headlessInstance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import ExpandableDiv from "@/packages/components/ExpandableDiv/ExpendableDiv"
import Labeled from "@/packages/components/Labeled/Labeled"
import { FlexOneContainer, Vstack } from "@/packages/components/layouts"
import LocalAutoComplete from "@/packages/components/LocalAutoComplete"
import Select from "@/packages/components/Select/Select"
import ResponsiveContainer from "@/shared/components/ResponsiveContainer"
import type { Hagwon, Role, School, ValueLabel } from "@/shared/interfaces"
import useGlobalStore from "@/shared/store/globalStore"
import { roleToText } from "@/shared/utils/apiTypeToLabel"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { useLoaderData } from "@tanstack/react-router"
import { Activity } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import z from "zod/v3"
import { authMeQueryOptions } from "../loader/profileLoaderFn"
import useProfileMutation from "./_useProfileMutation"
import ProfileModalFail from "./ProfileModalFail"
import ProfileModalSuccess from "./ProfileModalSuccess"

const ProfilePage = () => {
    const storedData = useGlobalStore((state) => state.me)
    const { me: loaderData } = useLoaderData({ from: "/profile" })
    const { data: queryData } = useQuery(authMeQueryOptions)

    const me = queryData ?? loaderData ?? storedData

    const { data: hagwonOptionArray } = useQuery({
        queryKey: ["hagwon"],
        queryFn: async () => {
            const response = await headlessInstance.get(`/hagwon`)
            const hagwonArray = response.data
            const hagwonOptionArray: ValueLabel[] = hagwonArray.map((hagwon: Hagwon) => ({
                value: hagwon.id,
                label: hagwon.name,
            }))
            return hagwonOptionArray
        },
    })
    const { data: schoolOptionArray } = useQuery({
        queryKey: ["school"],
        queryFn: async () => {
            const response = await headlessInstance.get(`/school`)
            const hagwonArray = response.data
            const hagwonOptionArray: ValueLabel[] = hagwonArray.map((school: School) => ({
                value: school.id,
                label: school.name,
            }))
            return hagwonOptionArray
        },
    })
    // TODO:
    const profileSchema = z
        .object({
            name: z.string().min(1, "이름을 입력하세요"),
            phone_number: z.string().min(1, "핸드폰 번호를 입력하세요"),
            role: z.preprocess((val) => (val ? val : ""), z.string().min(1, "권한을 선택해주세요")),
            hagwon: z.preprocess((val) => (val ? val : ""), z.string().min(1, "학원 이름을 입력해주세요")),
            school: z.string().nullish(),
        })
        .refine(
            ({ role, hagwon }) => {
                if (role === "PRINCIPAL" || role === "MAINTAINER") return true
                const hagwonNameArray = hagwonOptionArray?.map(({ label }) => label) ?? []
                return hagwonNameArray.includes(hagwon)
            },
            { message: "목록 중의 학원을 선택해주세요", path: ["hagwon"] }
        )
        .refine(
            ({ role, school }) => {
                if (role === "STUDENT" && !school) return false
                return true
            },
            { message: "학교 이름을 입력해주세요", path: ["school"] }
        )
    type ProfileSchema = z.input<typeof profileSchema>
    const { mutate, isPending } = useProfileMutation<ProfileSchema>()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ resolver: zodResolver(profileSchema) })
    const role = useWatch({ name: "role", control }) as Role | null
    const onSubmit = (data: ProfileSchema) => {
        mutate(data)
    }

    if (!me) return

    const defaultRole: Role | undefined = me.resume?.role ?? me?.role
    const defaultHagwon: string | undefined = me.resume?.hagwon_name ?? me.additional_info.hagwon_name ?? undefined
    const defaultSchool: string | undefined = me.resume?.school_name ?? me.additional_info.school_name ?? undefined
    const defaultOption = defaultRole ? { value: defaultRole, label: roleToText[defaultRole] } : undefined

    return (
        <>
            <FlexOneContainer isYScrollable className="h-full [scrollbar-gutter:stable]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ResponsiveContainer width="md">
                        <Vstack gap="lg">
                            <Labeled isRequired isInDanger={Boolean(errors.name)}>
                                <Labeled.Header>이름</Labeled.Header>
                                <Labeled.Input {...register("name")} defaultValue={me.name} disabled={isPending} />
                                <Labeled.Footer>{errors.name?.message}</Labeled.Footer>
                            </Labeled>
                            <Labeled isRequired isInDanger={Boolean(errors.phone_number)}>
                                <Labeled.Header>핸드폰 번호</Labeled.Header>
                                <Labeled.Input
                                    {...register("phone_number")}
                                    defaultValue={me.phone_number}
                                    disabled={isPending}
                                />
                                <Labeled.Footer>{errors.phone_number?.message}</Labeled.Footer>
                            </Labeled>
                            <Labeled isRequired isInDanger={Boolean(errors.role)}>
                                <Labeled.Header>권한</Labeled.Header>
                                <Controller
                                    control={control}
                                    name="role"
                                    render={({ field: { onChange } }) => (
                                        <Select
                                            disabled={isPending}
                                            onOptionSelect={onChange}
                                            isInDanger={Boolean(errors.role)}
                                            defaultOption={defaultOption}
                                        >
                                            <Select.Trigger>권한을 선택해주세요</Select.Trigger>
                                            <Select.Content>
                                                <Select.Option value="STUDENT">학생</Select.Option>
                                                <Select.Option value="PARENT" isDisabled>
                                                    학부모
                                                </Select.Option>
                                                <Select.Option value="HELPER">실장</Select.Option>
                                                <Select.Option value="PRINCIPAL">원장</Select.Option>
                                            </Select.Content>
                                        </Select>
                                    )}
                                />
                                <Labeled.Footer>{errors.role?.message}</Labeled.Footer>
                            </Labeled>

                            {role && (
                                <Labeled isRequired isInDanger={Boolean(errors.hagwon)}>
                                    <Labeled.Header>학원</Labeled.Header>
                                    <Controller
                                        control={control}
                                        name="hagwon"
                                        render={({ field: { onChange }, fieldState: { error } }) => (
                                            <LocalAutoComplete
                                                placeholder=""
                                                isRed={Boolean(error)}
                                                onChange={onChange}
                                                optionArray={hagwonOptionArray ?? []}
                                                defaultValue={defaultHagwon}
                                                disabled={isPending}
                                                isWidthMatching
                                            />
                                        )}
                                    />
                                    <Labeled.Footer>{errors.hagwon?.message}</Labeled.Footer>
                                </Labeled>
                            )}

                            <ExpandableDiv>
                                <Activity mode={role === "STUDENT" ? "visible" : "hidden"}>
                                    <Labeled isRequired isInDanger={Boolean(errors.school)}>
                                        <Labeled.Header>학교</Labeled.Header>
                                        <Controller
                                            control={control}
                                            name="school"
                                            render={({ field: { onChange }, fieldState: { error } }) => (
                                                <LocalAutoComplete
                                                    isRed={Boolean(error)}
                                                    onChange={onChange}
                                                    optionArray={schoolOptionArray ?? []}
                                                    placeholder=""
                                                    defaultValue={defaultSchool}
                                                    disabled={isPending}
                                                    isWidthMatching
                                                />
                                            )}
                                        />
                                        <Labeled.Footer>{errors.school?.message}</Labeled.Footer>
                                    </Labeled>
                                </Activity>
                            </ExpandableDiv>

                            <Button color="bg1" isShadowed status={isPending ? "pending" : "enabled"}>
                                저장
                            </Button>
                        </Vstack>
                    </ResponsiveContainer>
                </form>
            </FlexOneContainer>
            <ProfileModalSuccess role={role} />
            <ProfileModalFail />
        </>
    )
}

export default ProfilePage
