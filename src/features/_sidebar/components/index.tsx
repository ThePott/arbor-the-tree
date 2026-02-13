import { Hstack } from "@/packages/components/layouts"
import type { ReactNode } from "react"
import ClassroomSidebar from "./ClassroomSidebar"
import SyllabusSidebar from "./SyllabusSidebar"

type SidebarSectionProps = {
    children: ReactNode
}
const SidebarSection = ({ children }: SidebarSectionProps) => {
    return (
        <Hstack gap="none" className="border-r border-r-border-dim">
            {children}
        </Hstack>
    )
}

SidebarSection.ClassroomSidebar = ClassroomSidebar
SidebarSection.SyllabusSidebar = SyllabusSidebar

export default SidebarSection
