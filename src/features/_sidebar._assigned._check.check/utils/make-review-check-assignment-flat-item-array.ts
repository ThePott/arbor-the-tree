import type { ReviewCheckAssignmentResponseData } from "../loader"
import type { AssignmentFlatItem } from "../page/AssignmentFlatItemComponent"

export const makeReviewCheckAssignmentFlatItemArray = (
    queryData: ReviewCheckAssignmentResponseData | undefined
): AssignmentFlatItem[] => {
    if (!queryData) return []
    const flatItemArray = queryData.flatMap((assignment, titleIndex) => {
        const bookTitleArray = assignment.books.map((book) => book.bookTitle)
        const titleHeader: AssignmentFlatItem = {
            forWhat: "title",
            title: `${assignment.created_at.slice(0, 10)} __${bookTitleArray.join(", ")} (${assignment.question_count}문제)`,
        }
        const subtitleHeaderGroupArray = assignment.books.flatMap((book, subtitleIndex) => {
            const subtitleHeader: AssignmentFlatItem = { forWhat: "subtitle", title: book.bookTitle }
            const assignmentQuestions: AssignmentFlatItem = {
                forWhat: "assignmentQuestions",
                assignmentQuestionForCheckboxArray: book.reviewAssignmentQuestions.map(
                    (assignmentQuestion, checkboxIndex) => ({
                        assignmentQuestion,
                        indexInfo: { titleIndex, subtitleIndex, checkboxIndex },
                        assignment_id: assignment.id,
                    })
                ),
            }
            return [subtitleHeader, assignmentQuestions]
        })
        return [titleHeader, ...subtitleHeaderGroupArray]
    })
    return flatItemArray
}
