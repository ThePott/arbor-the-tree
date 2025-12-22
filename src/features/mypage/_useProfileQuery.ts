import { withHeadInstance } from "@/packages/api/axiosInstances"
import useGlobalStore from "@/shared/store/globalStore"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

const useProfileQuery = () => {
    const me = useGlobalStore((state) => state.me)
    const setResume = useGlobalStore((state) => state.setResume)
    const { data } = useQuery({
        queryKey: ["me"],
        queryFn: async () => withHeadInstance.get(`/auth/me/${me?.id}`),
    })

    useEffect(() => {
        if (!data) return

        // TODO: 확장된 me를 받은 다음 이걸 me에 저장해야겠지
        const { result: _result, resume } = data.data
        setResume(resume)
    }, [data])
}

export default useProfileQuery
