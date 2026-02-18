import SidebarSection from "@/features/_sidebar/components"
import { Outlet } from "@tanstack/react-router"
import SyllabusForm from "./SyllabusForm"

const ProgressSidebar = () => {
    return (
        <>
            <SidebarSection>
                <SidebarSection.ClassroomSidebar />
                <SidebarSection.SyllabusSidebar>
                    <SyllabusForm />
                    <SidebarSection.SyllabusSidebar.ButtonGroup>
                        <SidebarSection.SyllabusSidebar.AllButton />
                        <SidebarSection.SyllabusSidebar.ButtonMany isDeletable />
                    </SidebarSection.SyllabusSidebar.ButtonGroup>
                </SidebarSection.SyllabusSidebar>
            </SidebarSection>

            <Outlet />
        </>
    )
}

export default ProgressSidebar
