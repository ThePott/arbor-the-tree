import { Hstack } from "@/packages/components/layouts"
import { Outlet } from "@tanstack/react-router"
import ClassroomSidebar from "../components/ClassroomSidebar"

const SidebarSectionLayout = () => {
    return (
        <Hstack gap="none" className="w-full h-full overflow-hidden">
            <ClassroomSidebar />
            <Outlet />
        </Hstack>
    )
}

export default SidebarSectionLayout
