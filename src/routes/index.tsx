import LandingPage from "@/features/landing/page/LandingPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
    component: LandingPage,
})
