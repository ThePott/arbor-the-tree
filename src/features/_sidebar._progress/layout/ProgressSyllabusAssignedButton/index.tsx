import type { AssignedJoinedSyllabus } from "@/features/_sidebar._progress.progress/types"
import SyllabusAssignedButton from "@/features/_sidebar/components/SyllabusSidebar/SyllabusAssignedButton"
import SyllabusAssignedDeleteButton from "./SyllabusAssignedDeleteButton"

type ProgressSyllabusAssignedButtonProps = {
    assignedJoinedSyllabus: AssignedJoinedSyllabus | null
}
const ProgressSyllabusAssignedButton = ({ assignedJoinedSyllabus }: ProgressSyllabusAssignedButtonProps) => {
    return (
        <SyllabusAssignedButton assignedJoinedSyllabus={assignedJoinedSyllabus}>
            <SyllabusAssignedDeleteButton assignedJoinedSyllabus={assignedJoinedSyllabus} />
        </SyllabusAssignedButton>
    )
}

export default ProgressSyllabusAssignedButton
