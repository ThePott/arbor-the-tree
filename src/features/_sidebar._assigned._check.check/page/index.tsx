import { Container, FlexOneContainer, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef } from "react"
import useReviewCheck from "./hooks"
import ReviewCheckCreateToolbar from "./ReviewCheckCreateToolbar"
import ReviewCheckFlatItemComponent from "./ReviewCheckFlatItemComponent"
import { makeReviewCheckFlatItemArray } from "./utils/make-review-check-flat-item-array"

const ReviewCheckPage = () => {
    const { extendedBook, assignmentWithQuestionsArray } = useReviewCheck()
    const flatItemArray = makeReviewCheckFlatItemArray(extendedBook)
    // TODO: cont assignmentsFlatItemArray = makeSomethingFlat(assignmentWithQuestionArray)

    const parentRef = useRef<HTMLDivElement>(null)

    // eslint-disable-next-line react-hooks/incompatible-library
    const rowVirtualizer = useVirtualizer({
        count: flatItemArray.length,
        getScrollElement: () => parentRef.current,
        estimateSize: (index) => {
            const forWhat = flatItemArray[index].forWhat
            switch (forWhat) {
                // TODO: titleHeader
                case "topicHeader":
                    return 48
                // TODO: subtitleHeader
                case "stepHeader":
                    return 36
                // TODO: default
                case "pagenatedQuestions":
                    return 60
            }
        },
        overscan: 5,
        measureElement: (element, _entry, _instance) => element.getBoundingClientRect().height,
        paddingStart: 48,
        paddingEnd: 48,
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
                            ref={rowVirtualizer.measureElement}
                            data-index={virtualItem.index}
                            style={{
                                transform: `translateY(${virtualItem.start}px)`,
                            }}
                            className="absolute top-0 left-my-xl w-full"
                        >
                            {/* 어떤 걸 사용하냐에 따라 달라지게 */}
                            <ReviewCheckFlatItemComponent flatItem={flatItemArray[virtualItem.index]} />
                        </div>
                    ))}
                </Container>
            </FlexOneContainer>
        </Vstack>
    )
}

export default ReviewCheckPage
