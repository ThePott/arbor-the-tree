import Button from "@/packages/components/Button/Button"
import { Container, Hstack, Vstack } from "@/packages/components/layouts"
import TabBar, { type Tab } from "@/packages/components/TabBar/TabBar"
import { tableDummyColumns } from "@/testRoutes/_TableDummyColumns"
import { tableDummyData } from "@/testRoutes/_TableDummyData"
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import clsx from "clsx"
import { useState } from "react"
import { useNavigate } from "react-router"

const tabArray: Tab[] = [
    { value: "active", label: "사용 중" },
    { value: "inactive", label: "사용 안 함" },
    { value: "total", label: "전체" },
]

const BookListPage = () => {
    const [_selectedTab, setSelectedTab] = useState<Tab>(tabArray[0])
    const navigate = useNavigate()

    const table = useReactTable({
        columns: tableDummyColumns,
        data: tableDummyData,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Container width="lg" isPadded>
            <Vstack gap="xl">
                <Hstack className="justify-between">
                    <h1 className="text-my-xl font-semibold">문제집 관리</h1>
                    <Button color="green" onClick={() => navigate("/book/write")}>
                        새 문제집 관리
                    </Button>
                </Hstack>
                <TabBar variant="underline" tabArray={tabArray} onSelect={(tab) => setSelectedTab(tab)} />

                <table>
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
                                            "border-border-dim hover:outline-border-muted z-10 border px-3 py-2 hover:outline",
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
            </Vstack>
        </Container>
    )
}

export default BookListPage
