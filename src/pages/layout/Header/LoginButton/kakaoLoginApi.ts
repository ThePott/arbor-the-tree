import { headlessInstance } from "@/packages/api/axiosInstances"

const kakaoLogin = async (code: string) => {
    const accessTokenResponse = await headlessInstance.post("/auth/kakao/code-to-token", { code })
    const { access_token } = accessTokenResponse.data
    const meResponse = await headlessInstance.post("/auth/kakao/me", { access_token })
    const kakaoMe = meResponse.data
    // TODO: 이걸 스토어에 등록해야 함... <- access, refresh, me 어떻게 클라이언트에서 관리할지 고민해야

    // NOTE: THIS IS TEMPORARY
    return kakaoMe
}

export default kakaoLogin
