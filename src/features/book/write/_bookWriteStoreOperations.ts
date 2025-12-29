import type { BookDetail } from "./_bookWriteInterfaces"
import type { BookWriteStoreState } from "./_bookWriteStoreState"

export const findPreviousOverlayingValue = (
    rowIndex: number,
    columnKey: keyof BookDetail,
    state: BookWriteStoreState
): string | null => {
    const rowRightAbove = state.overlayingRowArray[rowIndex - 1]

    const previousOverlayingValue = rowRightAbove ? rowRightAbove[columnKey] : null
    return previousOverlayingValue
}

// NOTE: "/"를 받았을 때만 핸들링함
export const makeNewOverlayingValue = (
    previousOverlayingValue: string | null,
    columnKey: keyof BookDetail,
    state: BookWriteStoreState
): string => {
    // NOTE: 숫자 열의 경우
    if (columnKey !== "topic" && columnKey !== "step") {
        const newValue = previousOverlayingValue ? String(Number(previousOverlayingValue) + 1) : "1"
        return newValue
    }

    // NOTE: 문자 열의 경우
    const lineArray = columnKey === "topic" ? state.topicArray : state.stepArray
    const indexOfValueRightAbove = lineArray.findIndex((line) => line === previousOverlayingValue)
    const newValue = lineArray[indexOfValueRightAbove + 1] ?? "단원 정보를 더 채워야 합니다"
    return newValue
}
