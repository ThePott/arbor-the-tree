import Button from "@/packages/components/Button/Button"
import Labeled from "@/packages/components/Labeled/Labeled"
import { Vstack, GridContainer, Hstack } from "@/packages/components/layouts"
import Container from "@/packages/components/layouts/_Container"
import RoundBox from "@/packages/components/RoundBox"
import Select from "@/packages/components/Select/Select"
import type { Role } from "@/shared/interfaces"
import useGlobalStore from "@/shared/store/globalStore"
import { useState } from "react"
import ParentInputMany from "./_ParentInputMany"
import { Plus } from "lucide-react"

const MypageContent = () => {
    const me = useGlobalStore((state) => state.me)
    const [role, setRole] = useState<Role | null>(null)

    return (
        <Container isPadded>
            <RoundBox isShadowed padding="xl" color="bg2">
                <Vstack>
                    <Labeled>
                        <Labeled.Header>이름</Labeled.Header>
                        <Labeled.Input />
                        <Labeled.Footer>여기에 에러를 적습니다</Labeled.Footer>
                    </Labeled>
                    <Labeled>
                        <Labeled.Header>핸드폰 번호</Labeled.Header>
                        <Labeled.Input />
                        <Labeled.Footer>여기에 에러를 적습니다</Labeled.Footer>
                    </Labeled>
                    <Labeled>
                        <Labeled.Header>권한</Labeled.Header>
                        <Select onOptionSelect={(value) => setRole(value as Role)}>
                            <Select.Trigger>권한을 선택해주세요</Select.Trigger>
                            <Select.Content>
                                <Select.Option value="student">학생</Select.Option>
                                <Select.Option value="parent">학부모</Select.Option>
                                <Select.Option value="helper">실장</Select.Option>
                                <Select.Option value="principal">원장</Select.Option>
                            </Select.Content>
                        </Select>
                    </Labeled>
                    <Labeled>
                        <Labeled.Header>학원</Labeled.Header>
                        <Hstack>
                            <Labeled.Input className="w-full" />
                            {role === "principal" && (
                                <Button color="green" isShadowed>
                                    <Plus size={16} />
                                </Button>
                            )}
                        </Hstack>
                        <Labeled.Footer>여기에 에러를 적습니다</Labeled.Footer>
                    </Labeled>
                    {role === "parent" && <ParentInputMany />}
                    <Button color="red">회원 탈퇴</Button>
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default MypageContent
