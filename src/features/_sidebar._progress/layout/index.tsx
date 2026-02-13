import SidebarSection from "@/features/_sidebar/components"
import { Outlet } from "@tanstack/react-router"
import ProgressSyllabusAssignedButton from "./ProgressSyllabusAssignedButton"
import SyllabusForm from "./SyllabusForm"

const ProgressSidebar = () => {
    return (
        <>
            <SidebarSection>
                <SidebarSection.ClassroomSidebar />
                <SidebarSection.SyllabusSidebar syllabusAssignedButton={ProgressSyllabusAssignedButton}>
                    <SyllabusForm />
                </SidebarSection.SyllabusSidebar>
            </SidebarSection>

            <Outlet />
        </>
    )
}

export default ProgressSidebar
