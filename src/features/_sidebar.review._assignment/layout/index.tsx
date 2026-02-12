import { FlexOneContainer } from "@/packages/components/layouts"
import { Outlet } from "@tanstack/react-router"

const ReviewAssignmentLayout = () => {
    return (
        <>
            <p>this is assignment sidebar placeholder</p>
            <FlexOneContainer isYScrollable>
                <Outlet />
            </FlexOneContainer>
        </>
    )
}

export default ReviewAssignmentLayout
