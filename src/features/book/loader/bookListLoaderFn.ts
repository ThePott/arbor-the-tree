import { instance } from "@/packages/api/axiosInstances"
import type { Book } from "@/shared/interfaces"
import type { QueryClient } from "@tanstack/react-query"

export const bookQueryOptions = {
    queryKey: ["book"],
    queryFn: async () => {
        const response = await instance.get("/book")
        return response.data as Book[]
    },
}

type BookListLoaderFnProps = { queryClient: QueryClient }
const bookListLoaderFn = async ({ queryClient }: BookListLoaderFnProps) => {
    const bookArray = await queryClient.ensureQueryData(bookQueryOptions)
    return { bookArray }
}

export default bookListLoaderFn
