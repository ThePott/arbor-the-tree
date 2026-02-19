import Button from "@/packages/components/Button/Button"
import { Hstack, Vstack } from "@/packages/components/layouts"
import { getRouteApi, useLoaderData, useLocation, useNavigate } from "@tanstack/react-router"

const route = getRouteApi("/_sidebar")
const CreatedReviewAssignmentButton = () => {
    const searchParams = route.useSearch()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { is_assignment, syllabus_id: _, ...rest } = searchParams
    const { assignmentMetaInfoArray } = useLoaderData({ from: "/_sidebar" })

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
        <Button
            as="div"
            border="onHover"
            color={is_assignment ? "bg2" : "transparent"}
            isOnLeft
            onClick={handleClick}
            className="grow"
        >
            <Hstack className="w-full items-center">
                <Vstack gap="none" className="grow">
                    <p>오답 과제</p>
                    <p className="text-fg-dim text-my-xs">{`${assignmentMetaInfoArray.length} 묶음`}</p>
                </Vstack>
            </Hstack>
        </Button>
    )
}

export default CreatedReviewAssignmentButton
