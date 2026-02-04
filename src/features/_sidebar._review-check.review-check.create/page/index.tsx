// NOTE: this page shows LIST of review check given by classroom and student from sidebar
// NOTE: student MUST BE selected to render here.

import { instance } from "@/packages/api/axiosInstances"
import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import type { Book, Question, Step, Topic } from "@/shared/interfaces"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi } from "@tanstack/react-router"

const route = getRouteApi("/_sidebar")

type ConciseQuestion = Pick<Question, "id" | "name" | "page">
type ConciseStep = Omit<Step, "id"> & { questions: ConciseQuestion[] }
type ConciseTopic = Omit<Topic, "id"> & { steps: ConciseStep[] }
type ConciseBook = Omit<Book, "id"> & { topics: ConciseTopic[] }
type ResponseData = { bookResult: ConciseBook }

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

type ReviewCheckStepProps = { step: ConciseStep }
const ReviewCheckStep = ({ step }: ReviewCheckStepProps) => {
    return (
        <Vstack gap="none">
            <Title as="h3">{step.title}</Title>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(48px,1fr))] gap-my-xs">
                {step.questions.map((question) => (
                    <ReviewCheckQuestion key={question.id} question={question} />
                ))}
            </div>
        </Vstack>
    )
}

type ReviewCheckTopicProps = { topic: ConciseTopic }
const ReviewCheckTopic = ({ topic }: ReviewCheckTopicProps) => {
    return (
        <Vstack>
            <Title as="h2" isMuted className="text-center">
                {topic.title}
            </Title>
            {topic.steps.map((step) => (
                <ReviewCheckStep key={step.title} step={step} />
            ))}
        </Vstack>
    )
}

// NOTE: nothing gets rendered if only classroom is selected
const ReviewCheckCreatePage = () => {
    const searchParams = route.useSearch()
    const { data } = useQuery({
        queryKey: ["reviewCheck", searchParams],
        queryFn: async () => {
            const response = await instance.get("/review-check", { params: searchParams })
            return response.data as ResponseData
        },
    })
    if (!data)
        return (
            <RoundBox padding="xl" isBordered>
                ---- I need to create skeleton for this
            </RoundBox>
        )

    const { bookResult } = data

    return (
        <Container isPadded>
            <Title as="h1" className="text-center">{`${bookResult.title} 오답체크`}</Title>
            <Vstack>
                {bookResult.topics.map((topic) => (
                    <ReviewCheckTopic key={topic.title} topic={topic} />
                ))}
            </Vstack>
        </Container>
    )
}

export default ReviewCheckCreatePage
