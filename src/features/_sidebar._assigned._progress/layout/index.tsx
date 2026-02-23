import SyllabusSidebar from "@/features/_sidebar._assigned/components/SyllabusSidebar"
import { FlexOneContainer } from "@/packages/components/layouts"
import { Outlet } from "@tanstack/react-router"
import SyllabusForm from "./SyllabusForm"

const ProgressSidebar = () => {
    return (
        <>
            <SyllabusSidebar>
                <SyllabusForm />
                <SyllabusSidebar.ButtonGroup>
                    <SyllabusSidebar.AllButton />
                    <SyllabusSidebar.ButtonMany isDeletable />
                </SyllabusSidebar.ButtonGroup>
            </SyllabusSidebar>

            <FlexOneContainer isXScrollable className="border-l border-l-border-dim h-full pt-my-lg pl-my-lg">
                <Outlet />
            </FlexOneContainer>
        </>
    )
}

export default ProgressSidebar
