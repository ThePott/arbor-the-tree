import SyllabusSidebar from "@/features/_sidebar._assigned/components/SyllabusSidebar"
import { FlexOneContainer } from "@/packages/components/layouts"
import { Outlet } from "@tanstack/react-router"

const ReviewCheckLayout = () => {
    return (
        <>
            <SyllabusSidebar>
                <SyllabusSidebar.ButtonGroup>
                    <SyllabusSidebar.ButtonMany />
                </SyllabusSidebar.ButtonGroup>
            </SyllabusSidebar>

            <FlexOneContainer isYScrollable>
                <Outlet />
            </FlexOneContainer>
        </>
    )
}

export default ReviewCheckLayout
