import BookListContent from "@/features/book/BookListContent"
import BookListSkeleton from "@/features/book/BookListSkeleton"
import { withHeadInstance } from "@/packages/api/axiosInstances"
import { useQuery } from "@tanstack/react-query"

const BookListPage = () => {
    const { data, isPending } = useQuery({
        queryKey: ["book"],
        queryFn: async () => (await withHeadInstance.get("/book")).data,
    })

    if (isPending) return <BookListSkeleton />

    return <BookListContent bookArray={data} />
}

export default BookListPage
