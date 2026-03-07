import { instance } from "@/packages/api/axiosInstances"
import type { ApiError } from "@/shared/interfaces"
import { useMutation } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import useProfileStore from "../store"

const useProfileMutation = <TSchema>() => {
    const setMutationError = useProfileStore((state) => state.setMutationError)
    const setModalKey = useProfileStore((state) => state.setModalKey)
    const profileMutation = useMutation({
        mutationFn: (body: TSchema) => instance.patch("/auth/me", body),
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
