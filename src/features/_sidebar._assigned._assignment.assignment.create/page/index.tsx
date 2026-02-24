import Button from "@/packages/components/Button/Button"
import { Container, Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import TanstackTable from "@/packages/components/TanstackTable"
import Title from "@/packages/components/Title/Title"
import Toggle from "@/packages/components/Toggle"
import { ClientError } from "@/shared/error/clientError"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi, useLoaderData } from "@tanstack/react-router"
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useMemo } from "react"
import { makeReviewAssignmentCreateQueryOptions, type ReviewAssignmentCreateResponseData } from "../loader"

type Row = {
    book_title: string
    review_check_count: number
}
const columnHelper = createColumnHelper<Row>()
const columns = [
    columnHelper.display({ header: "포함", cell: () => <Toggle onChange={() => {}} /> }),
    columnHelper.accessor("book_title", { header: "문제집", cell: ({ getValue }) => getValue() }),
    columnHelper.accessor("review_check_count", { header: "문항 수", cell: ({ getValue }) => getValue() }),
]
const convertDataToRowArray = (data: ReviewAssignmentCreateResponseData | undefined): Row[] => {
    if (!data) return []

    const rowArray = data.map((book) => {
        const row: Row = {
            book_title: book.title,
            review_check_count: book.extendedReviewChecks.length,
        }
        return row
    })
    return rowArray
}

const route = getRouteApi("/_sidebar")
const ReviewAssignmentCreatePage = () => {
    const { classroom_id, student_id } = route.useSearch()
    const { bookWithExtendedReviewChecksArray: loaderData } = useLoaderData({
        from: "/_sidebar/_assigned/_assignment/assignment/create/",
    })
    const { data: queryData } = useQuery(makeReviewAssignmentCreateQueryOptions({ classroom_id, student_id }))
    const { mutate } = useSimpleMutation({
        method: "post",
        url: "/review/assignment/create",
        queryKey: ["reviewAssignmentCreate", classroom_id, student_id],
        update: ({ previous }) => previous,
    })

    const rowArray = useMemo(() => convertDataToRowArray(queryData ?? loaderData), [queryData, loaderData])
    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({ columns, data: rowArray, getCoreRowModel: getCoreRowModel() })

    const {
        extendedStudentArray: { studentArray },
    } = useLoaderData({ from: "/_sidebar" })
    const student = studentArray.find((el) => el.id === student_id)
    const title = `${student?.users.name} / 오답 과제 제작`

    const handleClick = () => {
        if (!student_id) throw ClientError.Unexpected("학생을 선택해주세요")
        const body = {
            student_id,
            classroom_id,
            // NOTE: 지금으로선 토글로 문제집 선택하는 기능은 없다
            // TODO: 문제집 선택하면 거기에 맞춰 필터되게 하기
            bookWithExtendedReviewChecksArray: queryData ?? loaderData,
        }
        mutate({ body, additionalData: undefined })
    }

    if (!student?.users.name) {
        // TODO: 여기 제대로 만들어야
        return <p>학생을 선택해주세요</p>
    }

    return (
        <Container isPadded>
            <RoundBox padding="xl" radius="lg" isShadowed color="bg0">
                <Vstack>
                    <Title as="h1">{title}</Title>

                    {rowArray.length > 0 && (
                        <>
                            <TanstackTable table={table} />

                            <Hstack>
                                <Button padding="wide" border="always" color="transparent">
                                    미리 보기
                                </Button>
                                <Button padding="wide" color="green" onClick={handleClick}>
                                    제작
                                </Button>
                            </Hstack>
                        </>
                    )}
                    {/* TODO: 여기 제대로 만들어야 */}
                    {rowArray.length === 0 && <p>오답 과제로 만들 게 없어요</p>}
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default ReviewAssignmentCreatePage
