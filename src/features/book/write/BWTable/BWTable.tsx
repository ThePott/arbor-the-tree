import Input from "@/packages/components/Input/Input"
import { FlexOneContainer } from "@/packages/components/layouts"
import { Vstack } from "@/packages/components/layouts/_Vstack"
import Title from "@/packages/components/Title/Title"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import clsx from "clsx"

interface BookDetail {
    topic: string
    step: string
    question_name: string
    question_page: number
    solution_page: number
    session: number
}

const data: BookDetail[] = Array(1000).fill({}) as BookDetail[]

const columnHelper = createColumnHelper<BookDetail>()

const columns = [
    columnHelper.accessor("topic", {
        header: "중단원",
        cell: (info) => <Input colorChangeIn="fill" variant="ghost" defaultValue={info.getValue()} />,
    }),
    columnHelper.accessor("step", {
        header: "소단원",
        cell: (info) => <Input colorChangeIn="fill" variant="ghost" defaultValue={info.getValue()} />,
    }),
    columnHelper.accessor("question_name", {
        header: "문제 번호",
        cell: (info) => <Input colorChangeIn="fill" variant="ghost" defaultValue={info.getValue()} />,
    }),
    columnHelper.accessor("question_page", {
        header: "문제 쪽 번호",
        cell: (info) => <Input colorChangeIn="fill" variant="ghost" defaultValue={info.getValue()} />,
    }),
    columnHelper.accessor("solution_page", {
        header: "정답 쪽 번호",
        cell: (info) => <Input colorChangeIn="fill" variant="ghost" defaultValue={info.getValue()} />,
    }),
    columnHelper.accessor("session", {
        header: "묶음 번호",
        cell: (info) => <Input colorChangeIn="fill" variant="ghost" defaultValue={info.getValue()} />,
    }),
]

const BWTable = () => {
    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

    return (
        <Vstack className="h-full grow">
            <Title as="h2" isMuted>
                문제 정보 기입
            </Title>
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
