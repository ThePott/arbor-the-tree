import type { BookDetail } from "./_bookWriteInterfaces"
import type { BookWriteStoreState } from "./_bookWriteStoreState"

export const makeNewOverlayingValue = (
    rowIndex: number,
    columnKey: keyof BookDetail,
    value: string,
    state: BookWriteStoreState
): string => {
    if (columnKey === "topic") {
        if (value !== "/") {
            throw new Error("---- 중단원, 소단원에는 `/`만 적을 수 있습니다")
        }
        return "placeholder"
    }
    if (columnKey === "step") {
        if (value !== "/") {
            throw new Error("---- 중단원, 소단원에는 `/`만 적을 수 있습니다")
        }
        return "placeholder"
    }

    const rowRightAbove = state.overlayingRowArray[rowIndex - 1]
    const valueRightAbove = rowRightAbove ? rowRightAbove[columnKey] : "1"
    const newValue = value === "/" ? String(Number(valueRightAbove) + 1) : value

    return newValue
}
