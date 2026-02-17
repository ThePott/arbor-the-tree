import type { ReviewAssignmentResponseData } from "@/features/_sidebar.review._assignment.assignment/loader"
import ColumnWithBoxes from "../ColumnWithBoxes"
import AssignmentSession from "./AssignmentSession"

type AssignmentColumnProps = { assignmentData: ReviewAssignmentResponseData }
const AssignmentColumn = ({ assignmentData }: AssignmentColumnProps) => {
    return (
        <ColumnWithBoxes>
            <ColumnWithBoxes.Title>오답 과제</ColumnWithBoxes.Title>
            <ColumnWithBoxes.Content>
                {assignmentData.map((assignmentMetaInfo) => (
                    <AssignmentSession key={assignmentMetaInfo.id} assignmentMetaInfo={assignmentMetaInfo} />
                ))}
            </ColumnWithBoxes.Content>
        </ColumnWithBoxes>
    )
}

export default AssignmentColumn
