import OutletContainer from "@/features/_sidebar._assigned/components/OutletContainer"
import SyllabusSidebar from "@/features/_sidebar._assigned/components/SyllabusSidebar"
import { Outlet } from "@tanstack/react-router"

const ReviewCheckLayout = () => {
    return (
        <>
            <SyllabusSidebar>
                <SyllabusSidebar.ButtonGroup>
                    <SyllabusSidebar.ButtonMany />
                </SyllabusSidebar.ButtonGroup>
            </SyllabusSidebar>

            <OutletContainer forWhat="rest">
                <Outlet />
            </OutletContainer>
        </>
    )
}

export default ReviewCheckLayout
