import BookWritePage from "@/featuresPerRoute/book.write/page/BookWritePage"
import BookWritePending from "@/featuresPerRoute/book.write/pending/BookWritePending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/book/write")({
    component: BookWritePage,
    pendingComponent: BookWritePending,
})
