import { FlexOneContainer, Hstack } from "@/packages/components/layouts"
import { Vstack } from "@/packages/components/layouts/_Vstack"
import Title from "@/packages/components/Title/Title"
import clsx from "clsx"
import { BOOK_DETAIL_KEY_ARRAY, BOOK_DETAIL_KEY_TO_LABEL } from "../_bookWriteInterfaces"
import BWInputCell from "./_BWInputCell"
import useBookWriteStore from "../_bookWriteStore"
import Button from "@/packages/components/Button/Button"
import { withHeadInstance } from "@/packages/api/axiosInstances"
import AutoComplete from "@/packages/components/AutoComplete/AutoComplete"
import { useRef } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { BW_DEFAULT_ROW_COUNT } from "../_bookWriteConstants"

const getBookDetail = async (searchText: string) => {
    const params = { query: searchText }
    const response = await withHeadInstance.get("/book/detail", { params })

    return response.data
}

const BWTable = () => {
    const parentRef = useRef<HTMLDivElement>(null)
    const rowArray = useBookWriteStore((state) => state.rowArray)
    const updateActualValues = useBookWriteStore((state) => state.updateRowArray)

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
                        <tr>
                            {BOOK_DETAIL_KEY_ARRAY.map((columnKey) => (
                                <th
                                    key={columnKey}
                                    className="border-border-dim hover:outline-border-muted z-10 border px-3 py-2 hover:outline"
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
                                        {columnKey === "sub_question_name" && (
                                            <AutoComplete
                                                available="onlyExisting"
                                                getOptionArray={getBookDetail}
                                                onValueChange={(value, isError) => {
                                                    if (isError) return
                                                    updateActualValues(virtualRow.index, columnKey, value)
                                                }}
                                                outerIsRed={false}
                                                queryKey={["bookDetail"]}
                                                colorChangeIn="fill"
                                                variant="ghost"
                                            />
                                        )}
                                        {columnKey !== "sub_question_name" && (
                                            <BWInputCell
                                                value={rowArray[virtualRow.index][columnKey]}
                                                columnKey={columnKey}
                                                rowIndex={virtualRow.index}
                                            />
                                        )}
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
