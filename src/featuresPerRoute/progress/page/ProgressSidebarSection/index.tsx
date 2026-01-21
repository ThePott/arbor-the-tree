import { Hstack } from "@/packages/components/layouts"
import ProgressBookSidebar from "./ProgressBookSidebar"
import ProgressStudentSidebar from "./ProgressStudentSidebar"

const ProgressSidebarSection = () => {
    return (
        <Hstack className="border-r border-r-border-dim p-my-lg">
            <ProgressStudentSidebar />
            <ProgressBookSidebar />
        </Hstack>
    )
}

export default ProgressSidebarSection
