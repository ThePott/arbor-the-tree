import type { PagenatedQuestions } from "@/features/_sidebar._assigned._check.check/types"
import { Hstack } from "@/packages/components/layouts"
import CheckboxGrid from "../../flatItemComponents/CheckboxGrid"
import ReviewCheckQuestion from "./ReviewCheckQuestion"

type ReviewCheckPagenatedProps = { pagenatedQuestions: PagenatedQuestions }
const ReviewCheckPagenated = ({ pagenatedQuestions }: ReviewCheckPagenatedProps) => {
    const { page, questions } = pagenatedQuestions
    return (
        <Hstack gap="xs" className="mt-my-sm">
            <p className="size-12 flex justify-center items-center text-fg-muted">{`p.${page}`}</p>
            <CheckboxGrid>
                {questions.map((questionWithOrder) => (
                    <ReviewCheckQuestion
                        key={questionWithOrder.question.id}
                        questionWithIndexInfo={questionWithOrder}
                    />
                ))}
            </CheckboxGrid>
        </Hstack>
    )
}

export default ReviewCheckPagenated
