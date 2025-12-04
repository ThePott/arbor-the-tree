import Button from "@/packages/components/Button"
import { GridContainer, Vstack } from "@/packages/components/layouts"
import Container from "@/packages/components/layouts/_Container"
import RoundBox from "@/packages/components/RoundBox"
import useGlobalStore from "@/shared/store/globalStore"
import { useEffect } from "react"
import { useNavigate } from "react-router"

const Mypage = () => {
    const me = useGlobalStore((state) => state.me)
    const navigate = useNavigate()

    useEffect(() => {
        if (me) {
            return
        }
        navigate("/", { replace: true })
    }, [me])
    return (
        <Container isPadded>
            <RoundBox isShadowed padding="xl" color="bg2">
                <Vstack>
                    <h1 className="text-my-lg font-semibold">마이페이지</h1>
                    <GridContainer>{JSON.stringify(me)}</GridContainer>
                    <Button color="red">회원 탈퇴</Button>
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default Mypage
