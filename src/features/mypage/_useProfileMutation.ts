import { withHeadInstance } from "@/packages/api/axiosInstances"
import { useMutation } from "@tanstack/react-query"
import type { ProfileSchema } from "./_profileSchema"

const useProfileMutation = () => {
    const profileMutation = useMutation({
        mutationFn: (body: ProfileSchema & { id: number }) => withHeadInstance.patch("/auth/me", body),
    })

    return profileMutation
}

export default useProfileMutation
