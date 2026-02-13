import type { BookWriteRow } from "../../_bookWriteInterfaces"
import { updateOverlayingInRow } from "./handleMutateOtherColumn/updateOverlayings"

type CalculateDashProps = {
    rowIndex: number
    columnKey: keyof BookWriteRow
    value: string
    rowArray: BookWriteRow[]
}
export const calculateDash = ({ rowIndex, columnKey, value, rowArray }: CalculateDashProps) => {
    const regex = /-$/
    const match = value.match(regex)
    if (!match) return

    rowArray.forEach((row, iteratingIndex) => {
        if (iteratingIndex < rowIndex) return
        row[columnKey].value = ""
    })

    updateOverlayingInRow({ startRowIndex: rowIndex, endRowIndex: rowArray.length - 1, rowArray })
}
