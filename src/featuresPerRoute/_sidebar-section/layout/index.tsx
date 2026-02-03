import { Hstack } from "@/packages/components/layouts"
import { Outlet } from "@tanstack/react-router"
import ClassroomSidebar from "./ClassroomSidebar"
import SyllabusSidebar from "./SyllabusSidebar"

const SidebarSectionLayout = () => {
    return (
        <Hstack className="h-full" gap="none">
            <ClassroomSidebar />
            <SyllabusSidebar />
            <Outlet />
        </Hstack>
    )
}

export default SidebarSectionLayout
