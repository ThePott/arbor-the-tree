import { useEffect } from "react"
import { useSearchParams } from "react-router"
import kakaoLogin from "./Header/LoginButton/_kakaoLoginApi"
import { useMutation } from "@tanstack/react-query"
import useGlobalStore from "@/shared/store/globalStore"

const useOAuth = () => {
    const isPendingLogin = useGlobalStore((state) => state.isPendingLogin)
    const setIsPendingLogin = useGlobalStore((state) => state.setIsPendingLogin)
    const [searchParams, _setSearchParams] = useSearchParams()
    const code = searchParams.get("code")

    const { isPending: isPendingKakao, mutate } = useMutation({
        // NOTE: Must unwrap before use
        mutationFn: () => kakaoLogin(code!),
    })

    useEffect(() => {
        if (!code) {
            return
        }
        mutate()
    }, [code])

    useEffect(() => {
        if (isPendingKakao === isPendingLogin) {
            return
        }
        setIsPendingLogin(isPendingKakao)
    }, [isPendingKakao])
}

export default useOAuth
