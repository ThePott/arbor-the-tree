import { instance } from "@/packages/api/axiosInstances"
import type { Book } from "@/shared/interfaces"
import type { QueryClient } from "@tanstack/react-query"
import useBookListStore from "../page/_bookListStore"

type BookListLoaderFnProps = { queryClient: QueryClient }
const bookListLoaderFn = async ({ queryClient }: BookListLoaderFnProps) => {
    const response = await queryClient.ensureQueryData({
        queryKey: ["book"],
        queryFn: async () => await instance.get("/book"),
    })
    const bookArray = response.data as Book[]
    useBookListStore.getState().setBookArray(bookArray)
    return { bookArray }
}

export default bookListLoaderFn
