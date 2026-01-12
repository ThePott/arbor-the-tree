import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/manage/delete")({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/manage/delete"!</div>
}
