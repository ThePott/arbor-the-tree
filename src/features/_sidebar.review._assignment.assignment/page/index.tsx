import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import TabBar, { type Tab } from "@/packages/components/TabBar/TabBar"
import Title from "@/packages/components/Title/Title"

type TabStatus = "uncompleted" | "all"
const tabArray: Tab<TabStatus>[] = [
    { label: "미완", value: "uncompleted" },
    { label: "전체", value: "all" },
]

const ReviewAssignmentPage = () => {
    return (
        <Container isPadded>
            <RoundBox color="bg0" radius="lg" isShadowed padding="xl">
                <Vstack gap="lg">
                    <Title as="h1">오답 과제 목록</Title>
                    <TabBar onSelect={() => {}} tabArray={tabArray} variant="underline" />
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default ReviewAssignmentPage
