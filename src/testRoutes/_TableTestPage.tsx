import Input from "@/packages/components/Input/Input"
import RoundBox from "@/packages/components/RoundBox"
import { useRef } from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { Container } from "@/packages/components/layouts"

const TableTestPage = () => {
    const parentRef = useRef<HTMLDivElement>(null)

    const ROW_COUNT = 2000

    // eslint-disable-next-line react-hooks/incompatible-library
    const rowVirtualizer = useVirtualizer({
        count: ROW_COUNT,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 40,
        overscan: 5,
    })

    return (
        <Container isPadded>
            <RoundBox ref={parentRef} padding="xl" isBordered className="h-[500px] overflow-auto">
                <div style={{ height: `${rowVirtualizer.getTotalSize()}px` }} className="relative w-full">
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => (
                        <Input
                            key={virtualRow.index}
                            defaultValue={String(virtualRow.index)}
                            style={{ transform: `translateY(${virtualRow.start}px)`, height: `${virtualRow.size}px` }}
                            className="absolute top-0 left-0 w-full border border-amber-300"
                        />
                    ))}
                </div>
            </RoundBox>
        </Container>
    )
}

export default TableTestPage
