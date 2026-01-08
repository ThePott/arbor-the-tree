import { FlexOneContainer, Hstack } from "@/packages/components/layouts"
import { Vstack } from "@/packages/components/layouts/_Vstack"
import Title from "@/packages/components/Title/Title"
import clsx from "clsx"
import Button from "@/packages/components/Button/Button"
import { useRef } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { BW_DEFAULT_ROW_COUNT } from "../_bookWriteConstants"
import useBookWriteStore from "../bookWriteStore/bookWriteStore"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import bookWriteColumnArray from "./_BWTableColumns"

const BWTable = () => {
    const rowArray = useBookWriteStore((state) => state.rowArray)

    // NOTE: for virtual scroll
    const parentRef = useRef<HTMLDivElement>(null)
    // eslint-disable-next-line react-hooks/incompatible-library
    const rowVirtualizer = useVirtualizer({
        count: BW_DEFAULT_ROW_COUNT,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 40,
        overscan: 5,
    })

    const table = useReactTable({
        columns: bookWriteColumnArray,
        data: rowArray,
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
            <FlexOneContainer ref={parentRef} isYScrollable>
                <table style={{ height: `${rowVirtualizer.getTotalSize()}px` }} className="relative w-full">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr className="flex">
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className={clsx(
                                            "border-border-dim hover:outline-border-muted z-10 border px-3 py-2 hover:outline",
                                            header.id === "topic" || header.id === "step" ? "flex-1" : "w-[100px]"
                                        )}
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
                        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
                            <tr
                                key={virtualRow.index}
                                style={{
                                    transform: `translateY(${virtualRow.start}px)`,
                                    height: `${virtualRow.size}px`,
                                }}
                                className="absolute left-0 flex w-full"
                            >
                                {table
                                    .getRowModel()
                                    .rows[virtualRow.index].getVisibleCells()
                                    .map((cell) => {
                                        return (
                                            <td
                                                key={cell.id}
                                                className={clsx(
                                                    "border-border-dim hover:outline-border-muted z-10 border hover:outline",
                                                    cell.column.id === "topic" || cell.column.id === "step"
                                                        ? "flex-1"
                                                        : "w-[100px]"
                                                )}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        )
                                    })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </FlexOneContainer>
        </Vstack>
    )
}

export default BWTable
