import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/manage/resume")({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/manage/resume"!</div>
}
