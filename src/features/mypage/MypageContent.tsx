import Button from "@/packages/components/Button/Button"
import Labeled from "@/packages/components/Labeled/Labeled"
import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Select from "@/packages/components/Select/Select"
import type { Role } from "@/shared/interfaces"
import { Activity, useState } from "react"
import { Controller, useForm, type FieldValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileSchema, type ProfileSchema } from "./_profileSchema"
import useProfileMutation from "./_useProfileMutation"
import useGlobalStore from "@/shared/store/globalStore"
import DropAnimation from "@/packages/components/motions/DropAnimation"
import ExpandableDiv from "@/packages/components/ExpandableDiv/ExpendableDiv"
import SchoolAutoComplete from "./_SchoolAutoComplete"

const MypageContent = () => {
    const [role, setRole] = useState<Role | null>(null)
    const me = useGlobalStore((state) => state.me)

    const { mutate, isPending } = useProfileMutation()

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ resolver: zodResolver(profileSchema) })

    if (!me) {
        return
    }

    const onSubmit = (data: FieldValues) => {
        const body = { ...data, id: me.id } as ProfileSchema & { id: number }
        mutate(body)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container width="md" isPadded>
                <DropAnimation>
                    <RoundBox isShadowed padding="xl" color="bg0" radius="lg">
                        <Vstack gap="lg">
                            <Labeled isRequired isInDanger={Boolean(errors.name)}>
                                <Labeled.Header>이름</Labeled.Header>
                                <Labeled.Input {...register("name")} />
                                <Labeled.Footer>{errors.name?.message}</Labeled.Footer>
                            </Labeled>
                            <Labeled isRequired isInDanger={Boolean(errors.phone_number)}>
                                <Labeled.Header>핸드폰 번호</Labeled.Header>
                                <Labeled.Input {...register("phone_number")} />
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
                                        >
                                            <Select.Trigger>권한을 선택해주세요</Select.Trigger>
                                            <Select.Content>
                                                <Select.Option value="STUDENT">학생</Select.Option>
                                                <Select.Option value="PARENT">학부모</Select.Option>
                                                <Select.Option value="HELPER">실장</Select.Option>
                                                <Select.Option value="PRINCIPAL">원장</Select.Option>
                                            </Select.Content>
                                        </Select>
                                    )}
                                />
                                <Labeled.Footer>{errors.role?.message}</Labeled.Footer>
                            </Labeled>
                            <Labeled isRequired isInDanger={Boolean(errors.hagwon)}>
                                <Labeled.Header>학원</Labeled.Header>
                                <Labeled.Input {...register("hagwon")} className="w-full" />
                                <Labeled.Footer>{errors.hagwon?.message}</Labeled.Footer>
                            </Labeled>

                            <ExpandableDiv>
                                <Activity mode={role === "STUDENT" ? "visible" : "hidden"}>
                                    <Labeled isRequired isInDanger={Boolean(errors.hagwon)}>
                                        <Labeled.Header>학교</Labeled.Header>
                                        <Controller
                                            control={control}
                                            name="school"
                                            render={({ field: { onChange } }) => (
                                                <SchoolAutoComplete onChange={onChange} />
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
                </DropAnimation>
            </Container>
        </form>
    )
}

export default MypageContent
