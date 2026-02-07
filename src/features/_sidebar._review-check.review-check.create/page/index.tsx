// NOTE: this page shows LIST of review check given by classroom and student from sidebar
// NOTE: student MUST BE selected to render here.

import { instance } from "@/packages/api/axiosInstances"
import { Container, FlexOneContainer, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi } from "@tanstack/react-router"
import type { ReviewCheckCreateResponseData } from "../types"
import ReviewCheckCreateToolbar from "./ReviewCheckCreateToolbar"
import ReviewCheckTopic from "./ReviewCheckTopic"

const route = getRouteApi("/_sidebar")

// NOTE: nothing gets rendered if only classroom is selected
const ReviewCheckCreatePage = () => {
    // const changedReviewChecks = useReviewCheckCreateStore((state) => state.changedReviewChecks)
    // console.log({ changedReviewChecks })
    const searchParams = route.useSearch()
    const { data } = useQuery({
        queryKey: ["reviewCheckCreate", searchParams],
        queryFn: async () => {
            const response = await instance.get("/review-check/create", { params: searchParams })
            return response.data as ReviewCheckCreateResponseData
        },
    })
    if (!data)
        return (
            <RoundBox padding="xl" isBordered>
                ---- I need to create skeleton for this
            </RoundBox>
        )

    return (
        <Vstack gap="none" className="h-full overflow-hidden">
            <ReviewCheckCreateToolbar />
            <FlexOneContainer isYScrollable>
                <Container isPadded width="md">
                    <Title as="h1" className="text-center">{`${data.title} 오답체크`}</Title>
                    <Vstack>
                        {data.topics.map((topic) => (
                            <ReviewCheckTopic key={topic.title} topic={topic} />
                        ))}
                    </Vstack>
                </Container>
            </FlexOneContainer>
        </Vstack>
    )
}

export default ReviewCheckCreatePage
