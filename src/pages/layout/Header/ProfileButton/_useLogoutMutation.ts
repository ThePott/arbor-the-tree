import { withHeadInstance } from "@/packages/api/axiosInstances"
import useGlobalStore from "@/shared/store/globalStore"
import { useMutation } from "@tanstack/react-query"

const logout = async () => {
    const state = useGlobalStore.getState()
    await withHeadInstance.post("/auth/kakao/logout")
    state.setAccessToken(null)
    state.setMe(null)
}

const useLogoutMutation = () => {
    const logoutMutation = useMutation({
        mutationFn: logout,
    })

    return logoutMutation
}

export default useLogoutMutation
