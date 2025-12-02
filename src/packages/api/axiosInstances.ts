import { checkEnvVar } from "@/shared/utils/checkEnvVar"
import axios from "axios"

const headlessInstance = axios.create({
    baseURL: checkEnvVar(import.meta.env.VITE_BASE_URL),
})

export { headlessInstance }
