import type { ReviewCheckResponseData } from "../../loader"
import type { JoinedQuestion, JoinedQuestionWithOrders, PagenatedQuestions } from "../../types"

type MakeFlatPagenatedInStepProps = {
    topic_order: number
    step_order: number
    questions: JoinedQuestion[]
}
const makeFlatPagenatedInStep = ({
    topic_order,
    step_order,
    questions,
}: MakeFlatPagenatedInStepProps): FlatItemForPagenatedQuestions[] => {
    const result = questions.reduce((acc: FlatItemForPagenatedQuestions[], question) => {
        const targetFlatItem = acc.find((elFlatItem) => elFlatItem.pagenatedQuestions.page === question.page)

        const newJoinedQuestionWithOrders: JoinedQuestionWithOrders = {
            topic_order,
            step_order,
            question,
        }

        if (targetFlatItem) {
            targetFlatItem.pagenatedQuestions.questions.push(newJoinedQuestionWithOrders)
            return acc
        }

        const newPagenated: PagenatedQuestions = {
            page: question.page,
            questions: [newJoinedQuestionWithOrders],
        }
        const newFlatItem: FlatItemForPagenatedQuestions = {
            forWhat: "pagenatedQuestions",
            pagenatedQuestions: newPagenated,
        }
        acc.push(newFlatItem)
        return acc
    }, [])
    return result
}

type FlatItemForPagenatedQuestions = { forWhat: "pagenatedQuestions"; pagenatedQuestions: PagenatedQuestions }
export type ReviewCheckFlatItem =
    | { forWhat: "topicHeader"; title: string }
    | { forWhat: "stepHeader"; title: string }
    | FlatItemForPagenatedQuestions
export const makeReviewCheckFlatItemArray = (queryData: ReviewCheckResponseData | undefined): ReviewCheckFlatItem[] => {
    if (!queryData) return []
    const flatItemArray = queryData.topics
        .map((topic) => {
            const topicHeader: ReviewCheckFlatItem = { forWhat: "topicHeader", title: topic.title }
            const stepHeaderArray = topic.steps
                .map((step) => {
                    const stepHeader: ReviewCheckFlatItem = { forWhat: "stepHeader", title: step.title }
                    const flatPagednatedArray: FlatItemForPagenatedQuestions[] = makeFlatPagenatedInStep({
                        topic_order: topic.order,
                        step_order: step.order,
                        questions: step.questions,
                    })
                    return [stepHeader, ...flatPagednatedArray]
                })
                .flat()
            return [topicHeader, ...stepHeaderArray]
        })
        .flat()
    return flatItemArray
}
