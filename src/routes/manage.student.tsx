import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/manage/student")({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/manage/student"!</div>
}
