import { instance } from "@/packages/api/axiosInstances"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import useBookListStore from "./_bookListStore"

const useBookListMutation = () => {
    const setModalKey = useBookListStore((state) => state.setModalKey)
    const queryClient = useQueryClient()
    const deleteMutation = useMutation({
        mutationFn: ({ id }: { id: string }) => instance.delete(`/book/${id}`),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["book"] })
            setModalKey(null)
        },
    })

    return { deleteMutation }
}

export default useBookListMutation
