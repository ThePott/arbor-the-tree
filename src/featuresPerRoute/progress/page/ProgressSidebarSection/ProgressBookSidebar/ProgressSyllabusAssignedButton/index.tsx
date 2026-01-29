import useProgressStore from "@/featuresPerRoute/progress/store"
import type { AssignedJoinedSyllabus } from "@/featuresPerRoute/progress/types"
import Button from "@/packages/components/Button/Button"
import { Hstack, Vstack } from "@/packages/components/layouts"
import { getRouteApi, useNavigate } from "@tanstack/react-router"
import { X } from "lucide-react"

const route = getRouteApi("/progress/")

type ProgressSyllabusAssignedButtonProps = {
    assignedJoinedSyllabus: AssignedJoinedSyllabus | null
}
const ProgressSyllabusAssignedButton = ({ assignedJoinedSyllabus }: ProgressSyllabusAssignedButtonProps) => {
    const navigate = useNavigate({ from: "/progress/" })
    const searchParams = route.useSearch()

    const setModalKey = useProgressStore((state) => state.setModalKey)
    const setSelectedSyllabus = useProgressStore((state) => state.setSelectedSyllabus)

    const handleBodyClick = () => {
        navigate({ search: { ...searchParams, syllabus_id: assignedJoinedSyllabus?.syllabus.id } })
    }
    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation()
        setSelectedSyllabus(assignedJoinedSyllabus)
        setModalKey("deleteAssginedSyllabus")
    }

    const isDeleteButtonVisible =
        Boolean(searchParams.classroom_id) !== Boolean(searchParams.student_id) && assignedJoinedSyllabus?.syllabus.id

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

                {isDeleteButtonVisible && (
                    <Button color="black" isBorderedOnHover onClick={handleDeleteClick}>
                        <X size={16} />
                    </Button>
                )}
            </Hstack>
        </Button>
    )
}

export default ProgressSyllabusAssignedButton
