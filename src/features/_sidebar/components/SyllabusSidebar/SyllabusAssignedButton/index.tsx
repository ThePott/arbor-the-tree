import useProgressStore from "@/features/_sidebar._progress.progress/store"
import type { AssignedJoinedSyllabus } from "@/features/_sidebar._progress.progress/types"
import Button from "@/packages/components/Button/Button"
import { Hstack, Vstack } from "@/packages/components/layouts"
import { getRouteApi, useLocation, useNavigate } from "@tanstack/react-router"
import { X } from "lucide-react"

const route = getRouteApi("/_sidebar")

export type SyllabusAssignedButtonProps = {
    assignedJoinedSyllabus: AssignedJoinedSyllabus | null
}
// TODO: 이거 이용해서 삭제 버튼을 넣었을텐데 없어졌다
const SyllabusAssignedButton = ({ assignedJoinedSyllabus }: SyllabusAssignedButtonProps) => {
    const setModalKey = useProgressStore((state) => state.setModalKey)
    const setSelectedSyllabus = useProgressStore((state) => state.setSelectedSyllabus)

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const searchParams = route.useSearch()
    const { classroom_id, student_id } = searchParams

    const handleBodyClick = () => {
        navigate({ to: pathname, search: { ...searchParams, syllabus_id: assignedJoinedSyllabus?.syllabus.id } })
    }
    const handleDeleteClick = () => {
        setModalKey("deleteAssginedSyllabus")
        setSelectedSyllabus(assignedJoinedSyllabus)
    }

    const isSelected = searchParams.syllabus_id === assignedJoinedSyllabus?.syllabus.id

    return (
        <Button
            as="div"
            border="onHover"
            color={isSelected ? "bg2" : "transparent"}
            isOnLeft
            onClick={handleBodyClick}
            className="grow"
        >
            <Hstack className="w-full items-center">
                <Vstack gap="none" className="grow">
                    <p>{assignedJoinedSyllabus ? assignedJoinedSyllabus.syllabus.book.title : "전체"}</p>
                    <p className="text-fg-dim text-my-xs">{assignedJoinedSyllabus?.syllabus.created_at.slice(0, 10)}</p>
                </Vstack>
                {assignedJoinedSyllabus && Boolean(classroom_id) !== Boolean(student_id) && (
                    <Button padding="tight" border="onHover" color="transparent" onClick={handleDeleteClick}>
                        <X size={16} />
                    </Button>
                )}
            </Hstack>
        </Button>
    )
}

export default SyllabusAssignedButton
