import useReviewCheckStore from "@/features/_sidebar._assigned._check.check/store"
import type { JoinedQuestionWithOrders, ReviewCheckOrderInfo } from "@/features/_sidebar._assigned._check.check/types"
import { updateReviewCheckQueryData } from "@/features/_sidebar._assigned._check.check/utils"
import { getRouteApi } from "@tanstack/react-router"
import Checkbox from "../../../Checkbox"

const route = getRouteApi("/_sidebar")

type CheckIsOrderInfoMatchingQuestionProps = {
    reviewCheckInfo?: ReviewCheckOrderInfo
    topic_order: number
    step_order: number
    question_order: number
}
const checkIsOrderInfoMatchingQuestion = ({
    reviewCheckInfo,
    topic_order,
    step_order,
    question_order,
}: CheckIsOrderInfoMatchingQuestionProps): boolean => {
    if (!reviewCheckInfo) return false
    return (
        reviewCheckInfo.topic_order === topic_order &&
        reviewCheckInfo.step_order === step_order &&
        reviewCheckInfo.question_order === question_order
    )
}

type ReviewCheckQuestionProps = {
    questionWithOrder: JoinedQuestionWithOrders
}
const ReviewCheckQuestion = ({ questionWithOrder }: ReviewCheckQuestionProps) => {
    const { topic_order, step_order, question } = questionWithOrder

    const status = useReviewCheckStore((state) => state.status)
    const isMultiSelecting = useReviewCheckStore((state) => state.isMultiSelecting)
    const insertRecentReviewCheckInfo = useReviewCheckStore((state) => state.insertRecentOrderInfo)
    const changedReviewChecks = useReviewCheckStore((state) => state.changedIdToRequestInfo)
    const setChangedReviewChecks = useReviewCheckStore((state) => state.setChangedIdToRequestInfo)
    const recentReviewCheckInfoArray = useReviewCheckStore((state) => state.recentOrderInfoArray)
    const searchParams = route.useSearch()

    // TODO: use event handler로 리팩터 한다
    const handleClick = () => {
        if (isMultiSelecting) {
            // NOTE: multi select일 때 구체적인 선택 로직은 page에서 이뤄진다
            // NOTE: 여기서는 recent에 추가하기만 한다
            insertRecentReviewCheckInfo({ topic_order, step_order, question_order: question.order })
            return
        }

        const copiedReviewChecks = { ...changedReviewChecks }
        if (question.review_check_status === status) {
            delete copiedReviewChecks[question.id]
            updateReviewCheckQueryData({
                questionIdToRequestInfo: copiedReviewChecks,
                searchParams,
                storeCallback: () => setChangedReviewChecks(copiedReviewChecks),
            })
            return
        }

        copiedReviewChecks[question.id] = {
            status,
            review_check_id: question.review_check_id,
            topic_order,
            step_order,
            session_id: question.session_id,
        }

        updateReviewCheckQueryData({
            questionIdToRequestInfo: copiedReviewChecks,
            searchParams,
            storeCallback: () => setChangedReviewChecks(copiedReviewChecks),
        })
    }

    const isVeryRecent = checkIsOrderInfoMatchingQuestion({
        reviewCheckInfo: recentReviewCheckInfoArray[recentReviewCheckInfoArray.length - 1],
        topic_order,
        step_order,
        question_order: question.order,
    })
    const isSomewhatRecent = checkIsOrderInfoMatchingQuestion({
        reviewCheckInfo: recentReviewCheckInfoArray[recentReviewCheckInfoArray.length - 2],
        topic_order,
        step_order,
        question_order: question.order,
    })

    return (
        <Checkbox
            review_check_status_visual={question.review_check_status_visual}
            session_status={question.session_status}
            onClick={handleClick}
            recent={isVeryRecent ? "very" : isSomewhatRecent ? "somewhat" : "no"}
        >
            {question.name}
        </Checkbox>
    )
}

export default ReviewCheckQuestion
