import RootLayout from "@/features/root/RootLayout"
import type { RouterContext } from "@/main"
import { createRootRouteWithContext } from "@tanstack/react-router"

export const Route = createRootRouteWithContext<RouterContext>()({ component: RootLayout })
