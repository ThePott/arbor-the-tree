import BookWritePage from "@/features/book.write/page/BookWritePage"
import BookWritePending from "@/features/book.write/pending/BookWritePending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/book/write")({
    component: BookWritePage,
    pendingComponent: BookWritePending,
})
