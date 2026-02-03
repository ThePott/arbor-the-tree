import SyllabusAssignedButton from "@/featuresPerRoute/_sidebar-section/components/SyllabusSidebar/SyllabusAssignedButton"
import type { AssignedJoinedSyllabus } from "@/featuresPerRoute/progress/types"
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
