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
        onSuccess: (_data, _variables, _onMutationResult, context) => {
            setModalKey("success")
            context.client.invalidateQueries({ queryKey: ["me"] })
        },
    })

    return profileMutation
}

export default useProfileMutation
