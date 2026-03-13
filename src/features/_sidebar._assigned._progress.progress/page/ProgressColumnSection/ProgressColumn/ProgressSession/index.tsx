import type { ConciseSession } from "@/features/_sidebar._assigned._progress.progress/types"
import Dropdown from "@/packages/components/Dropdown"
import { checkIsBeforeToday, makeFromNow } from "@/shared/utils/dateManipulations"
import { getRouteApi } from "@tanstack/react-router"
import StatusCompletenessBox from "../../ColumnWithBoxes/StatusCompletenessBox"
import StatusCompletenessBoxDropdown from "../../ColumnWithBoxes/StatusCompletenessBox/StatusCompletenessBoxDropdown"
import useProgressSession, { type MutateSessionStatus } from "./hooks"

const route = getRouteApi("/_sidebar")

type ProgressSessionDropdownProps = ProgressSessionProps & {
    mutatePostStatus: MutateSessionStatus
    mutateDeleteStatus: MutateSessionStatus
}
const ProgressSessionDropdown = ({
    startingTopicTitle,
    syllabus_id,
    conciseSession,
    mutatePostStatus,
    mutateDeleteStatus,
}: ProgressSessionDropdownProps) => {
    const searchParams = route.useSearch()
    const { classroom_id, student_id } = searchParams
    const isInteractable = Boolean(classroom_id) !== Boolean(student_id)
    if (!isInteractable) return null

    const baseBody = {
        session_id: conciseSession.id,
        classroom_id,
        student_id,
    }
    const handleHomeworkClick = () => {
        mutatePostStatus({
            body: { ...baseBody, session_status: "HOMEWORK" },
            additionalData: {
                status: "HOMEWORK",
                session_id: conciseSession.id,
                startingTopicTitle,
                syllabus_id,
            },
        })
    }
    const handleTodayClick = () => {
        mutatePostStatus({
            body: { ...baseBody, session_status: "TODAY" },
            additionalData: {
                status: "TODAY",
                session_id: conciseSession.id,
                startingTopicTitle,
                syllabus_id,
            },
        })
    }
    const handleDismissClick = () => {
        mutateDeleteStatus({
            body: undefined,
            additionalData: {
                status: null,
                session_id: conciseSession.id,
                startingTopicTitle,
                syllabus_id,
            },
        })
    }

    return (
        <StatusCompletenessBoxDropdown
            isCompleted={Boolean(conciseSession.completed_at)}
            status={conciseSession.status}
        >
            {conciseSession.status !== "HOMEWORK" && (
                <Dropdown.MenuItem onClick={handleHomeworkClick}>숙제</Dropdown.MenuItem>
            )}
            {conciseSession.status !== "TODAY" && (
                <Dropdown.MenuItem onClick={handleTodayClick}>오늘</Dropdown.MenuItem>
            )}
            {conciseSession.status && <Dropdown.MenuItem onClick={handleDismissClick}>해제</Dropdown.MenuItem>}
        </StatusCompletenessBoxDropdown>
    )
}

export type ProgressSessionProps = {
    conciseSession: ConciseSession
    syllabus_id: string
    startingTopicTitle: string
}
const ProgressSession = (props: ProgressSessionProps) => {
    const { classroom_id, student_id } = route.useSearch()
    const { conciseSession, startingTopicTitle, syllabus_id } = props
    const { status, assigned_at } = conciseSession

    const { handleClickToComplete, mutatePostStatus, mutateDeleteStatus, isCompleted } = useProgressSession(props)

    const assignedText = conciseSession.assigned_at ? `${makeFromNow(conciseSession.assigned_at)} 할당` : ""
    const completedText = conciseSession.completed_at ? ` __${makeFromNow(conciseSession.completed_at)} 완료` : ""
    const dateInfoText = `${assignedText}${completedText}`

    return (
        <StatusCompletenessBox
            disabled={!classroom_id}
            isCompleted={isCompleted}
            isOld={assigned_at ? checkIsBeforeToday(assigned_at) : false}
            status={status ?? "default"}
            onClick={handleClickToComplete}
        >
            <StatusCompletenessBox.LabelGroup>
                <StatusCompletenessBox.Label role="main">{conciseSession.start.step}</StatusCompletenessBox.Label>
                {conciseSession.end.topic && (
                    <StatusCompletenessBox.Label role="conditional">
                        {conciseSession.end.topic}
                    </StatusCompletenessBox.Label>
                )}
                {conciseSession.end.step && (
                    <StatusCompletenessBox.Label role="main">{conciseSession.end.step}</StatusCompletenessBox.Label>
                )}
                <StatusCompletenessBox.Label role="sub">{dateInfoText}</StatusCompletenessBox.Label>
            </StatusCompletenessBox.LabelGroup>
            {Boolean(classroom_id) !== Boolean(student_id) && !conciseSession.completed_at && (
                <ProgressSessionDropdown
                    startingTopicTitle={startingTopicTitle}
                    syllabus_id={syllabus_id}
                    conciseSession={conciseSession}
                    mutatePostStatus={mutatePostStatus}
                    mutateDeleteStatus={mutateDeleteStatus}
                />
            )}
        </StatusCompletenessBox>
    )
}

export default ProgressSession
