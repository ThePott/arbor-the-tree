import { FlexOneContainer, Hstack } from "@/packages/components/layouts"
import { Vstack } from "@/packages/components/layouts/_Vstack"
import Title from "@/packages/components/Title/Title"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import clsx from "clsx"
import type { BookDetail } from "../_bookWriteInterfaces"
import BWInputCell from "./_BWInputCell"
import useBookWriteStore from "../_bookWriteStore"
import Button from "@/packages/components/Button/Button"
import AutoComplete from "@/packages/components/AutoComplete/AutoComplete"
import { withHeadInstance } from "@/packages/api/axiosInstances"

const columnHelper = createColumnHelper<BookDetail>()

const getBookDetail = async (searchText: string) => {
    const params = { query: searchText }
    const response = await withHeadInstance.get("/book/detail", { params })

    return response.data
}

const columns = [
    columnHelper.accessor("topic", {
        header: "중단원",
        cell: (info) => <BWInputCell {...info} />,
    }),
    columnHelper.accessor("step", {
        header: "소단원",
        cell: (info) => <BWInputCell {...info} />,
    }),
    columnHelper.accessor("question_name", {
        header: "문제 번호",
        cell: (info) => <BWInputCell {...info} />,
    }),
    columnHelper.accessor("question_page", {
        header: "문제 쪽 번호",
        cell: (info) => <BWInputCell {...info} />,
    }),
    columnHelper.accessor("solution_page", {
        header: "정답 쪽 번호",
        cell: (info) => <BWInputCell {...info} />,
    }),
    columnHelper.accessor("session", {
        header: "묶음 번호",
        cell: (info) => <BWInputCell {...info} />,
    }),
    columnHelper.accessor("sub_question_name", {
        header: "하위 문제",
        cell: (info) => (
            <AutoComplete
                available="onlyExisting"
                onValueChange={() => {}}
                getOptionArray={getBookDetail}
                queryKey={["bookDetail"]}
                outerIsRed={false}
                defaultValue={info.getValue()}
                variant="ghost"
                colorChangeIn="fill"
            />
        ),
    }),
]

const BWTable = () => {
    const tableData = useBookWriteStore((state) => state.tableData)
    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Vstack className="h-full grow">
            <Hstack className="justify-between">
                <Title as="h2" isMuted>
                    문제 정보 기입
                </Title>
                <Button color="green">등록</Button>
            </Hstack>
            <FlexOneContainer isYScrollable>
                <table className="w-full">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="border-border-dim hover:outline-border-muted z-10 border px-3 py-2 hover:outline"
                                    >
                                        {header.isPlaceholder
                                            ? "this is header placeholder"
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className={clsx(
                                            "border-border-dim hover:outline-border-muted z-10 border hover:outline",
                                            cell.column.id !== "title" && "text-center"
                                        )}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </FlexOneContainer>
        </Vstack>
    )
}

export default BWTable
