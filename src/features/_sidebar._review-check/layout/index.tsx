import SidebarSection from "@/features/_sidebar/components"
import { FlexOneContainer } from "@/packages/components/layouts"
import { Outlet } from "@tanstack/react-router"

const ReviewCheckSidebarLayout = () => {
    return (
        <>
            <SidebarSection>
                <SidebarSection.ClassroomSidebar />
                <SidebarSection.SyllabusSidebar />
            </SidebarSection>

            <FlexOneContainer isYScrollable>
                <Outlet />
            </FlexOneContainer>
        </>
    )
}

export default ReviewCheckSidebarLayout
