import { headlessInstance } from "@/packages/api/axiosInstances"
import type { Me } from "@/shared/interfaces"
import useGlobalStore from "@/shared/store/globalStore"
import { redirect } from "@tanstack/react-router"

type OauthKakaoCallbakLoaderFnProps = {
    code: string | undefined
}
type ResponseData = {
    me: Me
    access_token: string
    refresh_token: string
}
const oauthKakaoCallbakLoaderFn = async ({ code }: OauthKakaoCallbakLoaderFnProps) => {
    if (!code) throw redirect({ to: "/" })

    const accessTokenResponse = await headlessInstance.post("/auth/kakao/code-to-token", { code })
    const { kakao_access_token } = accessTokenResponse.data
    const response = await headlessInstance.post("/auth/kakao/me", { kakao_access_token })
    const { access_token, refresh_token, me } = response.data as ResponseData

    useGlobalStore.getState().setMe(me)
    useGlobalStore.getState().setAccessToken(access_token)
    useGlobalStore.getState().setRefreshToken(refresh_token)

    throw redirect({ to: "/" })
}

export default oauthKakaoCallbakLoaderFn
