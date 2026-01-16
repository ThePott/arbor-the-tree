import { isAxiosApiError } from "@/shared/error/DefaultErrorComponent/typeguard"
import useGlobalStore from "@/shared/store/globalStore"
import { checkEnvVar } from "@/shared/utils/checkEnvVar"
import axios from "axios"

const baseURL = checkEnvVar(import.meta.env.VITE_BASE_URL)

// NOTE: do not export
const headOnlyInstance = axios.create({ baseURL, withCredentials: true })
headOnlyInstance.interceptors.request.use((config) => {
    const accessToken = useGlobalStore.getState().accessToken
    if (!accessToken) {
        return config
    }

    config.headers.Authorization = `Bearer ${accessToken}`
    return config
})

const headlessInstance = axios.create({ baseURL, withCredentials: true })

const instance = axios.create({ baseURL, withCredentials: true })
instance.interceptors.request.use((config) => {
    const accessToken = useGlobalStore.getState().accessToken
    if (!accessToken) {
        return config
    }

    config.headers.Authorization = `Bearer ${accessToken}`
    return config
})
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (!isAxiosApiError(error) || error.response?.data.code === "ACCESS_TOKEN_EXPIRED") {
            return Promise.reject(error)
        }

        const state = useGlobalStore.getState()
        const refreshToken = state.refreshToken
        const setAccessToken = state.setAccessToken
        const setRefreshToken = state.setRefreshToken
        const logout = state.logout

        if (!refreshToken || !error.config) return Promise.reject(error)

        try {
            // NOTE: MUST USE HEADLESS in withHead's interceptor
            const response = await headlessInstance.post("/auth/refresh", { refresh_token: refreshToken })
            const { access_token, refresh_token } = response.data
            setAccessToken(access_token)
            setRefreshToken(refresh_token)

            await headOnlyInstance.request(error.config)
        } catch {
            // NOTE: expired refresh token -> logout
            logout()
            return Promise.reject(error)
        }
    }
)

export { headlessInstance, instance }
