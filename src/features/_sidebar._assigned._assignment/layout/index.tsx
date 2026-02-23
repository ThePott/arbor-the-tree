import { FlexOneContainer } from "@/packages/components/layouts"
import { Outlet } from "@tanstack/react-router"

const ReviewAssignmentLayout = () => {
    return (
        <FlexOneContainer isYScrollable className="border-l border-l-border-dim">
            <Outlet />
        </FlexOneContainer>
    )
}

export default ReviewAssignmentLayout
