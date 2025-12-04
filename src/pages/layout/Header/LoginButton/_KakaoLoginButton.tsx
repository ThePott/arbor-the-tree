import Button from "@/packages/components/Button/Button"
import { checkEnvVar } from "@/shared/utils/checkEnvVar"

const KakaoLoginButton = () => {
    const handleClick = () => {
        window.location.href = `${checkEnvVar(import.meta.env.VITE_KAKAO_URL)}?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`
    }
    return (
        <Button isWide onClick={handleClick}>
            카카오로 로그인
        </Button>
    )
}

export default KakaoLoginButton
