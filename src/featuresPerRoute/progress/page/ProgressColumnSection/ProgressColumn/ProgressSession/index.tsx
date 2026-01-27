import type { ConciseSession, ConciseSyllabus } from "@/featuresPerRoute/progress/types"
import { instance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import Dropdown from "@/packages/components/Dropdown/Dropdown"
import { Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import { ClientError } from "@/shared/error/clientError"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import type { SessionStatus } from "@/shared/interfaces"
import { getRouteApi } from "@tanstack/react-router"
import clsx from "clsx"
import { Ellipsis } from "lucide-react"

type ProgressSessionLabelProps = {
    conciseSession: ConciseSession
}
const ProgressSessionLabel = ({ conciseSession }: ProgressSessionLabelProps) => {
    return (
        <Vstack className="grow" gap="none">
            <p>{conciseSession.start.step}</p>
            {conciseSession.end.topic && (
                <p
                    className={clsx(
                        "text-my-sm pl-3.5",
                        conciseSession.status ? "text-fg-inverted-muted" : "text-fg-muted"
                    )}
                >
                    {conciseSession.end.topic}
                </p>
            )}
            {conciseSession.end.step && <p>~ {conciseSession.end.step}</p>}
            {conciseSession.completed_at && (
                <p className={clsx("text-my-xs", conciseSession.status ? "text-fg-inverted-muted" : "text-fg-muted")}>
                    {conciseSession.completed_at.slice(0, 10)}
                </p>
            )}
        </Vstack>
    )
}

type ProgressSessionAdditionalData = {
    syllabus_id: string
    startingTopicTitle: string
    session_id: string
    status: SessionStatus | null
}
type ProgressSessionUpdateProps = { previous: ConciseSyllabus[]; additionalData: ProgressSessionAdditionalData }

const route = getRouteApi("/progress/")
type ProgressSessionProps = {
    conciseSession: ConciseSession
    syllabus_id: string
    startingTopicTitle: string
}
const ProgressSession = ({ conciseSession, syllabus_id, startingTopicTitle }: ProgressSessionProps) => {
    const searchParams = route.useSearch()
    const { classroom_id, student_id } = searchParams

    const useSessionMutation = (session_id?: string) =>
        useSimpleMutation({
            queryKeyWithoutParams: ["progressSession"],
            url: `/progress/session/assigned${session_id ? ["/", session_id].join("") : ""}`,
            method: session_id ? "delete" : "post",
            params: searchParams,
            update: ({ previous, additionalData }: ProgressSessionUpdateProps) => {
                const { session_id, status, syllabus_id, startingTopicTitle } = additionalData
                const newData = [...previous]
                const syllabus = newData.find((elSyllabus) => elSyllabus.id === syllabus_id)
                const sessionsByTopic = syllabus?.sessionsByTopicArray.find(
                    (elSessionsByTopic) => elSessionsByTopic.title === startingTopicTitle
                )
                const session = sessionsByTopic?.conciseSessionArray.find(
                    (elConciseSession) => elConciseSession.id === session_id
                )
                if (!session) throw ClientError.Unexpected("묶음을 찾지 못했어요")
                session.status = status
                return newData
            },
        })
    const postMutation = useSessionMutation()
    const deleteMutation = useSessionMutation(conciseSession.id)

    // TODO: dropdown에서 같은 걸 클랙해도 여전히 클릭이 되도록 수정해야
    // TODO: 현재 상태를 제외하고 메뉴가 뜨도록 수정해야
    const handleDropdownMenuChange = async (value: string) => {
        const baseBody = {
            session_id: conciseSession.id,
            classroom_id,
            student_id,
        }

        switch (value) {
            case "homework": {
                postMutation.mutate({
                    body: { ...baseBody, session_status: "HOMEWORK" },
                    additionalData: {
                        status: "HOMEWORK",
                        session_id: conciseSession.id,
                        startingTopicTitle,
                        syllabus_id,
                    },
                })
                break
            }
            case "today": {
                postMutation.mutate({
                    body: { ...baseBody, session_status: "TODAY" },
                    additionalData: {
                        status: "TODAY",
                        session_id: conciseSession.id,
                        startingTopicTitle,
                        syllabus_id,
                    },
                })
                break
            }
            case "dismiss":
                deleteMutation.mutate({
                    body: undefined,
                    additionalData: {
                        status: null,
                        session_id: conciseSession.id,
                        startingTopicTitle,
                        syllabus_id,
                    },
                })
                break
        }
    }
    const handleClickToComplete = async () => {
        if (!conciseSession.status) return
        await instance.post(`/progress/session/completed/${conciseSession.id}`, undefined, {
            params: searchParams,
        })
    }

    const isInteractable = Boolean(classroom_id) !== Boolean(student_id)
    return (
        <RoundBox
            onClick={handleClickToComplete}
            isBordered
            padding="md"
            color={
                conciseSession.status === "HOMEWORK" ? "red" : conciseSession.status === "TODAY" ? "blue" : undefined
            }
            className={clsx(
                "w-full",
                conciseSession.status && "text-fg-inverted-vivid",
                conciseSession.completed_at && "border-4 border-white"
            )}
        >
            <Hstack className="items-start" gap="none">
                <ProgressSessionLabel conciseSession={conciseSession} />
                {isInteractable && (
                    <Dropdown>
                        <Dropdown.Trigger>
                            <Button color="black" isBorderedOnHover>
                                <Ellipsis size={16} />
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Menu onChange={handleDropdownMenuChange}>
                            <Dropdown.MenuItem value="homework">숙제</Dropdown.MenuItem>
                            <Dropdown.MenuItem value="today">오늘</Dropdown.MenuItem>
                            <Dropdown.MenuItem value="dismiss">해제</Dropdown.MenuItem>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </Hstack>
        </RoundBox>
    )
}

export default ProgressSession
