import type { ReviewAssignmentResponseData } from "@/shared/queryOptions/reviewAssignmentQueryOptions"
import ColumnWithBoxes from "../ColumnWithBoxes"
import AssignmentSession from "./AssignmentSession"

type AssignmentColumnProps = { assignmentData: ReviewAssignmentResponseData }
const AssignmentColumn = ({ assignmentData }: AssignmentColumnProps) => {
    return (
        <ColumnWithBoxes>
            <ColumnWithBoxes.Title>오답 과제</ColumnWithBoxes.Title>
            <ColumnWithBoxes.Content>
                {assignmentData.map((assignmentWithMetaInfo) => (
                    <AssignmentSession
                        key={assignmentWithMetaInfo.id}
                        assignmentWithMetaInfo={assignmentWithMetaInfo}
                    />
                ))}
            </ColumnWithBoxes.Content>
        </ColumnWithBoxes>
    )
}

export default AssignmentColumn
