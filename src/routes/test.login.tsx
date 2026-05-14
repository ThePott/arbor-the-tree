import TestLoginPage from "@/features/test.login/page"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/test/login")({
    component: TestLoginPage,
})
