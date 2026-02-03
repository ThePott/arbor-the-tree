import { Outlet } from "@tanstack/react-router"
import ReviewCheckClassroomSidebar from "./ReviewCheckClassroomSidebar"
import ReviewCheckSyllabusSidebar from "./ReviewCheckSyllabusSidebar"

const ReviewCheckSidebarLayout = () => {
    return (
        <>
            <ReviewCheckClassroomSidebar />
            <ReviewCheckSyllabusSidebar />
            <Outlet />
        </>
    )
}

export default ReviewCheckSidebarLayout
