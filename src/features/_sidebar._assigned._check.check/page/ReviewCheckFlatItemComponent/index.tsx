import { ClientError } from "@/shared/error/clientError"
import SubtitleHeader from "../flatItemComponents/SubtitleHeader"
import TitleHeader from "../flatItemComponents/TitleHeader"
import type { ReviewCheckFlatItem } from "../utils/make-review-check-flat-item-array"
import ReviewCheckPagenated from "./ReviewCheckPagenated"

type ReviewCheckFlatItemComponentProps = {
    flatItem: ReviewCheckFlatItem
}
const ReviewCheckFlatItemComponent = ({ flatItem }: ReviewCheckFlatItemComponentProps) => {
    const forWhat = flatItem.forWhat
    switch (forWhat) {
        case "title":
            return <TitleHeader title={flatItem.title} />
        case "subtitle":
            return <SubtitleHeader title={flatItem.title} />
        case "pagenatedQuestions":
            return <ReviewCheckPagenated pagenatedQuestions={flatItem.pagenatedQuestions} />
        default:
            throw ClientError.Unexpected("오답 체크를 보여주는 데에 실패했어요")
    }
}

export default ReviewCheckFlatItemComponent
