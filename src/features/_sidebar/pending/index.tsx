import { Hstack, Vstack } from "@/packages/components/layouts"
import Skeleton from "@/packages/components/Skeleton"
import { Outlet } from "@tanstack/react-router"

const SidebarPending = () => {
    return (
        <Hstack gap="none" className="w-full h-full overflow-hidden">
            <Vstack className="overflow-y-auto p-my-lg pr-0 w-[200px]" gap="sm">
                <Skeleton widthInPixel={120} heightInPixel={24} />
                <Skeleton heightInPixel={52} />
                <Skeleton heightInPixel={52} />
                <Skeleton heightInPixel={52} />
                <Skeleton heightInPixel={52} />
            </Vstack>
            <Outlet />
        </Hstack>
    )
}

export default SidebarPending
