import LoginPage from "@/featuresPerRoute/login/page/LoginPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/login")({
    component: LoginPage,
})
