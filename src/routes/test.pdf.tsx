import TestPdfPage from "@/features/test.pdf/page"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/test/pdf")({
    component: TestPdfPage,
})
