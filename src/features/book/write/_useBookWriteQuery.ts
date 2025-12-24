import { withHeadInstance } from "@/packages/api/axiosInstances"
import { useQuery } from "@tanstack/react-query"
import useBookWriteStore from "./_bookWriteStore"
import { useEffect } from "react"

const useBookWriteQuery = () => {
    const setBookArray = useBookWriteStore((state) => state.setBookArray)
    const setIsPending = useBookWriteStore((state) => state.setIsPending)

    const params = { activity: "active" }
    const { data, isPending } = useQuery({
        queryKey: ["book", "active"],
        queryFn: async () => (await withHeadInstance.get("/book", { params })).data,
    })

    useEffect(() => {
        if (!data) return

        setBookArray(data)
    }, [data])

    useEffect(() => {
        setIsPending(isPending)
    }, [isPending])
}

export default useBookWriteQuery
