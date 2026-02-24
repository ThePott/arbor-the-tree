import type { ExtendedReviewAssignmentQuestion } from "@/features/_sidebar._assigned._check.check/types"
import Checkbox from "../../flatItemComponents/Checkbox"

type AssignmentQuestionProps = {
    assignmentQuestion: ExtendedReviewAssignmentQuestion
}

const AssignmentQuestion = ({ assignmentQuestion }: AssignmentQuestionProps) => {
    return (
        <Checkbox
            onClick={() => {}}
            session_status={assignmentQuestion.session_status}
            recent="no"
            review_check_status_visual={assignmentQuestion.review_check_status_visual}
        >
            {assignmentQuestion.order}
        </Checkbox>
    )
}

export default AssignmentQuestion
