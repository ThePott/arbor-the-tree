import { ClientError } from "@/shared/error/clientError"
import type { ReviewCheckFlatItem } from "../utils/make-review-check-flat-item-array"
import ReviewCheckPagenated from "./ReviewCheckPagenated"
import StepHeader from "./ReviewCheckStepHeader"
import TopicHeader from "./ReviewCheckTopicHeader"

type ReviewCheckFlatItemComponentProps = {
    flatItem: ReviewCheckFlatItem
}
const ReviewCheckFlatItemComponent = ({ flatItem }: ReviewCheckFlatItemComponentProps) => {
    const forWhat = flatItem.forWhat
    switch (forWhat) {
        case "topicHeader":
            return <TopicHeader title={flatItem.title} />
        case "stepHeader":
            return <StepHeader title={flatItem.title} />
        case "pagenatedQuestions":
            return <ReviewCheckPagenated pagenatedQuestions={flatItem.pagenatedQuestions} />
        default:
            throw ClientError.Unexpected("오답 체크를 보여주는 데에 실패했어요")
    }
}

export default ReviewCheckFlatItemComponent
