import type { ConciseSyllabus } from "@/features/_sidebar._progress.progress/types"
import { useDebouncingToggle } from "@/packages/utils/useDebouncingToggle"
import { debugMutation } from "@/shared/config/debug/"
import { ClientError } from "@/shared/error/clientError"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import type { SessionStatus } from "@/shared/interfaces"
import { getRouteApi } from "@tanstack/react-router"
import type { Method } from "axios"
import { produce } from "immer"
import { useEffect } from "react"
import type { ProgressSessionProps } from ".."

const route = getRouteApi("/_sidebar")

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
    const { classroom_id, student_id, syllabus_id } = searchParams

    return useSimpleMutation({
        queryKey: ["progressSession", classroom_id, student_id, syllabus_id],
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
        ...(classroom_id &&
            !student_id && {
                additionalOnSetteled: (client) =>
                    client.invalidateQueries({
                        predicate: (query) => {
                            const objectQueryKey = query.queryKey[1] as { classroom_id: string }
                            return objectQueryKey.classroom_id === classroom_id
                        },
                    }),
            }),
        additionalOnSetteled: (client) => {
            // NOTE: 세부 문제집 있으면 전체일 때도 업데이트
            client.invalidateQueries({ queryKey: ["progressSession", classroom_id, student_id] })
            // NOTE: 상태는 개별 학생, 반 상단에서만 가능하다. 반 상단 mutate -> 반 세부 학생도 업데이트
            if (classroom_id) {
                client.invalidateQueries({ queryKey: ["progressSession", classroom_id] })
            }
        },
    })
}
export type MutateSessionStatus = ReturnType<typeof useStatusMutation>["mutate"]

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
    const { classroom_id, student_id, syllabus_id } = route.useSearch()

    return useSimpleMutation({
        queryKey: ["progressSession", classroom_id, student_id, syllabus_id],
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
        additionalOnSetteled: (client) => {
            // NOTE: syllabus_id가 있으면, 실라버스 선택하지 않았을 때도 무효화
            client.invalidateQueries({ queryKey: ["progressSession", classroom_id, student_id] })
            // NOTE: 반 내 학생과 반 전체의 완료 여부는 다르니 따로 맞추지 않음
        },
    })
}

type UseEventHandlersProps = ProgressSessionProps & {
    mutatePostCompleted: ReturnType<typeof useCompletedMutation>["mutate"]
    mutateDeleteCompleted: ReturnType<typeof useCompletedMutation>["mutate"]
}
const useEventHandlers = ({
    conciseSession,
    syllabus_id,
    startingTopicTitle,
    mutatePostCompleted,
    mutateDeleteCompleted,
}: UseEventHandlersProps) => {
    const { debouncedBoolValue, realTimeValue, toggle } = useDebouncingToggle({
        value: Boolean(conciseSession.completed_at),
    })

    useEffect(() => {
        if (debouncedBoolValue === Boolean(conciseSession.completed_at)) return

        if (debouncedBoolValue) {
            mutatePostCompleted({
                body: undefined,
                additionalData: {
                    completed_at: new Date().toISOString(),
                    session_id: conciseSession.id,
                    startingTopicTitle,
                    syllabus_id,
                },
            })
            return
        }

        mutateDeleteCompleted({
            body: undefined,
            additionalData: {
                completed_at: null,
                session_id: conciseSession.id,
                startingTopicTitle,
                syllabus_id,
            },
        })
    }, [debouncedBoolValue])

    const handleClickToComplete = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = event.target as HTMLElement
        if (target.closest("[data-dropdown]")) return
        // NOTE: 상태 없는 건 끝낼 수 없음
        if (!conciseSession.status) return

        toggle()
    }

    return { handleClickToComplete, isCompleted: realTimeValue }
}

const useProgressSession = (props: ProgressSessionProps) => {
    const { conciseSession } = props
    const { mutate: mutatePostStatus } = useStatusMutation()
    const { mutate: mutateDeleteStatus } = useStatusMutation(conciseSession.id)
    const { mutate: mutatePostCompleted } = useCompletedMutation({ session_id: conciseSession.id, method: "post" })
    const { mutate: mutateDeleteCompleted } = useCompletedMutation({ session_id: conciseSession.id, method: "delete" })

    const eventHanderReturns = useEventHandlers({
        ...props,
        mutatePostCompleted,
        mutateDeleteCompleted,
    })
    return { ...eventHanderReturns, mutatePostStatus, mutateDeleteStatus }
}
export default useProgressSession
