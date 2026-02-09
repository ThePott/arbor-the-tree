import Button from "@/packages/components/Button/Button"
import { Hstack, Vstack } from "@/packages/components/layouts"
import Title from "@/packages/components/Title/Title"
import { useQueryClient } from "@tanstack/react-query"
import { getRouteApi } from "@tanstack/react-router"
import clsx from "clsx"
import useReviewCheckCreateStore from "../../store"
import type { ExtendedStep, ExtendedTopic, JoinedQuestion, ReviewCheckCreateResponseData } from "../../types"
import { updateReviewCheckCache } from "../../utils"

const route = getRouteApi("/_sidebar")

type ReviewCheckQuestionProps = {
    topic_order: number
    step_order: number
    question: JoinedQuestion
}
const ReviewCheckQuestion = ({ topic_order, step_order, question }: ReviewCheckQuestionProps) => {
    const status = useReviewCheckCreateStore((state) => state.status)
    const isMultiSelecting = useReviewCheckCreateStore((state) => state.isMultiSelecting)
    const insertRecentReviewCheckInfo = useReviewCheckCreateStore((state) => state.insertRecentReviewCheckInfo)
    const changedReviewChecks = useReviewCheckCreateStore((state) => state.changedReviewChecks)
    const setChangedReviewChecks = useReviewCheckCreateStore((state) => state.setChangedReviewChecks)

    const searchParams = route.useSearch()
    const queryClient = useQueryClient()

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
            setChangedReviewChecks(copiedReviewChecks)
            return
        }

        copiedReviewChecks[question.id] = {
            status,
            review_check_id: question.review_check_id,
            topic_order,
            step_order,
            assigned_session_student_id: question.assigned_session_student_id,
        }

        setChangedReviewChecks(copiedReviewChecks)
        const previous = queryClient.getQueryData(["reviewCheck", searchParams]) as ReviewCheckCreateResponseData
        const newVisual = updateReviewCheckCache({ previous, additionalData: copiedReviewChecks })
        queryClient.setQueryData(["reviewCheck", searchParams], newVisual)
    }

    // TODO: 정답은 파란색으로 바꿔야 함
    const statusToColor = {
        CORRECT: "green",
        WRONG: "red",
        null: "transparent",
    } as const

    // TODO: 버튼 색상 더 추가해야 함 -> 투명일 때도 disabled는 만들어야 함
    // TODO: 버튼 옵션 바꿔야 함
    return (
        <Button
            color={statusToColor[question.review_check_status_visual ?? "null"]}
            status={question.session_status ? "enabled" : "disabled"}
            padding="none"
            border="always"
            onClick={handleClick}
            className={clsx("size-12 flex justify-center items-center")}
        >
            {question.name}
        </Button>
    )
}

type PagenatedQuestions = {
    page: number
    questions: JoinedQuestion[]
}
type ReviewCheckPagenatedProps = {
    topic_order: number
    step_order: number
    pagenated: PagenatedQuestions
}
const ReviewCheckPagenated = ({ topic_order, step_order, pagenated }: ReviewCheckPagenatedProps) => {
    return (
        <Hstack gap="xs">
            <p className="size-12 flex justify-center items-center text-fg-muted">{`p.${pagenated.page}`}</p>
            <div className="grid grid-cols-[repeat(auto-fill,48px)] gap-my-xs grow">
                {pagenated.questions.map((question) => (
                    <ReviewCheckQuestion
                        key={question.id}
                        topic_order={topic_order}
                        step_order={step_order}
                        question={question}
                    />
                ))}
            </div>
        </Hstack>
    )
}

type ReviewCheckStepProps = {
    topic_order: number
    step: ExtendedStep
}
const makePagenated = (questions: JoinedQuestion[]): PagenatedQuestions[] => {
    const result = questions.reduce((acc: PagenatedQuestions[], cur) => {
        const pagenated = acc.find((el) => el.page === cur.page)

        if (pagenated) {
            pagenated.questions.push(cur)
            return acc
        }

        const newPagenated: PagenatedQuestions = {
            page: cur.page,
            questions: [cur],
        }
        acc.push(newPagenated)
        return acc
    }, [])
    return result
}
const ReviewCheckStep = ({ topic_order, step }: ReviewCheckStepProps) => {
    const pagenatedQuestionsArray = makePagenated(step.questions)
    return (
        <Vstack gap="sm">
            <Title as="h3" className="mt-my-md sticky top-[24px] bg-bg-neg-1">
                {step.title}
            </Title>
            {pagenatedQuestionsArray.map((pagenated) => (
                <ReviewCheckPagenated
                    key={pagenated.page}
                    topic_order={topic_order}
                    step_order={step.order}
                    pagenated={pagenated}
                />
            ))}
        </Vstack>
    )
}

type ReviewCheckTopicProps = { topic: ExtendedTopic }
const ReviewCheckTopic = ({ topic }: ReviewCheckTopicProps) => {
    return (
        <Vstack>
            <Title as="h2" isMuted className="text-center mt-my-lg sticky top-0 bg-bg-neg-1 z-10">
                {topic.title}
            </Title>
            {topic.steps.map((step) => (
                <ReviewCheckStep key={step.title} topic_order={topic.order} step={step} />
            ))}
        </Vstack>
    )
}

export default ReviewCheckTopic
