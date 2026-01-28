import { instance } from "@/packages/api/axiosInstances"
import { FlexOneContainer, Hstack } from "@/packages/components/layouts"
import Toggle from "@/packages/components/Toggle"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi } from "@tanstack/react-router"
import { useState } from "react"
import type { ConciseSyllabus } from "../../types"
import ProgressColumn from "./ProgressColumn"

const route = getRouteApi("/progress/")
const ProgressColumnSection = () => {
    const [isSummarized, setIsSummarized] = useState(false)
    const searchParams = route.useSearch()
    // TODO: 여기서 data 이용해서 session들 보여줘야
    const { data } = useQuery({
        queryKey: ["progressSession", searchParams],
        queryFn: async () => {
            const response = await instance.get("/progress/session", { params: searchParams })
            return response.data as ConciseSyllabus[]
        },
    })

    if (!data) return null

    return (
        <FlexOneContainer className="pt-my-lg pl-my-lg" isXScrollable>
            <Hstack className="items-center">
                <p className="font-semibold">요약</p>
                <Toggle onChange={(value) => setIsSummarized(value)} defaultIsOn={isSummarized} />
            </Hstack>
            <Hstack className="h-full">
                {data.map((conciseSyllabus) => (
                    <ProgressColumn key={conciseSyllabus.id} conciseSyllabus={conciseSyllabus} />
                ))}
            </Hstack>
        </FlexOneContainer>
    )
}

export default ProgressColumnSection
