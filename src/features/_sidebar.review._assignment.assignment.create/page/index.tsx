import Button from "@/packages/components/Button/Button"
import { Container, Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi } from "@tanstack/react-router"
import { makeReviewAssignmentCreateQueryOptions } from "../loader"

const route = getRouteApi("/_sidebar")
const ReviewAssignmentCreatePage = () => {
    const { classroom_id, student_id } = route.useSearch()
    const { data } = useQuery(makeReviewAssignmentCreateQueryOptions({ classroom_id, student_id }))
    return (
        <Container isPadded>
            <RoundBox padding="xl" radius="lg" isShadowed color="bg0">
                <Vstack>
                    <Title as="h1">오답 과제 제작</Title>

                    <p>{JSON.stringify(data)}</p>

                    <Hstack>
                        <Button padding="wide" border="always" color="transparent">
                            미리 보기
                        </Button>
                        <Button padding="wide" color="green">
                            제작
                        </Button>
                    </Hstack>
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default ReviewAssignmentCreatePage
