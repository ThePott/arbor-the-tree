import { headlessInstance } from "@/packages/api/axiosInstances"
import type { Me } from "@/shared/interfaces"
import useGlobalStore from "@/shared/store/globalStore"
import { redirect } from "@tanstack/react-router"

type OauthKakaoCallbakLoaderFnProps = {
    code: string | undefined
}
const oauthKakaoCallbakLoaderFn = async ({ code }: OauthKakaoCallbakLoaderFnProps) => {
    if (!code) throw redirect({ to: "/" })

    const accessTokenResponse = await headlessInstance.post("/auth/kakao/code-to-token", { code })
    const { access_token } = accessTokenResponse.data
    const meResponse = await headlessInstance.post("/auth/kakao/me", { access_token })
    const kakaoMe = meResponse.data as Me

    useGlobalStore.getState().setMe(kakaoMe)
    useGlobalStore.getState().setAccessToken(access_token)

    throw redirect({ to: "/" })
}

export default oauthKakaoCallbakLoaderFn
