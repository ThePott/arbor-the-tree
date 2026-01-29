import type { ConciseSyllabus } from "@/featuresPerRoute/progress/types"
import { debugMutation } from "@/shared/config/debug/"
import { ClientError } from "@/shared/error/clientError"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import type { SessionStatus } from "@/shared/interfaces"
import { getRouteApi } from "@tanstack/react-router"
import type { Method } from "axios"
import { produce } from "immer"
import type { ProgressSessionProps } from ".."

const route = getRouteApi("/progress/")

// NOTE: for status post
type StatusAdditionalData = {
    syllabus_id: string
    startingTopicTitle: string
    session_id: string
    status: SessionStatus | null
}
type StatusUpdateProps = {
    previous: ConciseSyllabus[]
    additionalData: StatusAdditionalData
}
const useStatusMutation = (session_id?: string) => {
    const searchParams = route.useSearch()

    return useSimpleMutation({
        queryKeyWithoutParams: ["progressSession"],
        url: `/progress/session/assigned${session_id ? ["/", session_id].join("") : ""}`,
        method: session_id ? "delete" : "post",
        params: searchParams,
        update: ({ previous, additionalData }: StatusUpdateProps) => {
            debugMutation("useStatusMutation update", { additionalData })
            const { session_id, status, syllabus_id, startingTopicTitle } = additionalData
            const newData = produce(previous, (draft) => {
                const syllabus = draft.find((elSyllabus) => elSyllabus.id === syllabus_id)
                const sessionsByTopic = syllabus?.sessionsByTopicArray.find(
                    (elSessionsByTopic) => elSessionsByTopic.title === startingTopicTitle
                )
                const session = sessionsByTopic?.conciseSessionArray.find(
                    (elConciseSession) => elConciseSession.id === session_id
                )
                if (!session) throw ClientError.Unexpected("묶음을 찾지 못했어요")
                session.status = status

                if (status) {
                    session.assigned_at = new Date().toISOString()
                } else {
                    session.assigned_at = null
                }
            })
            debugMutation("useStatusMutation update result", { newData })
            return newData
        },
    })
}

// NOTE: for completed post, delete
type CompletedAdditionalData = {
    syllabus_id: string
    startingTopicTitle: string
    session_id: string
    completed_at: string | null
}
type CompletedUpdateProps = {
    previous: ConciseSyllabus[]
    additionalData: CompletedAdditionalData
}
type UseCompletedMutationProps = {
    session_id: string
    method: Extract<Method, "post" | "delete">
}
const useCompletedMutation = ({ session_id, method }: UseCompletedMutationProps) => {
    const searchParams = route.useSearch()

    return useSimpleMutation({
        queryKeyWithoutParams: ["progressSession"],
        url: `/progress/session/${session_id}/completed`,
        method,
        params: searchParams,
        update: ({ previous, additionalData }: CompletedUpdateProps) => {
            debugMutation("useCompletedMutation update", { additionalData })
            const { session_id, completed_at, syllabus_id, startingTopicTitle } = additionalData

            const newData = produce(previous, (draft) => {
                const syllabus = draft.find((elSyllabus) => elSyllabus.id === syllabus_id)
                const sessionsByTopic = syllabus?.sessionsByTopicArray.find(
                    (elSessionsByTopic) => elSessionsByTopic.title === startingTopicTitle
                )
                const session = sessionsByTopic?.conciseSessionArray.find(
                    (elConciseSession) => elConciseSession.id === session_id
                )
                if (!session) throw ClientError.Unexpected("묶음을 찾지 못했어요")
                session.completed_at = completed_at
            })
            debugMutation("useCompletedMutation update result", { newData })
            return newData
        },
    })
}

type UseEventHandlersProps = ProgressSessionProps & {
    mutatePostStatus: ReturnType<typeof useStatusMutation>["mutate"]
    mutateDeleteStatus: ReturnType<typeof useStatusMutation>["mutate"]

    mutatePostCompleted: ReturnType<typeof useCompletedMutation>["mutate"]
    mutateDeleteCompleted: ReturnType<typeof useCompletedMutation>["mutate"]
}
const useEventHandlers = ({
    conciseSession,
    syllabus_id,
    startingTopicTitle,
    mutatePostStatus,
    mutateDeleteStatus,
    mutatePostCompleted,
    mutateDeleteCompleted,
}: UseEventHandlersProps) => {
    const searchParams = route.useSearch()
    const { classroom_id, student_id } = searchParams
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
                mutatePostStatus({
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
                mutatePostStatus({
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
                mutateDeleteStatus({
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
    const handleClickToComplete = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = event.target as HTMLElement
        if (target.closest("[data-dropdown]")) return
        // NOTE: 상태 없는 건 끝낼 수 없음
        if (!conciseSession.status) return

        if (conciseSession.completed_at) {
            mutateDeleteCompleted({
                body: undefined,
                additionalData: {
                    completed_at: null,
                    session_id: conciseSession.id,
                    startingTopicTitle,
                    syllabus_id,
                },
            })
            return
        }
        mutatePostCompleted({
            body: undefined,
            additionalData: {
                completed_at: new Date().toISOString(),
                session_id: conciseSession.id,
                startingTopicTitle,
                syllabus_id,
            },
        })
    }

    return { handleDropdownMenuChange, handleClickToComplete }
}

const useProgressSession = (props: ProgressSessionProps) => {
    const { conciseSession } = props
    const { mutate: mutatePostStatus } = useStatusMutation()
    const { mutate: mutateDeleteStatus } = useStatusMutation(conciseSession.id)
    const { mutate: mutatePostCompleted } = useCompletedMutation({ session_id: conciseSession.id, method: "post" })
    const { mutate: mutateDeleteCompleted } = useCompletedMutation({ session_id: conciseSession.id, method: "delete" })

    const eventHanderReturns = useEventHandlers({
        ...props,
        mutatePostStatus,
        mutateDeleteStatus,
        mutatePostCompleted,
        mutateDeleteCompleted,
    })
    return { ...eventHanderReturns }
}
export default useProgressSession
