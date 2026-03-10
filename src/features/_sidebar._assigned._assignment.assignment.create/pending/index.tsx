import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Skeleton from "@/packages/components/Skeleton"

const ReviewAssignmentCreatePending = () => {
    return (
        <Container isPadded>
            <RoundBox radius="lg" isShadowed>
                <Skeleton heightInPixel={259} />
            </RoundBox>
        </Container>
    )
}

export default ReviewAssignmentCreatePending
