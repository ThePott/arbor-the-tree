import { instance } from "@/packages/api/axiosInstances"
import type { Me } from "@/shared/interfaces"
import useGlobalStore from "@/shared/store/globalStore"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

const useProfileQuery = () => {
    const setMe = useGlobalStore((state) => state.setMe)
    const setResume = useGlobalStore((state) => state.setResume)
    const { data } = useQuery({
        queryKey: ["me"],
        queryFn: async () => instance.get(`/auth/me`),
    })

    useEffect(() => {
        if (!data) return

        // TODO: 확장된 me를 받은 다음 이걸 me에 저장해야겠지
        const { result, resume, additional_info } = data.data

        const newMe = { ...result, ...additional_info } as Me
        setMe(newMe)
        setResume(resume)
    }, [data])
}

export default useProfileQuery
