import type { ReviewAssignmentMetaInfo } from "@/features/_sidebar.review._assignment.assignment/type"
import StatusCompletenessBox from "../../ColumnWithBoxes/StatusCompletenessBox"

type AssignmentSessionProps = { assignmentMetaInfo: ReviewAssignmentMetaInfo }
const AssignmentSession = ({ assignmentMetaInfo }: AssignmentSessionProps) => {
    // NOTE: 오답과제도 오늘, 숙제, 해제가 가능해야겠지...
    // NOTE: 그렇다면 오늘, 숙제 컴포넌트를 일반화해야겠네...
    // NOTE: TodayHomeworkBox
    return (
        <StatusCompletenessBox isCompleted={false} status="default" isOld={false} onClick={() => {}}>
            <StatusCompletenessBox.LabelGroup>
                <StatusCompletenessBox.Label role="main">{"whatever"}</StatusCompletenessBox.Label>
            </StatusCompletenessBox.LabelGroup>
            <p>{JSON.stringify(assignmentMetaInfo)}</p>
        </StatusCompletenessBox>
    )
}

export default AssignmentSession
