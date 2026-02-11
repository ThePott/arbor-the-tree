import type { PagenatedQuestions } from "@/features/_sidebar._review.review.check/types"
import { Hstack } from "@/packages/components/layouts"
import ReviewCheckQuestion from "./ReviewCheckQuestion"

type ReviewCheckPagenatedProps = { pagenatedQuestions: PagenatedQuestions }
const ReviewCheckPagenated = ({ pagenatedQuestions }: ReviewCheckPagenatedProps) => {
    const { page, questions } = pagenatedQuestions
    return (
        <Hstack gap="xs" className="pt-my-sm">
            <p className="size-12 flex justify-center items-center text-fg-muted">{`p.${page}`}</p>
            <div className="grid grid-cols-[repeat(auto-fill,48px)] gap-my-xs grow">
                {questions.map((questionWithOrder) => (
                    <ReviewCheckQuestion key={questionWithOrder.question.id} questionWithOrder={questionWithOrder} />
                ))}
            </div>
        </Hstack>
    )
}

export default ReviewCheckPagenated
