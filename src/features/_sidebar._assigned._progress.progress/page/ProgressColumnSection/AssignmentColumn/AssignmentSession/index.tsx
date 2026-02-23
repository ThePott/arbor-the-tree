import type { ReviewAssignmentMetaInfo } from "@/features/_sidebar._assigned._assignment.assignment/type"
import Button from "@/packages/components/Button/Button"
import Dropdown from "@/packages/components/Dropdown"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import type { SessionStatus } from "@/shared/interfaces"
import type { ReviewAssignmentResponseData } from "@/shared/queryOptions/reviewAssignmentQueryOptions"
import { checkIsBeforeToday, isSameDay, makeFromNow } from "@/shared/utils/dateManipulations"
import { getRouteApi } from "@tanstack/react-router"
import { Ellipsis } from "lucide-react"
import StatusCompletenessBox from "../../ColumnWithBoxes/StatusCompletenessBox"

const route = getRouteApi("/_sidebar")

type AssignmentSessionDropdownProps = { assignmentMetaInfo: ReviewAssignmentMetaInfo }
const AssignmentSessionDropdown = ({ assignmentMetaInfo }: AssignmentSessionDropdownProps) => {
    const { classroom_id, student_id } = route.useSearch()
    const { mutate: postMutate } = useSimpleMutation({
        queryKey: ["reviewAssignment", classroom_id, student_id],
        method: "post",
        url: `/review/assignment/${assignmentMetaInfo.id}/assigned`,
        update: ({
            previous,
            additionalData,
        }: {
            previous: ReviewAssignmentResponseData
            additionalData: SessionStatus
        }) => {
            const newData = previous.map((elMetaInfo) =>
                elMetaInfo.id === assignmentMetaInfo.id ? { ...elMetaInfo, status: additionalData } : elMetaInfo
            )
            return newData
        },
    })
    const { mutate: deleteMutate } = useSimpleMutation({
        queryKey: ["reviewAssignment", classroom_id, student_id],
        method: "delete",
        url: `/review/assignment/${assignmentMetaInfo.id}/assigned`,
        update: ({ previous }: { previous: ReviewAssignmentResponseData }) => {
            const newData = previous.map((elMetaInfo) =>
                elMetaInfo.id === assignmentMetaInfo.id ? { ...elMetaInfo, status: null } : elMetaInfo
            )
            return newData
        },
    })
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <Button color="transparent" border="onHover" padding="tight">
                    <Ellipsis size={16} />
                </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
                <Dropdown.MenuItem
                    onClick={() =>
                        postMutate({
                            body: { assignment_id: assignmentMetaInfo.id, status: "HOMEWORK" },
                            additionalData: "HOMEWORK",
                        })
                    }
                >
                    숙제
                </Dropdown.MenuItem>
                <Dropdown.MenuItem
                    onClick={() =>
                        postMutate({
                            body: { assignment_id: assignmentMetaInfo.id, status: "TODAY" },
                            additionalData: "TODAY",
                        })
                    }
                >
                    할당
                </Dropdown.MenuItem>
                <Dropdown.MenuItem onClick={() => deleteMutate({ body: undefined, additionalData: undefined })}>
                    해제
                </Dropdown.MenuItem>
            </Dropdown.Menu>
        </Dropdown>
    )
}

type AssignmentSessionProps = { assignmentMetaInfo: ReviewAssignmentMetaInfo }
const AssignmentSession = ({ assignmentMetaInfo }: AssignmentSessionProps) => {
    const { created_at, assigned_at, completed_at, questionCount } = assignmentMetaInfo

    return (
        <StatusCompletenessBox
            isCompleted={Boolean(completed_at)}
            status={assignmentMetaInfo.status ?? "default"}
            isOld={assigned_at ? checkIsBeforeToday(assigned_at) : false}
            onClick={() => {}}
        >
            <StatusCompletenessBox.LabelGroup>
                <StatusCompletenessBox.Label role="main">{`${makeFromNow(created_at)} 제작 __${questionCount} 문제`}</StatusCompletenessBox.Label>
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
