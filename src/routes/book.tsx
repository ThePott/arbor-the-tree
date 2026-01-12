import bookListLoaderFn from "@/featuresPerRoute/book/loader/bookListLoaderFn"
import BookListPage from "@/featuresPerRoute/book/page/BookListPage"
import BookListPending from "@/featuresPerRoute/book/pending/BookListPending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/book")({
    component: BookListPage,
    pendingComponent: BookListPending,
    loader: async ({ context: { queryClient } }) => bookListLoaderFn({ queryClient }),
})
