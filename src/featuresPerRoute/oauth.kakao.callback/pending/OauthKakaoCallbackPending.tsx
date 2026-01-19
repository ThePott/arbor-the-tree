import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import { debugRender } from "@/shared/config/debug/debug"

const OauthKakaoCallbackPending = () => {
    debugRender("OauthKakaoCallbackPending")
    // TODO: 좀 더 예쁘게 꾸며야
    // NOTE: color=black 제대로 안 보인다
    return (
        <Container isPadded>
            <RoundBox radius="lg" isShadowed color="black" padding="xl">
                카카오로 로그인 중이에요
            </RoundBox>
        </Container>
    )
}

export default OauthKakaoCallbackPending
