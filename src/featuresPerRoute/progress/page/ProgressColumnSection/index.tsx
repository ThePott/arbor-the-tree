import { instance } from "@/packages/api/axiosInstances"
import { Hstack, Vstack } from "@/packages/components/layouts"
import Toggle from "@/packages/components/Toggle"
import { debugCache, debugRender } from "@/shared/config/debug/"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi } from "@tanstack/react-router"
import { useState } from "react"
import type { ConciseSyllabus } from "../../types"
import ProgressColumn from "./ProgressColumn"
import ProgressColumnSummarizedMany from "./ProgressColumnSummarizedMany"

const route = getRouteApi("/progress/")
const ProgressColumnSection = () => {
    debugRender("ProgressColumnSection")
    const [isSummarized, setIsSummarized] = useState(false)
    const { classroom_id, student_id, syllabus_id } = route.useSearch()
    const params = { classroom_id, student_id }
    // TODO: 여기서 data 이용해서 session들 보여줘야
    const { data } = useQuery({
        queryKey: ["progressSession", params],
        queryFn: async () => {
            const response = await instance.get("/progress/syllabus-with-sessions", { params })
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
        <div className="pt-my-lg pl-my-lg flex-1">
            <Vstack gap="none" className="h-full">
                <Hstack className="items-center">
                    <p className="font-semibold">요약</p>
                    <Toggle onChange={(value) => setIsSummarized(value)} defaultIsOn={isSummarized} />
                </Hstack>
                <Hstack className="flex-1 overflow-hidden pb-my-lg">
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
        </div>
    )
}

export default ProgressColumnSection
