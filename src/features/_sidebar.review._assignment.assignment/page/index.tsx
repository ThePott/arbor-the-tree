import { instance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import TabBar, { type Tab } from "@/packages/components/TabBar/TabBar"
import TanstackTable from "@/packages/components/TanstackTable"
import Title from "@/packages/components/Title/Title"
import { makeFromNow } from "@/shared/utils/dateManipulations"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi, useLoaderData } from "@tanstack/react-router"
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { BookOpen } from "lucide-react"
import { useMemo } from "react"
import { makeReviewAssignmentQueryOptions, type ReviewAssignmentResponseData } from "../loader"

type TabStatus = "uncompleted" | "all"
const tabArray: Tab<TabStatus>[] = [
    { label: "미완", value: "uncompleted" },
    { label: "전체", value: "all" },
]

type Row = {
    assignmentId: string
    assigned_at: string // NOTE: ISOString
    completed_at: string | null
    bookTitleArray: string[]
    questionCount: number
}
const columnHelper = createColumnHelper<Row>()
const columns = [
    columnHelper.accessor("assigned_at", { header: "제작일", cell: ({ getValue }) => makeFromNow(getValue()) }),
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
                    const response = await instance.get(`assignment/${row.original.assignmentId}`, {
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
const convertDataToRowArray = (data: ReviewAssignmentResponseData | undefined): Row[] => {
    if (!data) return []
    const rowArray: Row[] = data.map((assignmentMetaInfo) => ({
        assignmentId: assignmentMetaInfo.id,
        assigned_at: assignmentMetaInfo.assigned_at,
        completed_at: assignmentMetaInfo.completed_at,
        bookTitleArray: assignmentMetaInfo.bookTitleArray,
        questionCount: assignmentMetaInfo.questionCount,
    }))
    return rowArray
}

const route = getRouteApi("/_sidebar")
const ReviewAssignmentPage = () => {
    const { classroom_id, student_id } = route.useSearch()

    const loaderData = useLoaderData({ from: "/_sidebar/review/_assignment/assignment/" })
    const { data: queryData } = useQuery(makeReviewAssignmentQueryOptions({ classroom_id, student_id }))

    const rowArray: Row[] = useMemo(() => convertDataToRowArray(queryData ?? loaderData), [queryData, loaderData])

    // NOTE: MUST MEMOIZE when convert data to rowArray
    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({ columns, getCoreRowModel: getCoreRowModel(), data: rowArray })
    return (
        <Container isPadded>
            <RoundBox color="bg0" radius="lg" isShadowed padding="xl">
                <Vstack gap="lg">
                    <Title as="h1">오답 과제 목록</Title>
                    <TabBar onSelect={() => {}} tabArray={tabArray} variant="underline" />
                    <TanstackTable table={table} />
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default ReviewAssignmentPage
