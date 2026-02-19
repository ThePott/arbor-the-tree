import useProgressStore from "@/features/_sidebar._progress.progress/store"
import type { AssignedJoinedSyllabus } from "@/features/_sidebar._progress.progress/types"
import { getRouteApi, useLocation, useNavigate } from "@tanstack/react-router"
import SidebarButton from "../SidebarButton"

const route = getRouteApi("/_sidebar")

export type SyllabusAssignedButtonProps = {
    assignedJoinedSyllabus: AssignedJoinedSyllabus | null
    isDeletable?: boolean
}
// TODO: 이거 이용해서 삭제 버튼을 넣었을텐데 없어졌다
const SyllabusAssignedButton = ({ assignedJoinedSyllabus, isDeletable }: SyllabusAssignedButtonProps) => {
    const setModalKey = useProgressStore((state) => state.setModalKey)
    const setSelectedSyllabus = useProgressStore((state) => state.setSelectedSyllabus)

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const searchParams = route.useSearch()
    const { is_assignment: _, ...rest } = searchParams
    const { classroom_id, student_id } = searchParams

    const handleBodyClick = () => {
        navigate({ to: pathname, search: { ...rest, syllabus_id: assignedJoinedSyllabus?.syllabus.id } })
    }
    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation()
        setSelectedSyllabus(assignedJoinedSyllabus)
        setModalKey("deleteAssginedSyllabus")
    }

    const isSelected = searchParams.syllabus_id === assignedJoinedSyllabus?.syllabus.id

    return (
        <SidebarButton isSelected={isSelected} onClick={handleBodyClick}>
            <SidebarButton.TextSection>
                <p>{assignedJoinedSyllabus ? assignedJoinedSyllabus.syllabus.book.title : "전체"}</p>
                <p className="text-fg-dim text-my-xs">{assignedJoinedSyllabus?.syllabus.created_at.slice(0, 10)}</p>
            </SidebarButton.TextSection>
            {isDeletable && assignedJoinedSyllabus && Boolean(classroom_id) !== Boolean(student_id) && (
                <SidebarButton.XButton onClick={handleDeleteClick} />
            )}
        </SidebarButton>
    )
}

export default SyllabusAssignedButton
