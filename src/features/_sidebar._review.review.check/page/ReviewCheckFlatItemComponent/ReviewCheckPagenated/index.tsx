import useReviewCheckCreateStore from "@/features/_sidebar._review.review.check/store"
import type {
    JoinedQuestionWithOrders,
    PagenatedQuestions,
    ReviewCheckOrderInfo,
} from "@/features/_sidebar._review.review.check/types"
import { updateReviewCheckQueryData } from "@/features/_sidebar._review.review.check/utils"
import Button from "@/packages/components/Button/Button"
import { Hstack } from "@/packages/components/layouts"
import { getRouteApi } from "@tanstack/react-router"
import clsx from "clsx"

const route = getRouteApi("/_sidebar")

type ChecIsInfoMatchingQuestionProps = {
    reviewCheckInfo?: ReviewCheckOrderInfo
    topic_order: number
    step_order: number
    question_order: number
}
const checkIsInfoMatchingQuestion = ({
    reviewCheckInfo,
    topic_order,
    step_order,
    question_order,
}: ChecIsInfoMatchingQuestionProps): boolean => {
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

    const status = useReviewCheckCreateStore((state) => state.status)
    const isMultiSelecting = useReviewCheckCreateStore((state) => state.isMultiSelecting)
    const insertRecentReviewCheckInfo = useReviewCheckCreateStore((state) => state.insertRecentOrderInfo)
    const changedReviewChecks = useReviewCheckCreateStore((state) => state.changedIdToRequestInfo)
    const setChangedReviewChecks = useReviewCheckCreateStore((state) => state.setChangedIdToRequestInfo)
    const recentReviewCheckInfoArray = useReviewCheckCreateStore((state) => state.recentOrderInfoArray)
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
            assigned_session_student_id: question.assigned_session_student_id,
        }

        updateReviewCheckQueryData({
            questionIdToRequestInfo: copiedReviewChecks,
            searchParams,
            storeCallback: () => setChangedReviewChecks(copiedReviewChecks),
        })
    }

    // TODO: 정답은 파란색으로 바꿔야 함
    const statusToColor = {
        CORRECT: "green",
        WRONG: "red",
        null: "transparent",
    } as const

    const isVeryRecent = checkIsInfoMatchingQuestion({
        reviewCheckInfo: recentReviewCheckInfoArray[recentReviewCheckInfoArray.length - 1],
        topic_order,
        step_order,
        question_order: question.order,
    })
    const isSomewhatRecent = checkIsInfoMatchingQuestion({
        reviewCheckInfo: recentReviewCheckInfoArray[recentReviewCheckInfoArray.length - 2],
        topic_order,
        step_order,
        question_order: question.order,
    })

    return (
        <Button
            color={statusToColor[question.review_check_status_visual ?? "null"]}
            status={question.session_status ? "enabled" : "disabled"}
            padding="none"
            border="always"
            onClick={handleClick}
            className={clsx(
                "size-12 flex justify-center items-center",
                isVeryRecent && "outline-2 outline-border-vivid hover:outline-4",
                isSomewhatRecent && "outline-2 outline-border-muted hover:outline-4"
            )}
        >
            {question.name}
        </Button>
    )
}

type ReviewCheckPagenatedProps = { pagenatedQuestions: PagenatedQuestions }
const ReviewCheckPagenated = ({ pagenatedQuestions }: ReviewCheckPagenatedProps) => {
    const { page, questions } = pagenatedQuestions
    return (
        <Hstack gap="xs" className="mt-my-sm">
            <p className="size-12 flex justify-center items-center text-fg-muted">{`p.${page}`}</p>
            <div className="grid grid-cols-[repeat(auto-fill,48px)] gap-my-xs grow">
                {questions.map((questionWithOrder) => (
                    <ReviewCheckQuestion key={questionWithOrder.question.id} questionWithOrder={questionWithOrder} />
                ))}
            </div>
        </Hstack>
    )
}

export default ReviewCheckPagenated
