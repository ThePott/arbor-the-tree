import useProfileQuery from "@/features/mypage/_useProfileQuery"
import { withHeadInstance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import { Container, Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import useGlobalStore from "@/shared/store/globalStore"

const acceptResume = async () => {
    await withHeadInstance.post("/auth/resume/accept")
}

const ResumeTestPage = () => {
    useProfileQuery()
    const resume = useGlobalStore((state) => state.resume)
    return (
        <Container isPadded>
            <RoundBox isBordered padding="xl">
                <Hstack>
                    <RoundBox isBordered>{JSON.stringify(resume)}</RoundBox>
                    <Vstack>
                        <Button color="green" onClick={acceptResume}>
                            승인
                        </Button>
                    </Vstack>
                </Hstack>
            </RoundBox>
        </Container>
    )
}

export default ResumeTestPage
