import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Skeleton from "@/packages/components/Skeleton"

const ReviewAssignmentPending = () => {
    return (
        <Container isPadded>
            <RoundBox radius="lg" isShadowed>
                <Skeleton heightInPixel={300} />
            </RoundBox>
        </Container>
    )
}

export default ReviewAssignmentPending
