import { useEffect } from "react"
import { useSearchParams } from "react-router"
import kakaoLogin from "./Header/LoginButton/_kakaoLoginApi"

const useOAuth = () => {
    const [searchParams, _setSearchParams] = useSearchParams()
    const code = searchParams.get("code")

    useEffect(() => {
        if (!code) {
            return
        }
        kakaoLogin(code)
    }, [code])
}

export default useOAuth
