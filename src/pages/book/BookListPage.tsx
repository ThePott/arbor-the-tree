import useBookListStore from "@/features/book/_bookListStore"
import BookListContent from "@/features/book/BookListContent"
import BookListSkeleton from "@/features/book/BookListSkeleton"
import { withHeadInstance } from "@/packages/api/axiosInstances"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

const BookListPage = () => {
    const selectedTab = useBookListStore((state) => state.selectedTab)
    const bookArray = useBookListStore((state) => state.bookArray)
    const setBookArray = useBookListStore((state) => state.setBookArray)
    const params = { activity: selectedTab.value }
    const setIsPending = useBookListStore((state) => state.setIsPending)

    const { data, isPending } = useQuery({
        queryKey: ["book", selectedTab.value],
        queryFn: async () => (await withHeadInstance.get("/book", { params })).data,
    })

    useEffect(() => {
        if (!data) return

        setBookArray(data)
    }, [data])

    useEffect(() => {
        setIsPending(isPending)
    }, [isPending])

    if (isPending && bookArray.length === 0) {
        return <BookListSkeleton />
    }

    return <BookListContent />
}

export default BookListPage
