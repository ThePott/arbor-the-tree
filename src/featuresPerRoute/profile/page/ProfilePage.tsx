import Button from "@/packages/components/Button/Button"
import Labeled from "@/packages/components/Labeled/Labeled"
import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Select from "@/packages/components/Select/Select"
import { debugForm, debugRender } from "@/shared/config/debug/debug"
import type { Role } from "@/shared/interfaces"
import { Activity, useState } from "react"
import { Controller, useForm, type FieldValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileSchema, type ProfileSchema } from "./_profileSchema"
import useProfileMutation from "./_useProfileMutation"
import ExpandableDiv from "@/packages/components/ExpandableDiv/ExpendableDiv"
import SchoolAutoComplete from "./_SchoolAutoComplete"
import HagwonAutoComplete from "./_HagwonAutoComplete"
import useProfileQuery from "./_useProfileQuery"
import useGlobalStore from "@/shared/store/globalStore"
import { roleToText } from "@/shared/utils/apiTypeToLabel"

const ProfilePage = () => {
    debugRender("ProfilePage")
    const me = useGlobalStore((state) => state.me)
    const resume = useGlobalStore((state) => state.resume)
    const [role, setRole] = useState<Role | null>(resume?.role ?? me?.role ?? null)

    useProfileQuery()
    const { mutate, isPending } = useProfileMutation()
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        control,
        formState: { errors },
    } = useForm({ resolver: zodResolver(profileSchema) })

    if (!me) {
        return
    }

    const onSubmit = (data: FieldValues) => {
        debugForm("ProfilePage:onSubmit %o", data)
        const body = { ...data, id: me.id } as ProfileSchema & { id: number }
        mutate(body)
    }

    const defaultRole: Role | undefined = resume?.role ?? me?.role
    const defaultRoleInText: string | undefined = defaultRole ? roleToText[defaultRole] : undefined

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container width="md" isPadded>
                <RoundBox isShadowed padding="xl" color="bg0" radius="lg">
                    <Vstack gap="lg">
                        <Labeled isRequired isInDanger={Boolean(errors.name)}>
                            <Labeled.Header>이름</Labeled.Header>
                            <Labeled.Input {...register("name")} defaultValue={me.name} />
                            <Labeled.Footer>{errors.name?.message}</Labeled.Footer>
                        </Labeled>
                        <Labeled isRequired isInDanger={Boolean(errors.phone_number)}>
                            <Labeled.Header>핸드폰 번호</Labeled.Header>
                            <Labeled.Input {...register("phone_number")} defaultValue={me.phone_number} />
                            <Labeled.Footer>{errors.phone_number?.message}</Labeled.Footer>
                        </Labeled>
                        <Labeled isRequired isInDanger={Boolean(errors.role)}>
                            <Labeled.Header>권한</Labeled.Header>
                            <Controller
                                control={control}
                                name="role"
                                render={({ field: { onChange } }) => (
                                    <Select
                                        onOptionSelect={(value) => {
                                            setRole(value as Role)
                                            onChange(value)
                                        }}
                                        isInDanger={Boolean(errors.role)}
                                        defaultLabel={defaultRoleInText}
                                    >
                                        <Select.Trigger>권한을 선택해주세요</Select.Trigger>
                                        <Select.Content>
                                            <Select.Option value="STUDENT">학생</Select.Option>
                                            <Select.Option value="PARENT" isDisabled>
                                                학부모
                                            </Select.Option>
                                            <Select.Option value="HELPER" isDisabled>
                                                실장
                                            </Select.Option>
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
                                        <HagwonAutoComplete
                                            isForPrincipal={role === "PRINCIPAL"}
                                            onValueChange={onChange}
                                            onErrorChange={(innerError) => {
                                                if (innerError && error) return
                                                if (!innerError && !error) return

                                                if (innerError) {
                                                    setError("hagwon", innerError)
                                                    return
                                                }
                                                clearErrors("hagwon")
                                            }}
                                            error={error}
                                            defaultValue={resume?.hagwon_name}
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
                                            <SchoolAutoComplete
                                                onValueChange={onChange}
                                                onErrorChange={(innerError) => {
                                                    if (innerError && error) return
                                                    if (!innerError && !error) return

                                                    if (!innerError) {
                                                        clearErrors("school")
                                                        return
                                                    }

                                                    // NOTE: 나중에는 학교 API를 받아와서 할 거니까 이대로 하는 게 맞다
                                                    setError("school", innerError)
                                                }}
                                                error={error}
                                                defaultValue={resume?.school_name}
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
                        {/* <Button type="button" color="red"> */}
                        {/*     회원 탈퇴 */}
                        {/* </Button> */}
                    </Vstack>
                </RoundBox>
            </Container>
        </form>
    )
}

export default ProfilePage
