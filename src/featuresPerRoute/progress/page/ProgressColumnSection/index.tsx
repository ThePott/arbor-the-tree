import { instance } from "@/packages/api/axiosInstances"
import { FlexOneContainer, Hstack } from "@/packages/components/layouts"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi } from "@tanstack/react-router"
import ProgressColumn from "./ProgressColumn"

const route = getRouteApi("/progress/")

const ProgressColumnSection = () => {
    const searchParams = route.useSearch()
    const { data } = useQuery({
        queryKey: ["progressSession", searchParams],
        queryFn: () => instance.get("/progress/session", { params: searchParams }),
    })
    return (
        <FlexOneContainer className="pt-my-lg pl-my-lg" isXScrollable>
            <Hstack className="h-full">
                <ProgressColumn />
                <ProgressColumn />
                <ProgressColumn />
                <ProgressColumn />
                <ProgressColumn />
                <ProgressColumn />
            </Hstack>
        </FlexOneContainer>
    )
}

export default ProgressColumnSection
