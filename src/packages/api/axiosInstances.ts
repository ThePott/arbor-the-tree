import useGlobalStore from "@/shared/store/globalStore"
import { checkEnvVar } from "@/shared/utils/checkEnvVar"
import axios from "axios"

const baseURL = checkEnvVar(import.meta.env.VITE_BASE_URL)

const headlessInstance = axios.create({ baseURL })

const withHeadInstance = axios.create({ baseURL })

withHeadInstance.interceptors.request.use((config) => {
    const accessToken = useGlobalStore.getState().accessToken
    if (!accessToken) {
        return config
    }

    config.headers.Authorization = `Bearer ${accessToken}`
    return config
})

withHeadInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error)
    }
)

export { headlessInstance, withHeadInstance }
