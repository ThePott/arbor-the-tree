import { Container, FlexOneContainer, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef } from "react"
import { makeReviewCheckAssignmentFlatItemArray } from "../utils/make-review-check-assignment-flat-item-array"
import { makeReviewCheckFlatItemArray } from "../utils/make-review-check-flat-item-array"
import AssignmentFlatItemComponent from "./AssignmentFlatItemComponent"
import useReviewCheck from "./hooks"
import ReviewCheckCreateToolbar from "./ReviewCheckCreateToolbar"
import ReviewCheckFlatItemComponent from "./ReviewCheckFlatItemComponent"

const ReviewCheckPage = () => {
    const { bookForSession: extendedBook, bookForAssignmentArray: assignmentWithBooksArray } = useReviewCheck()
    const bookFlatItemArray = makeReviewCheckFlatItemArray(extendedBook)
    const assignmentFlatItemArray = makeReviewCheckAssignmentFlatItemArray(assignmentWithBooksArray)
    const isForBook = Boolean(extendedBook)
    const flatItemArray = isForBook ? bookFlatItemArray : assignmentFlatItemArray
    // TODO: cont assignmentsFlatItemArray = makeSomethingFlat(assignmentWithQuestionArray)

    const parentRef = useRef<HTMLDivElement>(null)

    // eslint-disable-next-line react-hooks/incompatible-library
    const rowVirtualizer = useVirtualizer({
        count: flatItemArray.length,
        getScrollElement: () => parentRef.current,
        estimateSize: (index) => {
            const forWhat = flatItemArray[index].forWhat
            switch (forWhat) {
                case "title":
                    return 48
                case "subtitle":
                    return 36
                default:
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
                            {isForBook && (
                                <ReviewCheckFlatItemComponent flatItem={bookFlatItemArray[virtualItem.index]} />
                            )}
                            {!isForBook && (
                                <AssignmentFlatItemComponent flatItem={assignmentFlatItemArray[virtualItem.index]} />
                            )}
                        </div>
                    ))}
                </Container>
            </FlexOneContainer>
        </Vstack>
    )
}

export default ReviewCheckPage
