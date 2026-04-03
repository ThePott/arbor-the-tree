import LoginPage from "@/features/login/page/LoginPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/test/login")({
    component: LoginPage,
})
