import axios from "axios"

const headlessInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

export { headlessInstance }
