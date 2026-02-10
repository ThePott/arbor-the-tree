import { Container, FlexOneContainer, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import useReviewCheck from "./hooks"
import ReviewCheckCreateToolbar from "./ReviewCheckCreateToolbar"
import ReviewCheckFlatItemComponent from "./ReviewCheckFlatItemComponent"
import { makeReviewCheckFlatItemArray } from "./utils/make-review-check-flat-item-array"

const ReviewCheckPage = () => {
    const { data } = useReviewCheck()
    const flatItemArray = makeReviewCheckFlatItemArray(data)

    if (flatItemArray.length === 0) {
        return (
            <RoundBox padding="xl" isBordered>
                ---- I need to create skeleton for this
            </RoundBox>
        )
    }

    return (
        <Vstack gap="none" className="h-full overflow-hidden">
            <ReviewCheckCreateToolbar />
            <FlexOneContainer isYScrollable>
                <Container isPadded width="md">
                    {flatItemArray.map((flatItem) => (
                        <ReviewCheckFlatItemComponent flatItem={flatItem} />
                    ))}
                </Container>
            </FlexOneContainer>
        </Vstack>
    )
}

export default ReviewCheckPage
