import type { ReviewAssginmentQuestion } from "@/shared/interfaces"
import Checkbox from "../../flatItemComponents/Checkbox"

type AssignmentQuestionProps = {
    assignmentQuestion: ReviewAssginmentQuestion
}

const AssignmentQuestion = ({ assignmentQuestion }: AssignmentQuestionProps) => {
    //
    return (
        <Checkbox
            key={assignmentQuestion.id}
            onClick={() => {}}
            // TODO: 서버에서 받아와야
            session_status="HOMEWORK"
            // TODO: recent 어떻게 추적할지 고민해야
            recent="no"
            // TODO: 서버에서 받아와야 함
            review_check_status_visual={null}
        >
            오더
        </Checkbox>
    )
}

export default AssignmentQuestion
