import { Hstack } from "@/packages/components/layouts"
import { Outlet } from "@tanstack/react-router"

const SidebarSectionLayout = () => {
    return (
        <Hstack gap="none" className="w-full h-full">
            <Outlet />
        </Hstack>
    )
}

export default SidebarSectionLayout
