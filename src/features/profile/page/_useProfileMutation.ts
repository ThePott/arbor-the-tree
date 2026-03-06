import { instance } from "@/packages/api/axiosInstances"
import type { ApiError } from "@/shared/interfaces"
import { useMutation } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import useProfileStore from "../store"
import type { ProfileSchema } from "./_profileSchema"

const useProfileMutation = () => {
    const setMutationError = useProfileStore((state) => state.setMutationError)
    const setModalKey = useProfileStore((state) => state.setModalKey)
    const profileMutation = useMutation({
        mutationFn: (body: ProfileSchema & { id: number }) => instance.patch("/auth/me", body),
        onError: (error) => {
            setMutationError(error as AxiosError<ApiError>)
            setModalKey("fail")
        },
        onSuccess: () => {
            setModalKey("success")
        },
    })

    return profileMutation
}

export default useProfileMutation
