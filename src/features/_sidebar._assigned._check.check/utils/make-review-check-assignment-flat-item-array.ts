import type { ReviewCheckAssignmentResponseData } from "../loader"
import type { AssignmentFlatItem } from "../page/AssignmentFlatItemComponent"
import type { WrappedQuestionForCheckbox } from "../types"

export const makeReviewCheckAssignmentFlatItemArray = (
    queryData: ReviewCheckAssignmentResponseData | undefined
): AssignmentFlatItem[] => {
    if (!queryData) return []
    const flatItemArray = queryData.flatMap((assignment, titleIndex) => {
        const bookTitleArray = assignment.books.map(({ title }) => title)
        const questions = assignment.books.flatMap(({ questions }) => questions)
        const titleHeader: AssignmentFlatItem = {
            forWhat: "title",
            title: `${assignment.created_at.slice(0, 10)} __${bookTitleArray.join(", ")} (${questions.length}문제)`,
        }
        const subtitleHeaderGroupArray = assignment.books.flatMap((book, subtitleIndex) => {
            const subtitleHeader: AssignmentFlatItem = { forWhat: "subtitle", title: book.title }
            const wrappedQuestionArray: WrappedQuestionForCheckbox[] = book.questions.map(
                (question, checkboxIndex) => ({
                    question,
                    indexInfo: {
                        titleIndex,
                        subtitleIndex,
                        checkboxIndex,
                    },
                })
            )
            const questions: AssignmentFlatItem = {
                forWhat: "questions",
                questions: wrappedQuestionArray,
            }
            return [subtitleHeader, questions]
        })
        return [titleHeader, ...subtitleHeaderGroupArray]
    })
    return flatItemArray
}
