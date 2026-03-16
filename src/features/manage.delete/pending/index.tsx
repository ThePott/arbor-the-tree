import ExpandableDiv from "@/packages/components/ExpandableDiv/ExpendableDiv"
import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Skeleton from "@/packages/components/Skeleton"
import useMediaQuery from "@/shared/utils/use-media-query"

const ManageDeletePendingSmall = () => {
    return (
        <RoundBox padding="xl">
            <Vstack gap="lg">
                <Skeleton radius="md" heightInPixel={21} widthInPixel={120} />
                <Skeleton radius="md" heightInPixel={154} />
            </Vstack>
        </RoundBox>
    )
}
const ManageDeletePendingBig = () => {
    return (
        <ExpandableDiv>
            <Container width="lg" isPadded>
                <Skeleton radius="md" heightInPixel={298} isShadowed />
            </Container>
        </ExpandableDiv>
    )
}

const ManageDeletePending = () => {
    const { isBig } = useMediaQuery()

    if (isBig) return <ManageDeletePendingBig />
    return <ManageDeletePendingSmall />
}

export default ManageDeletePending
