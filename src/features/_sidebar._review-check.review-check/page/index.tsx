// NOTE: this page shows LIST of review check given by classroom and student from sidebar
// NOTE: student MUST BE selected to render here.

import { instance } from "@/packages/api/axiosInstances"
import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi } from "@tanstack/react-router"

const route = getRouteApi("/_sidebar")

// NOTE: nothing gets rendered if only classroom is selected
const ReviewCheckPage = () => {
    const searchParams = route.useSearch()
    const { data } = useQuery({
        queryKey: ["reviewCheck", searchParams],
        queryFn: async () => {
            const response = await instance.get("/review-check")
            debugger
            return response.data
        },
    })
    return (
        <Container isPadded>
            <RoundBox isBordered padding="xl">
                this is review check page
            </RoundBox>
        </Container>
    )
}

export default ReviewCheckPage
