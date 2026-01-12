import useBookListStore from "@/features/book/_bookListStore"
import { withHeadInstance } from "@/packages/api/axiosInstances"
import type { Book } from "@/shared/interfaces"
import type { QueryClient } from "@tanstack/react-query"

type BookListLoaderFnProps = { queryClient: QueryClient }
const bookListLoaderFn = async ({ queryClient }: BookListLoaderFnProps) => {
    const response = await queryClient.ensureQueryData({
        queryKey: ["book"],
        queryFn: async () => await withHeadInstance.get("/book"),
    })
    const bookArray = response.data as Book[]
    useBookListStore.getState().setBookArray(bookArray)
}

export default bookListLoaderFn
