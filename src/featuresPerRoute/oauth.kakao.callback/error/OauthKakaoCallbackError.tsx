import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import { debugRender } from "@/shared/config/debug/debug"

const OauthKakaoCallbackError = () => {
    debugRender("OauthKakaoCallbackError")
    return (
        <Container isPadded>
            <RoundBox radius="lg" isShadowed color="black" padding="xl">
                카카로 로그인에 실패했어요
            </RoundBox>
        </Container>
    )
}

export default OauthKakaoCallbackError
