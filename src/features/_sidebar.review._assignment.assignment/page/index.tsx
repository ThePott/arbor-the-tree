import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import TabBar, { type Tab } from "@/packages/components/TabBar/TabBar"
import TanstackTable from "@/packages/components/TanstackTable"
import Title from "@/packages/components/Title/Title"
import { makeFromNow } from "@/shared/utils/dateManipulations"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi, useLoaderData } from "@tanstack/react-router"
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useMemo } from "react"
import { makeReviewAssignmentQueryOptions, type ReviewAssignmentResponseData } from "../loader"

type TabStatus = "uncompleted" | "all"
const tabArray: Tab<TabStatus>[] = [
    { label: "미완", value: "uncompleted" },
    { label: "전체", value: "all" },
]

type Row = {
    assigned_at: string // NOTE: ISOString
    book_title_array: string[]
    question_count: number
}
const columnHelper = createColumnHelper<Row>()
const columns = [
    columnHelper.accessor("assigned_at", { header: "제작일", cell: ({ getValue }) => makeFromNow(getValue()) }),
    columnHelper.accessor("book_title_array", { header: "문제집", cell: ({ getValue }) => getValue().join(", ") }),
    columnHelper.accessor("question_count", { header: "문항 수", cell: ({ getValue }) => getValue() }),
]
const convertDataToRowArray = (data: ReviewAssignmentResponseData | undefined): Row[] => {
    if (!data) return []
    const rowArray: Row[] = data.map((extendedReviewAssignment) => ({
        assigned_at: extendedReviewAssignment.assigned_at,
        book_title_array: extendedReviewAssignment.books.map(({ title }) => title),
        question_count: extendedReviewAssignment.books.flatMap((book) => book.reviewAssignmentQuestions).length,
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
