import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import { useLoaderData } from "@tanstack/react-router"
import type { ExtendedResume } from "../types"

const ResumeBox = ({ resume }: { resume: ExtendedResume }) => {
    return <RoundBox isBordered padding="md"></RoundBox>
}

const ManageResumePage = () => {
    const resumeArray = useLoaderData({ from: "/manage/resume" })
    return (
        <Container isPadded>
            <RoundBox color="bg2" padding="xl">
                <Vstack gap="lg">
                    <Title as="h1" isMuted>
                        지원 현황
                    </Title>
                    <p>여기에 지원서 표로 작성해야 함</p>
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default ManageResumePage
