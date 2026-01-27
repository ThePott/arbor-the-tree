import type { ConciseSyllabus } from "@/featuresPerRoute/progress/types"
import { instance } from "@/packages/api/axiosInstances"
import { ClientError } from "@/shared/error/clientError"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import type { SessionStatus } from "@/shared/interfaces"
import { getRouteApi } from "@tanstack/react-router"
import type { ProgressSessionProps } from ".."

const route = getRouteApi("/progress/")

type ProgressSessionAdditionalData = {
    syllabus_id: string
    startingTopicTitle: string
    session_id: string
    status: SessionStatus | null
}
type ProgressSessionUpdateProps = { previous: ConciseSyllabus[]; additionalData: ProgressSessionAdditionalData }
const useStatusMutation = (session_id?: string) => {
    const searchParams = route.useSearch()

    return useSimpleMutation({
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
}

type UseEventHandlersProps = ProgressSessionProps & {
    mutatePostStatus: ReturnType<typeof useStatusMutation>["mutate"]
    mutateDeleteStatus: ReturnType<typeof useStatusMutation>["mutate"]
}
const useEventHandlers = ({
    conciseSession,
    syllabus_id,
    startingTopicTitle,
    mutatePostStatus,
    mutateDeleteStatus,
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
        if (!conciseSession.status) return

        await instance.post(`/progress/session/completed/${conciseSession.id}`, undefined, {
            params: searchParams,
        })
    }

    return { handleDropdownMenuChange, handleClickToComplete }
}

const useProgressSession = (props: ProgressSessionProps) => {
    const { conciseSession } = props
    const { mutate: mutatePost } = useStatusMutation()
    const { mutate: mutateDelete } = useStatusMutation(conciseSession.id)

    const eventHanderReturns = useEventHandlers({
        ...props,
        mutatePostStatus: mutatePost,
        mutateDeleteStatus: mutateDelete,
    })
    return { ...eventHanderReturns }
}
export default useProgressSession
