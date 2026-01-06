import { FlexOneContainer, Hstack } from "@/packages/components/layouts"
import { Vstack } from "@/packages/components/layouts/_Vstack"
import Title from "@/packages/components/Title/Title"
import clsx from "clsx"
import { BOOK_DETAIL_KEY_ARRAY, BOOK_DETAIL_KEY_TO_LABEL } from "../_bookWriteInterfaces"
import BWInputCell from "./_BWInputCell"
import Button from "@/packages/components/Button/Button"
import { useRef } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { BW_DEFAULT_ROW_COUNT } from "../_bookWriteConstants"
import useBookWriteStore from "../bookWriteStore/bookWriteStore"

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
                        <tr className="flex">
                            {BOOK_DETAIL_KEY_ARRAY.map((columnKey) => (
                                <th
                                    key={columnKey}
                                    className="border-border-dim hover:outline-border-muted z-10 flex-1 border px-3 py-2 hover:outline"
                                >
                                    {BOOK_DETAIL_KEY_TO_LABEL[columnKey]}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
                            <tr
                                key={virtualRow.index}
                                style={{
                                    transform: `translateY(${virtualRow.start}px)`,
                                    height: `${virtualRow.size}px`,
                                }}
                                className="absolute left-0"
                            >
                                {BOOK_DETAIL_KEY_ARRAY.map((columnKey) => (
                                    <td
                                        key={columnKey}
                                        className={clsx(
                                            "border-border-dim hover:outline-border-muted z-10 border hover:outline",
                                            columnKey !== "topic" && "text-center"
                                        )}
                                    >
                                        <BWInputCell
                                            key={`${virtualRow.index}_${columnKey}_${rowArray[virtualRow.index][columnKey].value}`}
                                            value={rowArray[virtualRow.index][columnKey].value}
                                            columnKey={columnKey}
                                            rowIndex={virtualRow.index}
                                        />
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
