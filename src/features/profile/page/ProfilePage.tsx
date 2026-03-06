import Button from "@/packages/components/Button/Button"
import ExpandableDiv from "@/packages/components/ExpandableDiv/ExpendableDiv"
import Labeled from "@/packages/components/Labeled/Labeled"
import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Select from "@/packages/components/Select/Select"
import { debugForm, debugRender } from "@/shared/config/debug/"
import type { Role } from "@/shared/interfaces"
import useGlobalStore from "@/shared/store/globalStore"
import { roleToText } from "@/shared/utils/apiTypeToLabel"
import useMediaQuery from "@/shared/utils/use-media-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { Activity, useState, type ReactNode } from "react"
import { Controller, useForm, type FieldValues } from "react-hook-form"
import HagwonAutoComplete from "./_HagwonAutoComplete"
import { profileSchema, type ProfileSchema } from "./_profileSchema"
import SchoolAutoComplete from "./_SchoolAutoComplete"
import useProfileMutation from "./_useProfileMutation"
import useProfileQuery from "./_useProfileQuery"

type ProfileContainerProps = {
    isBig: boolean
    children: ReactNode
}
const ProfileContainer = ({ isBig, children }: ProfileContainerProps) => {
    if (!isBig) return <RoundBox padding="xl">{children}</RoundBox>

    return (
        <Container width="md" isPadded>
            <RoundBox isShadowed padding="xl" color="bg0" radius="lg">
                {children}
            </RoundBox>
        </Container>
    )
}

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
    const { isBig } = useMediaQuery()

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
            <ProfileContainer isBig={isBig}>
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
                                        disabled={isPending}
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
                                            disabled={isPending}
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
                </Vstack>
            </ProfileContainer>
        </form>
    )
}

export default ProfilePage
