import OutletContainer from "@/features/_sidebar._assigned/components/OutletContainer"
import { Vstack } from "@/packages/components/layouts"
import Skeleton from "@/packages/components/Skeleton"
import { Outlet } from "@tanstack/react-router"

const SidebarAssignedProgressPending = () => {
    return (
        <>
            <Vstack className="w-[240px] py-my-lg pl-my-md">
                <Skeleton widthInPixel={120} heightInPixel={24} />
                <Skeleton heightInPixel={42} />
                <Skeleton heightInPixel={60} />
                <Skeleton heightInPixel={60} />
            </Vstack>

            <OutletContainer forWhat="progress">
                <Outlet />
            </OutletContainer>
        </>
    )
}

export default SidebarAssignedProgressPending
