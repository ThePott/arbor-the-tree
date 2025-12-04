import Button from "@/packages/components/Button/Button"
import Labeled from "@/packages/components/Labeled/Labeled"
import { Vstack, GridContainer } from "@/packages/components/layouts"
import Container from "@/packages/components/layouts/_Container"
import RoundBox from "@/packages/components/RoundBox"
import Select from "@/packages/components/Select/Select"
import useGlobalStore from "@/shared/store/globalStore"

const MypageContent = () => {
    const me = useGlobalStore((state) => state.me)

    return (
        <Container isPadded>
            <RoundBox isShadowed padding="xl" color="bg2">
                <Vstack>
                    <Labeled>
                        <Labeled.Header>권한</Labeled.Header>
                        <Select onOptionSelect={() => {}}>
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
                        <Labeled.Header>이름</Labeled.Header>
                        <Labeled.Input />
                        <Labeled.Footer>여기에 에러를 적습니다</Labeled.Footer>
                    </Labeled>
                    <Labeled>
                        <Labeled.Header>이름</Labeled.Header>
                        <Labeled.Input />
                        <Labeled.Footer>여기에 에러를 적습니다</Labeled.Footer>
                    </Labeled>
                    <h1 className="text-my-lg font-semibold">마이페이지</h1>
                    <GridContainer>{JSON.stringify(me)}</GridContainer>
                    <Button color="red">회원 탈퇴</Button>
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default MypageContent
