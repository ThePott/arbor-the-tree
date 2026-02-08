// NOTE: this page shows LIST of review check given by classroom and student from sidebar
// NOTE: student MUST BE selected to render here.

import { instance } from "@/packages/api/axiosInstances"
import { Container, FlexOneContainer, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import { ClientError } from "@/shared/error/clientError"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi } from "@tanstack/react-router"
import { useEffect } from "react"
import useReviewCheckCreateStore from "../store"
import type { ReviewCheckCreateResponseData } from "../types"
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
    const status = useReviewCheckCreateStore((state) => state.status)
    const recentReviewCheckInfoArray = useReviewCheckCreateStore((state) => state.recentReviewCheckInfoArray)
    const searchParams = route.useSearch()
    const { data } = useQuery({
        queryKey: ["reviewCheckCreate", searchParams],
        queryFn: async () => {
            const response = await instance.get("/review-check/create", { params: searchParams })
            return response.data as ReviewCheckCreateResponseData
        },
    })

    useEffect(() => {
        // TODO: 여기서 뭘 해야 하나
        // TODO: 양쪽을 감지 -> 감지된 걸 changed에 반영
        // TODO: changed에 반영할 때 최초 상태와 비교(data...question), 같으면 remove

        if (recentReviewCheckInfoArray.length === 0) return

        const copiedChanged = { ...changedReviewChecks }
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

            if (targetQuestion.status === status) return

            copiedChanged[targetQuestion.id] = status
            setChangedReviewChecks(copiedChanged)
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
                    if (!isMultiSelected) {
                        delete copiedChanged[question.id]
                        return
                    }

                    if (question.status === status) {
                        delete copiedChanged[question.id]
                        return
                    }
                    copiedChanged[question.id] = status
                })
            )
        )

        setChangedReviewChecks(copiedChanged)
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
