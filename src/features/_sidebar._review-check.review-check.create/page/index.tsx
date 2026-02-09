import { instance } from "@/packages/api/axiosInstances"
import { Container, FlexOneContainer, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import { ClientError } from "@/shared/error/clientError"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi } from "@tanstack/react-router"
import { useEffect } from "react"
import useReviewCheckCreateStore from "../store"
import type { QuestionIdToInfo, ReviewCheckCreateResponseData } from "../types"
import { updateReviewCheckCache, updateReviewCheckCacheVisual } from "../utils"
import ReviewCheckCreateToolbar from "./ReviewCheckCreateToolbar"
import ReviewCheckTopic from "./ReviewCheckTopic"

const route = getRouteApi("/_sidebar")

type CheckIsMultiSelectedProps = {
    topic_order: number
    step_order: number
    question_order: number
}
const checkIsMultiSelected = ({ topic_order, step_order, question_order }: CheckIsMultiSelectedProps): boolean => {
    const recentReviewCheckInfoArray = useReviewCheckCreateStore.getState().recentReviewCheckInfoArray
    const sortedRecentReviewCheckInfoArray = recentReviewCheckInfoArray.sort((a, b) => {
        if (a.topic_order != b.topic_order) return a.topic_order - b.topic_order
        if (a.step_order != b.step_order) return a.step_order - b.step_order
        return a.question_order - b.question_order
    })

    const length = recentReviewCheckInfoArray.length
    if (length === 0) return false
    if (length === 1) {
        // TODO: 선택된 게 나면 선택됐다.
        const reviewCheckInfo = recentReviewCheckInfoArray[0]
        if (
            reviewCheckInfo.topic_order === topic_order &&
            reviewCheckInfo.step_order === step_order &&
            reviewCheckInfo.question_order === question_order
        ) {
            return true
        }
        return false
    }

    const first = sortedRecentReviewCheckInfoArray[0]
    const second = sortedRecentReviewCheckInfoArray[1]

    if (
        first.topic_order <= topic_order &&
        topic_order <= second.topic_order &&
        first.step_order <= step_order &&
        step_order <= second.step_order &&
        first.question_order <= question_order &&
        question_order <= second.question_order
    ) {
        return true
    }
    return false
}

// NOTE: nothing gets rendered if only classroom is selected
const ReviewCheckCreatePage = () => {
    const changedReviewChecks = useReviewCheckCreateStore((state) => state.changedReviewChecks)
    const setChangedReviewChecks = useReviewCheckCreateStore((state) => state.setChangedReviewChecks)
    const changedReviewChecksByMultiSelect = useReviewCheckCreateStore(
        (state) => state.changedReviewChecksByMultiSelect
    )
    const setChangedReviewChecksByMultiSelect = useReviewCheckCreateStore(
        (state) => state.setChangedReviewChecksByMultiSelect
    )
    const status = useReviewCheckCreateStore((state) => state.status)
    const recentReviewCheckInfoArray = useReviewCheckCreateStore((state) => state.recentReviewCheckInfoArray)

    const searchParams = route.useSearch()
    const { data } = useQuery({
        queryKey: ["reviewCheck", searchParams],
        queryFn: async () => {
            setChangedReviewChecks({})
            const response = await instance.get("/review/check", { params: searchParams })
            return response.data as ReviewCheckCreateResponseData
        },
    })
    const { mutate } = useSimpleMutation({
        method: "post",
        url: "/review/check",
        queryKeyWithoutParams: ["reviewCheck"],
        params: searchParams,
        update: updateReviewCheckCache,
    })

    // TODO: debounce를 어떻게 만들지? useEffect, timeout, cleanup, callback
    useEffect(() => {
        if (Object.entries(changedReviewChecks).length === 0) return
        if (Object.values(changedReviewChecksByMultiSelect).length > 0) return

        const timeout = setTimeout(async () => {
            // TODO: /review-check/create -> /review/check
            // TODO: /review-check -> /review/assignment
            // TODO: /review-check 과제 제작 -> /review/assignment/create
            const body = {
                student_id: searchParams.student_id,
                syllabus_id: searchParams.syllabus_id,
                changedReviewChecks,
            }
            mutate({ body, additionalData: changedReviewChecks })
        }, 500)
        return () => clearTimeout(timeout)
    }, [changedReviewChecks, changedReviewChecksByMultiSelect])

    useEffect(() => {
        if (recentReviewCheckInfoArray.length === 0) return

        const newChangedReviewChecks: QuestionIdToInfo = {}
        if (recentReviewCheckInfoArray.length === 1) {
            const recentRevieCheckInfo = recentReviewCheckInfoArray[0]
            const targetTopic = data?.topics.find((topic) => topic.order === recentRevieCheckInfo.topic_order)
            if (!targetTopic) throw ClientError.Unexpected("다중 선택 중 오류가 발생했어요")
            const targetStep = targetTopic?.steps.find((step) => step.order === recentRevieCheckInfo.step_order)
            if (!targetStep) throw ClientError.Unexpected("다중 선택 중 오류가 발생했어요")
            const targetQuestion = targetStep.questions.find(
                (question) => question.order === recentRevieCheckInfo.question_order
            )
            if (!targetQuestion) throw ClientError.Unexpected("다중 선택 중 오류가 발생했어요")

            if (targetQuestion.review_check_status === status) return

            newChangedReviewChecks[targetQuestion.id] = {
                status,
                review_check_id: targetQuestion.review_check_id,
                topic_order: targetTopic.order,
                step_order: targetStep.order,
                assigned_session_student_id: targetQuestion.assigned_session_student_id,
            }
            updateReviewCheckCacheVisual({
                changedReviewChecks: newChangedReviewChecks,
                searchParams,
                storeCallback: () => setChangedReviewChecksByMultiSelect(newChangedReviewChecks),
            })
            return
        }

        data?.topics.forEach((topic) =>
            topic.steps.forEach((step) =>
                step.questions.forEach((question) => {
                    const isMultiSelected = checkIsMultiSelected({
                        topic_order: topic.order,
                        step_order: step.order,
                        question_order: question.order,
                    })
                    if (!isMultiSelected) return
                    if (question.review_check_status_visual === status) return

                    newChangedReviewChecks[question.id] = {
                        status,
                        review_check_id: question.review_check_id,
                        topic_order: topic.order,
                        step_order: step.order,
                        assigned_session_student_id: question.assigned_session_student_id,
                    }
                })
            )
        )

        updateReviewCheckCacheVisual({
            changedReviewChecks: newChangedReviewChecks,
            searchParams,
            storeCallback: () => setChangedReviewChecksByMultiSelect(newChangedReviewChecks),
        })
    }, [recentReviewCheckInfoArray])

    if (!data)
        return (
            <RoundBox padding="xl" isBordered>
                ---- I need to create skeleton for this
            </RoundBox>
        )

    return (
        <Vstack gap="none" className="h-full overflow-hidden">
            <ReviewCheckCreateToolbar />
            <FlexOneContainer isYScrollable>
                <Container isPadded width="md">
                    <Title as="h1" className="text-center">{`${data.title} 오답체크`}</Title>
                    <Vstack>
                        {data.topics.map((topic) => (
                            <ReviewCheckTopic key={topic.title} topic={topic} />
                        ))}
                    </Vstack>
                </Container>
            </FlexOneContainer>
        </Vstack>
    )
}

export default ReviewCheckCreatePage
