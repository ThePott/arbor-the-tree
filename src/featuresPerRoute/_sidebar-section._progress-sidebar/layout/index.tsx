import SidebarSection from "@/featuresPerRoute/_sidebar-section/components"
import ProgressSyllabusAssignedButton from "./ProgressSyllabusAssignedButton"
import SyllabusForm from "./SyllabusForm"

const ProgressSidebar = () => {
    return (
        <SidebarSection>
            <SidebarSection.ClassroomSidebar />
            <SidebarSection.SyllabusSidebar SyllabusAssignedButton={ProgressSyllabusAssignedButton}>
                <SyllabusForm />
            </SidebarSection.SyllabusSidebar>
        </SidebarSection>
    )
}

export default ProgressSidebar
