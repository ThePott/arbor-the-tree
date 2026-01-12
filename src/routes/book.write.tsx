import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/book/write")({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/book/write"!</div>
}
