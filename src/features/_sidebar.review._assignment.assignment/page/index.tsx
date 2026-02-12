import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import TabBar, { type Tab } from "@/packages/components/TabBar/TabBar"
import TanstackTable from "@/packages/components/TanstackTable"
import Title from "@/packages/components/Title/Title"
import { makeFromNow } from "@/shared/utils/dateManipulations"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi } from "@tanstack/react-router"
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { makeReviewAssignmentQueryOptions } from "../loader"

type TabStatus = "uncompleted" | "all"
const tabArray: Tab<TabStatus>[] = [
    { label: "미완", value: "uncompleted" },
    { label: "전체", value: "all" },
]

type Row = {
    created_at: string // NOTE: ISOString
    book_title: string[]
    question_count: number
}
const columnHelper = createColumnHelper<Row>()
const columns = [
    columnHelper.accessor("created_at", { header: "제작일", cell: ({ getValue }) => makeFromNow(getValue()) }),
    columnHelper.accessor("book_title", { header: "문제집", cell: ({ getValue }) => getValue().join(", ") }),
    columnHelper.accessor("question_count", { header: "문항 수", cell: ({ getValue }) => getValue() }),
]
// TODO: delete this after connecting to api
const TEMPORARY_ROW_ARRAY: Row[] = [
    { created_at: "2026-02-12T04:54:43.114Z", book_title: ["이런 책", "저런 책"], question_count: 21 },
    { created_at: "2026-02-10T04:54:43.114Z", book_title: ["이런 책", "저런 책"], question_count: 21 },
]

const route = getRouteApi("/_sidebar")
const ReviewAssignmentPage = () => {
    const { classroom_id, student_id } = route.useSearch()

    const { data } = useQuery(makeReviewAssignmentQueryOptions({ classroom_id, student_id }))
    // NOTE: MUST MEMOIZE when convert data to rowArray
    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({ columns, getCoreRowModel: getCoreRowModel(), data: TEMPORARY_ROW_ARRAY })
    return (
        <Container isPadded>
            <RoundBox color="bg0" radius="lg" isShadowed padding="xl">
                <Vstack gap="lg">
                    <Title as="h1">오답 과제 목록</Title>
                    <TabBar onSelect={() => {}} tabArray={tabArray} variant="underline" />
                    <p>{JSON.stringify(data)}</p>
                    <TanstackTable table={table} />
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default ReviewAssignmentPage
