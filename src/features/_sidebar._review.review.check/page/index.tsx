import { Container, FlexOneContainer, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef } from "react"
import useReviewCheck from "./hooks"
import ReviewCheckCreateToolbar from "./ReviewCheckCreateToolbar"
import ReviewCheckFlatItemComponent from "./ReviewCheckFlatItemComponent"
import { makeReviewCheckFlatItemArray } from "./utils/make-review-check-flat-item-array"

const ReviewCheckPage = () => {
    const { data } = useReviewCheck()
    const flatItemArray = makeReviewCheckFlatItemArray(data)

    const parentRef = useRef<HTMLDivElement>(null)

    // eslint-disable-next-line react-hooks/incompatible-library
    const rowVirtualizer = useVirtualizer({
        count: flatItemArray.length,
        getScrollElement: () => parentRef.current,
        estimateSize: (index) => {
            const forWhat = flatItemArray[index].forWhat
            switch (forWhat) {
                case "topicHeader":
                    return 24
                case "stepHeader":
                    return 24
                case "pagenatedQuestions":
                    return 48
            }
        },
        overscan: 5,
    })

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
            <FlexOneContainer isYScrollable ref={parentRef}>
                <Container
                    isPadded
                    width="md"
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        position: "relative",
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualItem) => (
                        <div
                            key={virtualItem.key}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: `${virtualItem.size}px`,
                                transform: `translateY(${virtualItem.start}px)`,
                            }}
                        >
                            <ReviewCheckFlatItemComponent flatItem={flatItemArray[virtualItem.index]} />
                        </div>
                    ))}
                </Container>
            </FlexOneContainer>
        </Vstack>
    )
}

export default ReviewCheckPage
