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
    bookTitle: string
    questionCount: number
}
const columnHelper = createColumnHelper<Row>()
const columns = [
    columnHelper.display({ header: "포함", cell: () => <Toggle onChange={() => {}} /> }),
    columnHelper.accessor("bookTitle", { header: "문제집", cell: ({ getValue }) => getValue() }),
    columnHelper.accessor("questionCount", { header: "문항 수", cell: ({ getValue }) => getValue() }),
]
const convertDataToRowArray = (data: ReviewAssignmentCreateResponseData | undefined): Row[] => {
    if (!data) return []

    const rowArray = data.map((assignmentCandidateMetaInfo) => {
        const row: Row = {
            bookTitle: assignmentCandidateMetaInfo.bookTitle,
            questionCount: assignmentCandidateMetaInfo.questionCount,
        }
        return row
    })
    return rowArray
}

const route = getRouteApi("/_sidebar")
const ReviewAssignmentCreatePage = () => {
    const { classroom_id, student_id } = route.useSearch()
    const { assignmentCandidateMetaInfoArray: loaderData } = useLoaderData({
        from: "/_sidebar/_assigned/_assignment/assignment/create/",
    })
    const { data: queryData } = useQuery(makeReviewAssignmentCreateQueryOptions({ classroom_id, student_id }))
    const { mutate } = useSimpleMutation({
        method: "post",
        url: "/review/assignment/create",
        queryKey: ["reviewAssignmentCreate", classroom_id, student_id],
        params: { classroom_id, student_id },
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
        // NOTE: 지금으로선 토글로 문제집 선택하는 기능은 없다
        const data = queryData ?? loaderData // NOTE: 이건 메모이즈가 안 된 거라 table에서는 사용하면 안 됨
        const book_ids = data.map((candidate) => candidate.bookId)
        mutate({
            body: {
                book_ids,
            },
            additionalData: undefined,
        })
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
