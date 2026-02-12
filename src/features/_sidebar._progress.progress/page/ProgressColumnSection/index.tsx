import { instance } from "@/packages/api/axiosInstances"
import { FlexOneContainer, Hstack, Vstack } from "@/packages/components/layouts"
import Toggle from "@/packages/components/Toggle"
import { debugCache, debugRender } from "@/shared/config/debug/"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi } from "@tanstack/react-router"
import { useState } from "react"
import type { ConciseSyllabus } from "../../types"
import ProgressColumn from "./ProgressColumn"
import ProgressColumnSummarizedMany from "./ProgressColumnSummarizedMany"

const route = getRouteApi("/_sidebar")
const ProgressColumnSection = () => {
    debugRender("ProgressColumnSection")
    const [isSummarized, setIsSummarized] = useState(false)
    const searchParams = route.useSearch()
    const { classroom_id, student_id, syllabus_id } = searchParams
    const { data } = useQuery({
        // NOTE: query key에는 syllabus_id를 따로 분리해야함. 그리고 invalidate 할 때는 syllabus 제외하고 해야 전체가 갱신됨
        // TODO: useSimpleMutation에서 queryKey를 통째로 받는 걸로 해야 하려나...
        queryKey: ["progressSession", classroom_id, student_id, syllabus_id],
        queryFn: async () => {
            // NOTE: api에 넘길 땐 searchParams 모두 사용해야 함 (문제집 하나만 볼 수도 있으니)
            const response = await instance.get("/progress/syllabus-with-sessions", { params: searchParams })
            return response.data as ConciseSyllabus[]
        },
        enabled: Boolean(classroom_id || student_id),
    })
    debugCache("ProgressColumnSection data", data)

    if (!data) return null

    const conciseSyllabusArray = syllabus_id
        ? data.filter((conciseSyllabus) => conciseSyllabus.id === syllabus_id)
        : data

    return (
        <FlexOneContainer isXScrollable className="pt-my-lg pl-my-lg">
            <Vstack gap="none" className="h-full">
                <Toggle onChange={(value) => setIsSummarized(value)} defaultIsOn={isSummarized}>
                    요약
                </Toggle>
                <Hstack className="flex-1 overflow-y-hidden pb-my-lg">
                    {!isSummarized && (
                        <>
                            {conciseSyllabusArray.map((conciseSyllabus) => (
                                <ProgressColumn key={conciseSyllabus.id} conciseSyllabus={conciseSyllabus} />
                            ))}
                        </>
                    )}
                    {isSummarized && <ProgressColumnSummarizedMany conciseSyllabusArray={conciseSyllabusArray} />}
                </Hstack>
            </Vstack>
        </FlexOneContainer>
    )
}

export default ProgressColumnSection
