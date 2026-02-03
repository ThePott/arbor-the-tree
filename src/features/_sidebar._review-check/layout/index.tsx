import SidebarSection from "@/features/_sidebar/components"
import { Outlet } from "@tanstack/react-router"

const ReviewCheckSidebarLayout = () => {
    return (
        <>
            <SidebarSection>
                <SidebarSection.ClassroomSidebar />
                <SidebarSection.SyllabusSidebar />
            </SidebarSection>

            <Outlet />
        </>
    )
}

export default ReviewCheckSidebarLayout
