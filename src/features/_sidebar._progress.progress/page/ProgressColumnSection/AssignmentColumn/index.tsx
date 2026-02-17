import ColumnWithBoxes from "../ColumnWithBoxes"
import AssignmentSession from "./AssignmentSession"

const AssignmentColumn = () => {
    return (
        <ColumnWithBoxes>
            <ColumnWithBoxes.Title>오답 과제</ColumnWithBoxes.Title>
            <ColumnWithBoxes.Content>
                <AssignmentSession />
                <AssignmentSession />
                <AssignmentSession />
                <AssignmentSession />
            </ColumnWithBoxes.Content>
        </ColumnWithBoxes>
    )
}

export default AssignmentColumn
