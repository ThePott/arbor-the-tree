import type { AssignedJoinedSyllabus } from "@/features/_sidebar._progress.progress/types"
import Button from "@/packages/components/Button/Button"
import { Hstack, Vstack } from "@/packages/components/layouts"
import { getRouteApi, useLocation, useNavigate } from "@tanstack/react-router"
import type { ReactNode } from "react"

const route = getRouteApi("/_sidebar")

export type SyllabusAssignedButtonProps = {
    assignedJoinedSyllabus: AssignedJoinedSyllabus | null
    children?: ReactNode
}
const SyllabusAssignedButton = ({ assignedJoinedSyllabus, children }: SyllabusAssignedButtonProps) => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const searchParams = route.useSearch()

    const handleBodyClick = () => {
        navigate({ to: pathname, search: { ...searchParams, syllabus_id: assignedJoinedSyllabus?.syllabus.id } })
    }

    const isSelected = searchParams.syllabus_id === assignedJoinedSyllabus?.syllabus.id

    return (
        <Button
            as="div"
            isBorderedOnHover
            color={isSelected ? "bg2" : "black"}
            isOnLeft
            onClick={handleBodyClick}
            className="grow"
        >
            <Hstack className="w-full items-center">
                <Vstack gap="none" className="grow">
                    <p>{assignedJoinedSyllabus ? assignedJoinedSyllabus.syllabus.book.title : "전체"}</p>
                    <p className="text-fg-dim text-my-xs">{assignedJoinedSyllabus?.syllabus.created_at.slice(0, 10)}</p>
                </Vstack>
                {children}
            </Hstack>
        </Button>
    )
}

export default SyllabusAssignedButton
