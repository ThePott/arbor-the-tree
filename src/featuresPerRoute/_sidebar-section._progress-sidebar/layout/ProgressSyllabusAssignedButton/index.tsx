import type { AssignedJoinedSyllabus } from "@/featuresPerRoute/_sidebar-section._progress-sidebar.progress/types"
import SyllabusAssignedButton from "@/featuresPerRoute/_sidebar-section/components/SyllabusSidebar/SyllabusAssignedButton"
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
