import useProgressStore from "@/featuresPerRoute/progress/store"
import type { AssignedJoinedSyllabus } from "@/featuresPerRoute/progress/types"
import Button from "@/packages/components/Button/Button"
import { getRouteApi } from "@tanstack/react-router"
import { X } from "lucide-react"

const route = getRouteApi("/_sidebar-section")
// TODO: need to separate to progress
type SyllabusAssignedDeleteButtonProps = {
    assignedJoinedSyllabus: AssignedJoinedSyllabus | null
}
const SyllabusAssignedDeleteButton = ({ assignedJoinedSyllabus }: SyllabusAssignedDeleteButtonProps) => {
    const searchParams = route.useSearch()
    const setModalKey = useProgressStore((state) => state.setModalKey)
    const setSelectedSyllabus = useProgressStore((state) => state.setSelectedSyllabus)

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation()
        setSelectedSyllabus(assignedJoinedSyllabus)
        setModalKey("deleteAssginedSyllabus")
    }

    const isVisible =
        Boolean(searchParams.classroom_id) !== Boolean(searchParams.student_id) && assignedJoinedSyllabus?.syllabus.id

    if (!isVisible) return null
    return (
        <Button color="black" isBorderedOnHover onClick={handleDeleteClick}>
            <X size={16} />
        </Button>
    )
}

export default SyllabusAssignedDeleteButton
