import SidebarSection from "@/features/_sidebar/components"
import { FlexOneContainer } from "@/packages/components/layouts"
import { Outlet } from "@tanstack/react-router"

const ReviewAssignmentLayout = () => {
    return (
        <>
            <SidebarSection>
                <SidebarSection.ClassroomSidebar />
            </SidebarSection>

            <FlexOneContainer isYScrollable>
                <Outlet />
            </FlexOneContainer>
        </>
    )
}

export default ReviewAssignmentLayout
