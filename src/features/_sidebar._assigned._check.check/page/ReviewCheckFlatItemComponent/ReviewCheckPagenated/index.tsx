import type { PagenatedQuestionsForCheckboxGrid } from "@/features/_sidebar._assigned._check.check/types"
import { Hstack } from "@/packages/components/layouts"
import Checkbox from "../../flatItemComponents/Checkbox"
import CheckboxGrid from "../../flatItemComponents/CheckboxGrid"

type ReviewCheckPagenatedProps = { pagenatedQuestions: PagenatedQuestionsForCheckboxGrid }
const ReviewCheckPagenated = ({ pagenatedQuestions }: ReviewCheckPagenatedProps) => {
    const { page, questions } = pagenatedQuestions
    return (
        <Hstack gap="xs" className="mt-my-sm">
            <p className="size-12 flex justify-center items-center text-fg-muted">{`p.${page}`}</p>
            <CheckboxGrid>
                {questions.map(({ question, indexInfo }) => (
                    <Checkbox key={question.id} forWhat="syllabus" source={question} indexInfo={indexInfo}>
                        {question.name}
                    </Checkbox>
                ))}
            </CheckboxGrid>
        </Hstack>
    )
}

export default ReviewCheckPagenated
