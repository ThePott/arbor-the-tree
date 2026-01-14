import { instance } from "@/packages/api/axiosInstances"
import { useMutation } from "@tanstack/react-query"
import type { ProfileSchema } from "./_profileSchema"

const useProfileMutation = () => {
    const profileMutation = useMutation({
        mutationFn: (body: ProfileSchema & { id: number }) => instance.patch("/auth/me", body),
    })

    return profileMutation
}

export default useProfileMutation
