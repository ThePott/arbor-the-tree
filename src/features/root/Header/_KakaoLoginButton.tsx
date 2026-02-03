import KakaoIcon from "@/assets/kakao.svg"
import Loader from "@/packages/components/Loader/Loader"
import { Hstack } from "@/packages/components/layouts"
import { debugRender } from "@/shared/config/debug/"
import useGlobalStore from "@/shared/store/globalStore"
import { checkEnvVar } from "@/shared/utils/checkEnvVar"
import { cva } from "class-variance-authority"

const kakaoButtonVariants = cva("rounded-my-sm shadow-my-sm  px-3 py-2 my-transition", {
    variants: {
        isPendingLogin: {
            false: "cursor-pointer bg-[#FEE500] hover:bg-[#edd400] active:bg-[#ddc400] text-black/85",
            true: "bg-[#FEE500]/60 text-black/60",
        },
    },
})

const KakaoLoginButton = () => {
    debugRender("KakaoLoginButton")
    const isPendingLogin = useGlobalStore((state) => state.isPendingLogin)

    const handleClick = () => {
        window.location.href = `${checkEnvVar(import.meta.env.VITE_KAKAO_URL)}?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`
    }

    return (
        <button className={kakaoButtonVariants({ isPendingLogin })} disabled={isPendingLogin} onClick={handleClick}>
            <Hstack className="items-center">
                {isPendingLogin && <Loader />}
                {!isPendingLogin && <img src={KakaoIcon} className="h-4" />}
                <p className="text-black/85">카카오로 로그인</p>
            </Hstack>
        </button>
    )
}

export default KakaoLoginButton
