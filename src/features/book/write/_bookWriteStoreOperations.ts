import type { BookDetail } from "./_bookWriteInterfaces"
import type { BookWriteStoreState } from "./_bookWriteStoreState"

export const makeNewOverlayingValue = (
    rowIndex: number,
    columnKey: keyof BookDetail,
    value: string,
    state: BookWriteStoreState
): string => {
    const rowRightAbove = state.overlayingRowArray[rowIndex - 1]

    if (columnKey === "topic") {
        if (value !== "/") return value

        const topicArray = state.topicArray
        const valueRightAbove = rowRightAbove ? rowRightAbove[columnKey] : null
        const indexOfValueRightAbove = topicArray.findIndex((topic) => topic === valueRightAbove)
        const newValue = topicArray[indexOfValueRightAbove + 1]
        if (!newValue) throw new Error("---- 중단원, 소단원 정보를 더 채워야 합니다")
        return newValue
    }

    if (columnKey === "step") {
        if (value !== "/") throw new Error("---- 중단원, 소단원에는 `/`만 적을 수 있습니다")

        const stepArray = state.stepArray
        const valueRightAbove = rowRightAbove
            ? rowRightAbove[columnKey]
            : (stepArray[0] ?? "중단원, 소단원 정보를 먼저 기입해주세요")
        const indexOfValueRightAbove = stepArray.findIndex((topic) => topic === valueRightAbove)
        if (indexOfValueRightAbove === -1) throw new Error("---- 중단원, 소단원 정보를 더 채워야 합니다")
        const newValue = stepArray[indexOfValueRightAbove + 1]
        if (!newValue) throw new Error("---- 중단원, 소단원 정보를 더 채워야 합니다")
        return newValue
    }

    const valueRightAbove = rowRightAbove ? rowRightAbove[columnKey] : "1"
    const newValue = value === "/" ? String(Number(valueRightAbove) + 1) : value

    return newValue
}
