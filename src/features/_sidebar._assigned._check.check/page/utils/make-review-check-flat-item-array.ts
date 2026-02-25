import type { ReviewCheckResponseData } from "../../loader"
import type { JoinedQuestion, JoinedQuestionWithIndexInfo, PagenatedQuestions } from "../../types"

type MakeFlatPagenatedInStepProps = {
    titleIndex: number
    subtitleIndex: number
    questions: JoinedQuestion[]
}
const makeFlatPagenatedInStep = ({
    titleIndex,
    subtitleIndex,
    questions,
}: MakeFlatPagenatedInStepProps): FlatItemForPagenatedQuestions[] => {
    const result = questions.reduce((acc: FlatItemForPagenatedQuestions[], question, index) => {
        // TODO: 얜 뭔데
        const targetPagenated = acc.find((elFlatItem) => elFlatItem.pagenatedQuestions.page === question.page)

        const newJoinedQuestionWithIndexInfo: JoinedQuestionWithIndexInfo = {
            indexInfo: {
                titleIndex,
                subtitleIndex,
                checkboxIndex: index,
            },
            question,
        }

        if (targetPagenated) {
            targetPagenated.pagenatedQuestions.questions.push(newJoinedQuestionWithIndexInfo)
            return acc
        }

        const newPagenated: PagenatedQuestions = {
            page: question.page,
            questions: [newJoinedQuestionWithIndexInfo],
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
    | { forWhat: "title"; title: string }
    | { forWhat: "subtitle"; title: string }
    | FlatItemForPagenatedQuestions
export const makeReviewCheckFlatItemArray = (queryData: ReviewCheckResponseData | undefined): ReviewCheckFlatItem[] => {
    if (!queryData) return []
    const flatItemArray = queryData.topics
        .map((topic, titleIndex) => {
            const topicHeader: ReviewCheckFlatItem = { forWhat: "title", title: topic.title }
            const stepHeaderArray = topic.steps
                .map((step, subtitleIndex) => {
                    const stepHeader: ReviewCheckFlatItem = { forWhat: "subtitle", title: step.title }
                    const flatPagednatedArray: FlatItemForPagenatedQuestions[] = makeFlatPagenatedInStep({
                        titleIndex: titleIndex,
                        subtitleIndex: subtitleIndex,
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
