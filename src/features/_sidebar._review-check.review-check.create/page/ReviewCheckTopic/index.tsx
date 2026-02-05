import Button from "@/packages/components/Button/Button"
import { Hstack, Vstack } from "@/packages/components/layouts"
import Title from "@/packages/components/Title/Title"
import { ClientError } from "@/shared/error/clientError"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import type { ReviewCheckStatus } from "@/shared/interfaces"
import { getRouteApi } from "@tanstack/react-router"
import clsx from "clsx"
import { produce } from "immer"
import useReviewCheckCreateStore from "../../store"
import type { ExtendedStep, ExtendedTopic, JoinedQuestion, ReviewCheckCreateResponseData } from "../../types"

const route = getRouteApi("/_sidebar")

type ReviewCheckQuestionProps = {
    topic_order: number
    step_order: number
    question: JoinedQuestion
}
const ReviewCheckQuestion = ({ topic_order, step_order, question }: ReviewCheckQuestionProps) => {
    const status = useReviewCheckCreateStore((state) => state.status)
    const searchParams = route.useSearch()

    const { mutate: postMuate } = useSimpleMutation({
        method: "post",
        url: "/review-check/create",
        queryKeyWithoutParams: ["reviewCheckCreate", searchParams],
        update: ({
            previous,
            additionalData,
        }: {
            previous: ReviewCheckCreateResponseData
            additionalData: ReviewCheckStatus
        }) => {
            const newData = produce(previous, (draft) => {
                const targetTopic = draft.topics.find((elTopic) => elTopic.order === topic_order)
                if (!targetTopic) throw ClientError.Unexpected("오답 체크를 실패했어요")
                const targetStep = targetTopic.steps.find((elStep) => elStep.order === step_order)
                if (!targetStep) throw ClientError.Unexpected("오답 체크를 실패했어요")
                const targetQuestion = targetStep.questions.find((elQuestion) => elQuestion.id === question.id)
                if (!targetQuestion) throw ClientError.Unexpected("오답 체크를 실패했어요")
                targetQuestion.status = additionalData
            })

            return newData
        },
    })
    const { mutate: patchMutate } = useSimpleMutation({
        method: "patch",
        url: `/review-check/create/${question.review_check_id}`,
        queryKeyWithoutParams: ["reviewCheckCreate", searchParams],
        update: ({
            previous,
            additionalData,
        }: {
            previous: ReviewCheckCreateResponseData
            additionalData: ReviewCheckStatus
        }) => {
            const newData = produce(previous, (draft) => {
                const targetTopic = draft.topics.find((elTopic) => elTopic.order === topic_order)
                if (!targetTopic) throw ClientError.Unexpected("오답 체크를 실패했어요")
                const targetStep = targetTopic.steps.find((elStep) => elStep.order === step_order)
                if (!targetStep) throw ClientError.Unexpected("오답 체크를 실패했어요")
                const targetQuestion = targetStep.questions.find((elQuestion) => elQuestion.id === question.id)
                if (!targetQuestion) throw ClientError.Unexpected("오답 체크를 실패했어요")
                targetQuestion.status = additionalData
            })

            return newData
        },
    })
    const { mutate: deleteMutate } = useSimpleMutation({
        method: "delete",
        url: `/review-check/create/${question.review_check_id}`,
        queryKeyWithoutParams: ["reviewCheckCreate", searchParams],
        update: ({ previous }: { previous: ReviewCheckCreateResponseData }) => {
            const newData = produce(previous, (draft) => {
                const targetTopic = draft.topics.find((elTopic) => elTopic.order === topic_order)
                if (!targetTopic) throw ClientError.Unexpected("오답 체크를 실패했어요")
                const targetStep = targetTopic.steps.find((elStep) => elStep.order === step_order)
                if (!targetStep) throw ClientError.Unexpected("오답 체크를 실패했어요")
                const targetQuestion = targetStep.questions.find((elQuestion) => elQuestion.id === question.id)
                if (!targetQuestion) throw ClientError.Unexpected("오답 체크를 실패했어요")
                targetQuestion.status = null
            })

            return newData
        },
    })

    const handleClick = () => {
        if (question.status === status) return
        if (!status) {
            deleteMutate({ body: undefined, additionalData: undefined })
            return
        }
        if (question.status) {
            const body = {
                status,
            }
            patchMutate({ body, additionalData: status })
            return
        }
        const body = {
            syllabus_id: searchParams.syllabus_id,
            student_id: searchParams.student_id,
            question_id: question.id,
            status,
        }
        postMuate({ body, additionalData: status })
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
            color={statusToColor[question.status ?? "null"]}
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
