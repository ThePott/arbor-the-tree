import type { ApiError } from "@/shared/interfaces"
import { AxiosError } from "axios"

const isApiError = (data: unknown): data is ApiError => {
    return typeof data === "object" && data !== null && "code" in data && "message" in data
}

export const isAxiosApiError = (error: unknown): error is AxiosError<ApiError> => {
    return error instanceof AxiosError && isApiError(error.response?.data)
}
