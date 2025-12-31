import type { BookDetail } from "./_bookWriteInterfaces"
import type { BookWriteStoreState } from "./_bookWriteStoreState"

const findPreviousOverlayingValue = (
    rowIndex: number,
    columnKey: keyof BookDetail,
    state: BookWriteStoreState
): string | null => {
    const rowRightAbove = state.overlayingRowArray[rowIndex - 1]

    const previousOverlayingValue = rowRightAbove ? rowRightAbove[columnKey] : null
    return previousOverlayingValue
}

// NOTE: "/"를 받았을 때만 핸들링함
const makeNewOverlayingValue = (
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

type MakeNewOverlayingRowArrayProps = {
    previousOverlayingValue: string | null
    rowIndex: number
    columnKey: keyof BookDetail
    value: string
    state: BookWriteStoreState
}
const makeNewOverlayingRowArray = ({
    previousOverlayingValue,
    rowIndex,
    columnKey,
    value,
    state,
}: MakeNewOverlayingRowArrayProps) => {
    const overlayingRowArray = state.overlayingRowArray.map((row, index): BookDetail => {
        if (index < rowIndex) return row

        const underlyingValue = index === rowIndex ? value : state.rowArray[index][columnKey]

        if (underlyingValue === "/") {
            const newValue = makeNewOverlayingValue(previousOverlayingValue, columnKey, state)
            previousOverlayingValue = newValue
            row[columnKey] = newValue
            return row
        }

        // NOTE: 3을 입력했다면
        // NOTE: 다음 행에서는 이전 오버레이 값을 3으로 설정하자
        if (underlyingValue) {
            previousOverlayingValue = underlyingValue
            row[columnKey] = ""
            return row
        }

        row[columnKey] = previousOverlayingValue ?? "---- wrong"
        return row
    })

    return overlayingRowArray
}

type UpdateOverlayingRowArrayProps = {
    rowIndex: number
    columnKey: keyof BookDetail
    value: string
    state: BookWriteStoreState
}

export const updateOverlayingRowArray = ({
    rowIndex,
    columnKey,
    value,
    state,
}: UpdateOverlayingRowArrayProps): BookDetail[] | null => {
    if (!value && !state.rowArray[rowIndex][columnKey]) return null

    const previousOverlayingValue = findPreviousOverlayingValue(rowIndex, columnKey, state)
    const overlayingRowArray = makeNewOverlayingRowArray({
        previousOverlayingValue,
        rowIndex,
        columnKey,
        value,
        state,
    })

    return overlayingRowArray
}
