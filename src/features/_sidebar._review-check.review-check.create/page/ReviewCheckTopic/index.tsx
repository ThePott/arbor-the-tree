import { Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import type { Book, Question, Step, Topic } from "@/shared/interfaces"

type ConciseQuestion = Pick<Question, "id" | "name" | "page">
type ConciseStep = Omit<Step, "id"> & { questions: ConciseQuestion[] }
type ConciseTopic = Omit<Topic, "id"> & { steps: ConciseStep[] }
export type ConciseBook = Omit<Book, "id"> & { topics: ConciseTopic[] }

type ReviewCheckQuestionProps = {
    question: ConciseQuestion
}
const ReviewCheckQuestion = ({ question }: ReviewCheckQuestionProps) => {
    return (
        <RoundBox isBordered className="size-12 flex justify-center items-center">
            {question.name}
        </RoundBox>
    )
}

type PagenatedQuestions = { page: number; questions: ConciseQuestion[] }
type ReviewCheckPagenatedProps = { pagenated: PagenatedQuestions }
const ReviewCheckPagenated = ({ pagenated }: ReviewCheckPagenatedProps) => {
    return (
        <Hstack gap="xs">
            <p className="size-12 flex justify-center items-center text-fg-muted">{`p.${pagenated.page}`}</p>
            <div className="grid grid-cols-[repeat(auto-fill,48px)] gap-my-xs grow">
                {pagenated.questions.map((question) => (
                    <ReviewCheckQuestion key={question.id} question={question} />
                ))}
            </div>
        </Hstack>
    )
}

type ReviewCheckStepProps = { step: ConciseStep }
const makePagenated = (questions: ConciseQuestion[]): PagenatedQuestions[] => {
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
const ReviewCheckStep = ({ step }: ReviewCheckStepProps) => {
    const pagenatedQuestionsArray = makePagenated(step.questions)
    return (
        <Vstack gap="sm">
            <Title as="h3" className="mt-my-md sticky top-[24px] bg-bg-neg-1">
                {step.title}
            </Title>
            {pagenatedQuestionsArray.map((pagenated) => (
                <ReviewCheckPagenated key={pagenated.page} pagenated={pagenated} />
            ))}
        </Vstack>
    )
}

type ReviewCheckTopicProps = { topic: ConciseTopic }
const ReviewCheckTopic = ({ topic }: ReviewCheckTopicProps) => {
    return (
        <Vstack>
            <Title as="h2" isMuted className="text-center mt-my-lg sticky top-0 bg-bg-neg-1 z-10">
                {topic.title}
            </Title>
            {topic.steps.map((step) => (
                <ReviewCheckStep key={step.title} step={step} />
            ))}
        </Vstack>
    )
}

export default ReviewCheckTopic
