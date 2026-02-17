import type { ReviewAssignmentMetaInfo } from "@/features/_sidebar.review._assignment.assignment/type"
import RoundBox from "@/packages/components/RoundBox"

type AssignmentSessionProps = { assignmentMetaInfo: ReviewAssignmentMetaInfo }
const AssignmentSession = ({ assignmentMetaInfo }: AssignmentSessionProps) => {
    // NOTE: 오답과제도 오늘, 숙제, 해제가 가능해야겠지...
    // NOTE: 그렇다면 오늘, 숙제 컴포넌트를 일반화해야겠네...
    // NOTE: TodayHomeworkBox
    return (
        <RoundBox isBordered padding="xl">
            <p>1일 전(2025-12-12) __14문제</p>
            <p>- 이런 문제집</p>
            <p>- 저런 문제집</p>
            <p>{JSON.stringify(assignmentMetaInfo)}</p>
        </RoundBox>
    )
}

export default AssignmentSession
