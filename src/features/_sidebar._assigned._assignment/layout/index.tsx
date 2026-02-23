import { FlexOneContainer } from "@/packages/components/layouts"
import { Outlet } from "@tanstack/react-router"

const ReviewAssignmentLayout = () => {
    return (
        <FlexOneContainer isYScrollable>
            <Outlet />
        </FlexOneContainer>
    )
}

export default ReviewAssignmentLayout
