import type { ReviewAssignmentMetaInfo } from "@/features/_sidebar.review._assignment.assignment/type"
import Button from "@/packages/components/Button/Button"
import Dropdown from "@/packages/components/Dropdown"
import { isSameDay, makeFromNow } from "@/shared/utils/dateManipulations"
import { Ellipsis } from "lucide-react"
import StatusCompletenessBox from "../../ColumnWithBoxes/StatusCompletenessBox"

type AssignmentSessionDropdownProps = { assignmentMetaInfo: ReviewAssignmentMetaInfo }
const AssignmentSessionDropdown = ({ assignmentMetaInfo }: AssignmentSessionDropdownProps) => {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <Button color="transparent" border="onHover" padding="tight">
                    <Ellipsis size={16} />
                </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
                <Dropdown.MenuItem onClick={() => {}}>숙제</Dropdown.MenuItem>
                <Dropdown.MenuItem onClick={() => {}}>할당</Dropdown.MenuItem>
                <Dropdown.MenuItem onClick={() => {}}>해제</Dropdown.MenuItem>
            </Dropdown.Menu>
        </Dropdown>
    )
}

type AssignmentSessionProps = { assignmentMetaInfo: ReviewAssignmentMetaInfo }
const AssignmentSession = ({ assignmentMetaInfo }: AssignmentSessionProps) => {
    const { created_at, assigned_at, completed_at } = assignmentMetaInfo

    return (
        <StatusCompletenessBox isCompleted={false} status="default" isOld={false} onClick={() => {}}>
            <StatusCompletenessBox.LabelGroup>
                <StatusCompletenessBox.Label role="main">{`${makeFromNow(created_at)} 제작`}</StatusCompletenessBox.Label>
                {assigned_at && !isSameDay(created_at, assigned_at) && (
                    <StatusCompletenessBox.Label role="conditional">{`${makeFromNow(assigned_at)} 할당`}</StatusCompletenessBox.Label>
                )}
                {assignmentMetaInfo.bookTitleArray.map((bookTitle) => (
                    <StatusCompletenessBox.Label key={bookTitle} role="conditional">
                        {`- ${bookTitle}`}
                    </StatusCompletenessBox.Label>
                ))}
                {completed_at && (
                    <StatusCompletenessBox.Label role="sub">{`${makeFromNow(completed_at)} 완료`}</StatusCompletenessBox.Label>
                )}
            </StatusCompletenessBox.LabelGroup>
            <AssignmentSessionDropdown assignmentMetaInfo={assignmentMetaInfo} />
        </StatusCompletenessBox>
    )
}

export default AssignmentSession
