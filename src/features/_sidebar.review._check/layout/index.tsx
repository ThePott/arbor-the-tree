import SidebarSection from "@/features/_sidebar/components"
import { FlexOneContainer } from "@/packages/components/layouts"
import { Outlet } from "@tanstack/react-router"

const ReviewCheckLayout = () => {
    return (
        <>
            <SidebarSection>
                <SidebarSection.ClassroomSidebar />
                <SidebarSection.SyllabusSidebar>
                    <SidebarSection.SyllabusSidebar.ButtonGroup>
                        <SidebarSection.SyllabusSidebar.ButtonMany />
                    </SidebarSection.SyllabusSidebar.ButtonGroup>
                </SidebarSection.SyllabusSidebar>
            </SidebarSection>

            <FlexOneContainer isYScrollable>
                <Outlet />
            </FlexOneContainer>
        </>
    )
}

export default ReviewCheckLayout
