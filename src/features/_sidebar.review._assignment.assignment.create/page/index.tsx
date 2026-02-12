import Button from "@/packages/components/Button/Button"
import { Container, Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi } from "@tanstack/react-router"
import { makeReviewAssignmentCreateQueryOptions } from "../loader"

const route = getRouteApi("/_sidebar")
const ReviewAssignmentCreatePage = () => {
    const { classroom_id, student_id } = route.useSearch()
    const { data } = useQuery(makeReviewAssignmentCreateQueryOptions({ classroom_id, student_id }))
    const { mutate } = useSimpleMutation({
        method: "post",
        url: "/review/assignment/create",
        queryKey: ["reviewAssignmentCreate", classroom_id, student_id],
        update: () => {},
    })
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
                        <Button
                            padding="wide"
                            color="green"
                            onClick={() => mutate({ body: undefined, additionalData: undefined })}
                        >
                            제작
                        </Button>
                    </Hstack>
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default ReviewAssignmentCreatePage
