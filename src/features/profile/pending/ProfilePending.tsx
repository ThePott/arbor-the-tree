import ExpandableDiv from "@/packages/components/ExpandableDiv/ExpendableDiv"
import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Skeleton from "@/packages/components/Skeleton"
import useMediaQuery from "@/shared/utils/use-media-query"

const ProfilePendingSmall = () => {
    return (
        <RoundBox padding="xl">
            <Vstack gap="lg">
                <Vstack gap="sm">
                    <Skeleton radius="md" heightInPixel={16} />
                    <Skeleton radius="md" heightInPixel={40} />
                </Vstack>
                <Vstack gap="sm">
                    <Skeleton radius="md" heightInPixel={16} />
                    <Skeleton radius="md" heightInPixel={40} />
                </Vstack>
                <Vstack gap="sm">
                    <Skeleton radius="md" heightInPixel={16} />
                    <Skeleton radius="md" heightInPixel={40} />
                </Vstack>
                <div />
                <Skeleton radius="md" heightInPixel={40} />
            </Vstack>
        </RoundBox>
    )
}
const ProfilePendingBig = () => {
    return (
        <ExpandableDiv>
            <Container width="md" isPadded>
                <Skeleton radius="lg" heightInPixel={418} isShadowed />
            </Container>
        </ExpandableDiv>
    )
}

const ProfilePending = () => {
    const { isBig } = useMediaQuery()
    if (isBig) return <ProfilePendingBig />
    return <ProfilePendingSmall />
}

export default ProfilePending
