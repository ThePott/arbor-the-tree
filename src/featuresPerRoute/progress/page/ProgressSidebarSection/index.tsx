import { Hstack } from "@/packages/components/layouts"
import ProgressSyllabusSidebar from "./ProgressBookSidebar"
import ProgressStudentSidebar from "./ProgressStudentSidebar"

const ProgressSidebarSection = () => {
    return (
        <Hstack className="border-r border-r-border-dim">
            <ProgressStudentSidebar />
            <ProgressSyllabusSidebar />
        </Hstack>
    )
}

export default ProgressSidebarSection
