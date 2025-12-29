import type { BookDetail } from "./_bookWriteInterfaces"
import type { BookWriteStoreState } from "./_bookWriteStoreState"

export const makeNewOverlayingValue = (
    rowIndex: number,
    columnKey: keyof BookDetail,
    value: string,
    state: BookWriteStoreState
): string => {
    const rowRightAbove = state.overlayingRowArray[rowIndex - 1]

    if (columnKey === "topic" || columnKey === "step") {
        if (value !== "/") return value

        const lineArray = columnKey === "topic" ? state.topicArray : state.stepArray
        const valueRightAbove = rowRightAbove ? rowRightAbove[columnKey] : null
        const indexOfValueRightAbove = lineArray.findIndex((line) => line === valueRightAbove)
        const newValue = lineArray[indexOfValueRightAbove + 1] ?? "단원 정보를 더 채워야 합니다"
        return newValue
    }

    const valueRightAbove = rowRightAbove ? rowRightAbove[columnKey] : "1"
    const newValue = value === "/" ? String(Number(valueRightAbove) + 1) : value

    return newValue
}
