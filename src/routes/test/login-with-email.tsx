import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/test/login-with-email")({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/test/login-with-email"!</div>
}
