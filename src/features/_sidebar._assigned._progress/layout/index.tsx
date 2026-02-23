import SyllabusSidebar from "@/features/_sidebar._assigned/components/SyllabusSidebar"
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

            <Outlet />
        </>
    )
}

export default ProgressSidebar
