import bookListLoaderFn from "@/features/book/loader/bookListLoaderFn"
import BookListPage from "@/features/book/page/BookListPage"
import BookListPending from "@/features/book/pending/BookListPending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/book/")({
    component: BookListPage,
    pendingComponent: BookListPending,
    loader: async ({ context: { queryClient } }) => bookListLoaderFn({ queryClient }),
})
