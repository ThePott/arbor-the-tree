import Button from "@/packages/components/Button/Button"
import Input from "@/packages/components/Input/Input"
import { Vstack, GridContainer } from "@/packages/components/layouts"
import Container from "@/packages/components/layouts/_Container"
import RoundBox from "@/packages/components/RoundBox"
import useGlobalStore from "@/shared/store/globalStore"

const MypageContent = () => {
    const me = useGlobalStore((state) => state.me)

    return (
        <Container isPadded>
            <RoundBox isShadowed padding="xl" color="bg2">
                <Vstack>
                    <Input />
                    <Input />
                    <Input />
                    <h1 className="text-my-lg font-semibold">마이페이지</h1>
                    <GridContainer>{JSON.stringify(me)}</GridContainer>
                    <Button color="red">회원 탈퇴</Button>
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default MypageContent
