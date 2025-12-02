import Button from "@/packages/components/Button"
import { checkEnvVar } from "@/shared/utils/checkEnvVar"
import { useEffect } from "react"
import { useSearchParams } from "react-router"
import kakaoLogin from "./kakaoLoginApi"

const KakaoLoginButton = () => {
    const [searchParams, _setSearchParams] = useSearchParams()
    const code = searchParams.get("code")
    const handleClick = () => {
        window.location.href = `${checkEnvVar(import.meta.env.VITE_KAKAO_URL)}?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`
    }

    useEffect(() => {
        if (!code) {
            return
        }
        kakaoLogin(code)
    }, [code])
    return (
        <Button isWide onClick={handleClick}>
            카카오로 로그인
        </Button>
    )
}

export default KakaoLoginButton
