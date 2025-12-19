import { headlessInstance } from "@/packages/api/axiosInstances"
import type { Me } from "@/shared/interfaces"
import useGlobalStore from "@/shared/store/globalStore"

const kakaoLogin = async (code: string) => {
    const accessTokenResponse = await headlessInstance.post("/auth/kakao/code-to-token", { code })
    const { access_token } = accessTokenResponse.data
    const meResponse = await headlessInstance.post("/auth/kakao/me", { access_token })
    const kakaoMe = meResponse.data as Me

    useGlobalStore.getState().setMe(kakaoMe)
    useGlobalStore.getState().setAccessToken(access_token)
}

export default kakaoLogin
