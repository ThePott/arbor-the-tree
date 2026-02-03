// NOTE: this page shows LIST of review check given by classroom and student from sidebar
// NOTE: student MUST BE selected to render here.

import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"

// NOTE: nothing gets rendered if only classroom is selected
const ReviewCheckPage = () => {
    return (
        <Container isPadded>
            <RoundBox isBordered padding="xl">
                this is review check page
            </RoundBox>
        </Container>
    )
}

export default ReviewCheckPage
