import { headlessInstance } from "@/packages/api/axiosInstances"

const kakaoLogin = async (code: string) => {
    const accessTokenResponse = await headlessInstance.post("/auth/kakao/code-to-token", { code })
    const { access_token } = accessTokenResponse.data
    const meResponse = await headlessInstance.post("/auth/kakao/me", { access_token })
    const kakaoMe = meResponse.data
    debugger
}

export default kakaoLogin
