import LandingPage from "@/featuresPerRoute/landing/page/LandingPage"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
    component: LandingPage,
})
