import { Container, FlexOneContainer, Vstack } from "@/packages/components/layouts"
import Skeleton from "@/packages/components/Skeleton"
import CheckboxGrid from "../page/flatItemComponents/CheckboxGrid"

const SkeletonGroup = () => {
    return (
        <>
            <Skeleton widthInPixel={120} heightInPixel={24} className="mt-my-lg mx-auto" />
            <Skeleton widthInPixel={120} heightInPixel={24} className="mt-my-md" />
            <CheckboxGrid>
                {Array(40)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton heightInPixel={48} widthInPixel={48} key={index} className="size-12" />
                    ))}
            </CheckboxGrid>
        </>
    )
}

const ReviewCheckPending = () => {
    return (
        <Vstack gap="none" className="h-full overflow-hidden">
            <div className="p-my-md border-b border-b-border-dim">
                <Skeleton heightInPixel={42} className="w-full" />
            </div>
            <FlexOneContainer className="pt-my-xl pl-my-xl">
                <Container width="md">
                    <Vstack>
                        {Array(4)
                            .fill(0)
                            .map((_, index) => (
                                <SkeletonGroup key={index} />
                            ))}
                    </Vstack>
                </Container>
            </FlexOneContainer>
        </Vstack>
    )
}

export default ReviewCheckPending
