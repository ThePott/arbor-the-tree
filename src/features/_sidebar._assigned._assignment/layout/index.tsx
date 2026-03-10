import OutletContainer from "@/features/_sidebar._assigned/components/OutletContainer"
import { Outlet } from "@tanstack/react-router"

const ReviewAssignmentLayout = () => {
    return (
        <OutletContainer forWhat="rest">
            <Outlet />
        </OutletContainer>
    )
}

export default ReviewAssignmentLayout
