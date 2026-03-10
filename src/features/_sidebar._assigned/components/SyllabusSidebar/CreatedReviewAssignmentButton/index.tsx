import { getRouteApi, useLoaderData, useLocation, useNavigate } from "@tanstack/react-router"
import SidebarButton from "../SidebarButton"

const route = getRouteApi("/_sidebar")
const CreatedReviewAssignmentButton = () => {
    const searchParams = route.useSearch()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { is_assignment, syllabus_id: _, ...rest } = searchParams
    const loaderData = useLoaderData({ from: "/_sidebar/_assigned" })
    const assignmentMetaInfoArray = loaderData?.assignmentMetaInfoArray ?? []

    const handleClick = () => {
        navigate({
            to: pathname,
            search: {
                ...rest,
                is_assignment: true,
            },
        })
    }

    return (
        <SidebarButton onClick={handleClick} isSelected={Boolean(is_assignment)}>
            <SidebarButton.TextSection>
                <p>오답 과제</p>
                <p className="text-fg-dim text-my-xs">{`${assignmentMetaInfoArray.length} 묶음`}</p>
            </SidebarButton.TextSection>
        </SidebarButton>
    )
}

export default CreatedReviewAssignmentButton
