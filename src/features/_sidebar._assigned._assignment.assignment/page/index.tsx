import { instance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import TabBar, { type Tab } from "@/packages/components/TabBar/TabBar"
import TanstackTable from "@/packages/components/TanstackTable"
import Title from "@/packages/components/Title/Title"
import {
    type ReviewAssignmentResponseData,
    makeReviewAssignmentQueryOptions,
} from "@/shared/queryOptions/reviewAssignmentQueryOptions"
import { makeFromNow } from "@/shared/utils/dateManipulations"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi, useLoaderData } from "@tanstack/react-router"
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { BookOpen } from "lucide-react"
import { useMemo, useState } from "react"

type TabStatus = "uncompleted" | "all"
const tabArray: Tab<TabStatus>[] = [
    { label: "미완", value: "uncompleted" },
    { label: "전체", value: "all" },
]

type Row = {
    assignmentId: string
    created_at: string // NOTE: ISOString
    completed_at: string | null
    bookTitleArray: string[]
    questionCount: number
}
const columnHelper = createColumnHelper<Row>()
const columns = [
    columnHelper.accessor("assignmentId", { header: "id", cell: ({ getValue }) => getValue() }),
    columnHelper.accessor("created_at", { header: "제작일", cell: ({ getValue }) => makeFromNow(getValue()) }),
    columnHelper.accessor("bookTitleArray", { header: "문제집", cell: ({ getValue }) => getValue().join(", ") }),
    columnHelper.accessor("questionCount", { header: "문항 수", cell: ({ getValue }) => getValue() }),
    columnHelper.display({
        id: "preview",
        header: "미리 보기",
        cell: ({ row }) => (
            <Button
                padding="tight"
                border="onHover"
                onClick={async () => {
                    const response = await instance.get(`/review/assignment/${row.original.assignmentId}/pdf`, {
                        responseType: "blob",
                    })
                    const blob = response.data
                    const url = URL.createObjectURL(blob)
                    window.open(url)
                }}
            >
                <BookOpen />
            </Button>
        ),
    }),
]
type ConvertDataToRowArrayProps = {
    data: ReviewAssignmentResponseData | undefined
    tabStatus: TabStatus
}
const convertDataToRowArray = ({ data, tabStatus }: ConvertDataToRowArrayProps): Row[] => {
    if (!data) return []
    const rowArray: Row[] = data
        .map((assignmentMetaInfo) => ({
            assignmentId: assignmentMetaInfo.id,
            created_at: assignmentMetaInfo.created_at,
            completed_at: assignmentMetaInfo.completed_at,
            bookTitleArray: assignmentMetaInfo.bookTitleArray,
            questionCount: assignmentMetaInfo.questionCount,
        }))
        .filter(({ completed_at }) => {
            switch (tabStatus) {
                case "uncompleted":
                    return !completed_at
                case "all":
                    return true
            }
        })
    return rowArray
}

const route = getRouteApi("/_sidebar")
const ReviewAssignmentPage = () => {
    const { classroom_id, student_id } = route.useSearch()
    const [selectedTab, setSelectedTab] = useState<Tab<TabStatus>>(tabArray[0])

    const { assignmentMetaInfoArray: loaderData } = useLoaderData({
        from: "/_sidebar/_assigned/_assignment/assignment/",
    })
    const { data: queryData } = useQuery(makeReviewAssignmentQueryOptions({ classroom_id, student_id }))

    const rowArray: Row[] = useMemo(
        () => convertDataToRowArray({ data: queryData ?? loaderData, tabStatus: selectedTab.value }),
        [queryData, loaderData, selectedTab]
    )

    // NOTE: MUST MEMOIZE when convert data to rowArray
    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({ columns, getCoreRowModel: getCoreRowModel(), data: rowArray })
    return (
        <Container isPadded>
            <RoundBox color="bg0" radius="lg" isShadowed padding="xl">
                <Vstack gap="lg">
                    <Title as="h1">오답 과제 목록</Title>
                    <TabBar onSelect={(tab) => setSelectedTab(tab)} tabArray={tabArray} variant="underline" />
                    <TanstackTable table={table} />
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default ReviewAssignmentPage
