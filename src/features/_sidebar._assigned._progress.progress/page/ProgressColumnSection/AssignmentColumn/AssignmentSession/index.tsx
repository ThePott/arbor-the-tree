import type { ReviewAssignmentWithMetaInfo } from "@/features/_sidebar._assigned._assignment.assignment/type"
import Button from "@/packages/components/Button/Button"
import Dropdown from "@/packages/components/Dropdown"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import type { SessionStatus } from "@/shared/interfaces"
import type { ReviewAssignmentResponseData } from "@/shared/queryOptions/reviewAssignmentQueryOptions"
import { checkIsBeforeToday, makeFromNow } from "@/shared/utils/dateManipulations"
import { getRouteApi } from "@tanstack/react-router"
import { Ellipsis } from "lucide-react"
import StatusCompletenessBox from "../../ColumnWithBoxes/StatusCompletenessBox"

const route = getRouteApi("/_sidebar")

type AssignmentSessionDropdownProps = { assignmentWithMetaInfo: ReviewAssignmentWithMetaInfo }
const AssignmentSessionDropdown = ({ assignmentWithMetaInfo: { id, status } }: AssignmentSessionDropdownProps) => {
    const { classroom_id, student_id } = route.useSearch()
    const { mutate } = useSimpleMutation({
        queryKey: ["reviewAssignment", classroom_id, student_id],
        method: "patch",
        url: `/review/assignment/${id}`,
        update: ({
            previous,
            additionalData,
        }: {
            previous: ReviewAssignmentResponseData
            additionalData: SessionStatus | null
        }) => {
            const newData = previous.map((elAssginmentWithMetaInfo) =>
                elAssginmentWithMetaInfo.id === id
                    ? { ...elAssginmentWithMetaInfo, status: additionalData }
                    : elAssginmentWithMetaInfo
            )
            return newData
        },
        additionalOnSetteled: (client) => {
            client.invalidateQueries({ queryKey: ["reviewCheckAssignment", classroom_id, student_id] })
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
                {status !== "HOMEWORK" && (
                    <Dropdown.MenuItem
                        onClick={() =>
                            mutate({
                                body: { status: "HOMEWORK" },
                                additionalData: "HOMEWORK",
                            })
                        }
                    >
                        숙제
                    </Dropdown.MenuItem>
                )}
                {status !== "TODAY" && (
                    <Dropdown.MenuItem
                        onClick={() =>
                            mutate({
                                body: { status: "TODAY" },
                                additionalData: "TODAY",
                            })
                        }
                    >
                        할당
                    </Dropdown.MenuItem>
                )}
                {status !== null && (
                    <Dropdown.MenuItem onClick={() => mutate({ body: { status: null }, additionalData: null })}>
                        해제
                    </Dropdown.MenuItem>
                )}
            </Dropdown.Menu>
        </Dropdown>
    )
}

type AssignmentSessionProps = { assignmentWithMetaInfo: ReviewAssignmentWithMetaInfo }
const AssignmentSession = ({ assignmentWithMetaInfo }: AssignmentSessionProps) => {
    const { created_at, assigned_at, completed_at, questionCount, id } = assignmentWithMetaInfo

    const completedText = completed_at ? ` / ${makeFromNow(completed_at)} 완료` : null
    const assignedText = assigned_at ? ` / ${makeFromNow(assigned_at)} 할당` : null
    const questionCountText = `${questionCount} 문제`
    const subText = `${questionCountText}${completedText ?? assignedText ?? ""}`
    return (
        <StatusCompletenessBox
            disabled={Boolean(completed_at)}
            isCompleted={Boolean(completed_at)}
            status={assignmentWithMetaInfo.status ?? "default"}
            isOld={assigned_at ? checkIsBeforeToday(assigned_at) : false}
            onClick={() => {}}
        >
            <StatusCompletenessBox.LabelGroup>
                <StatusCompletenessBox.Label role="main">{`${created_at.slice(0, 10)} / id: ${id}`}</StatusCompletenessBox.Label>
                {assignmentWithMetaInfo.bookTitleArray.map((bookTitle) => (
                    <StatusCompletenessBox.Label key={bookTitle} role="conditional">
                        {`- ${bookTitle}`}
                    </StatusCompletenessBox.Label>
                ))}
                <StatusCompletenessBox.Label role="sub">{subText}</StatusCompletenessBox.Label>
            </StatusCompletenessBox.LabelGroup>
            {!completed_at && <AssignmentSessionDropdown assignmentWithMetaInfo={assignmentWithMetaInfo} />}
        </StatusCompletenessBox>
    )
}

export default AssignmentSession
