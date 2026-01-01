import type { BookWriteRow, BookWriteRowFlat } from "./_bookWriteInterfaces"
import useBookWriteStore from "./_bookWriteStore"
import type { BookWriteStoreState } from "./_bookWriteStoreState"

const findPreviousOverlayingValue_old = (
    rowIndex: number,
    columnKey: keyof BookWriteRowFlat,
    state: BookWriteStoreState
): string | null => {
    const rowRightAbove = state.overlayingRowArray[rowIndex - 1]

    const previousOverlayingValue = rowRightAbove ? rowRightAbove[columnKey] : null
    return previousOverlayingValue
}

// NOTE: "/"를 받았을 때만 핸들링함
const makeNewOverlayingValue_old = (
    previousOverlayingValue: string | null,
    columnKey: keyof BookWriteRowFlat,
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
    columnKey: keyof BookWriteRowFlat
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
    const overlayingRowArray = state.overlayingRowArray.map((row, iteratingIndex): BookWriteRowFlat => {
        if (columnKey === "question_name") return row
        if (iteratingIndex < rowIndex) return row

        // NOTE: 인풋에 실제로 기입된 값
        const underlyingValue = iteratingIndex === rowIndex ? value : state.flatRowArray[iteratingIndex][columnKey]

        if (underlyingValue === "/") {
            const newValue = makeNewOverlayingValue_old(previousOverlayingValue, columnKey, state)
            previousOverlayingValue = newValue
            row[columnKey] = newValue
            return row
        }

        // NOTE: 3을 입력했다면
        // NOTE: 다음 행에서는 이전 오버레이 값을 3으로 설정하자
        if (underlyingValue) {
            previousOverlayingValue = underlyingValue
            // NOTE: 3이라고 구체적으로 적었으니 오버레이로는 보여줄 필요 없음
            row[columnKey] = ""
            return row
        }

        // NOTE: 입력된 실제 값이 없고 문제 번호도 안 적혀있으면 오버레이를 하지 않음
        if (!state.flatRowArray[iteratingIndex].question_name) {
            return row
        }

        // NOTE: 입력된 실제 값이 없다면 이전 오버레이 값을 따라감
        row[columnKey] = previousOverlayingValue ?? "---- wrong"
        return row
    })

    return overlayingRowArray
}

type UpdateOverlayingRowArrayProps = {
    rowIndex: number
    columnKey: keyof BookWriteRowFlat
    value: string
    state: BookWriteStoreState
}

export const updateOverlayingRowArray = ({
    rowIndex,
    columnKey,
    value,
    state,
}: UpdateOverlayingRowArrayProps): BookWriteRowFlat[] | null => {
    if (!value && !state.flatRowArray[rowIndex][columnKey]) return null

    const previousOverlayingValue = findPreviousOverlayingValue_old(rowIndex, columnKey, state)
    const overlayingRowArray = makeNewOverlayingRowArray({
        previousOverlayingValue,
        rowIndex,
        columnKey,
        value,
        state,
    })

    return overlayingRowArray
}

type FindPreviousOverlayingProps = {
    rowIndex: number
    columnKey: keyof BookWriteRow
    rowArray: BookWriteRow[]
}
export const findPreviousOverlaying = ({
    rowIndex,
    columnKey,
    rowArray,
}: FindPreviousOverlayingProps): string | null => {
    const previousRow = rowArray[rowIndex - 1]
    const previousOverlaying = previousRow ? previousRow[columnKey].overlaying : null
    return previousOverlaying
}

type MakeNewOverlayingProps = {
    previousOverlaying: string | null
    columnKey: keyof BookWriteRowFlat
}
const makeNewOverlaying = ({ previousOverlaying, columnKey }: MakeNewOverlayingProps): string | null => {
    // NOTE: 숫자 열의 경우
    if (columnKey !== "topic" && columnKey !== "step") {
        const newValue = previousOverlaying ? String(Number(previousOverlaying) + 1) : "1"
        return newValue
    }

    // NOTE: 문자 열의 경우
    const state = useBookWriteStore.getState()
    const lineArray = columnKey === "topic" ? state.topicArray : state.stepArray
    const indexOfValueRightAbove = lineArray.findIndex((line) => line === previousOverlaying)
    // NOTE: this is null if topic(step) info is not enough
    const newValue = lineArray[indexOfValueRightAbove + 1] ?? null
    return newValue
}

type UpdateOverlayingColumnProps = {
    rowIndex: number
    columnKey: keyof BookWriteRow
    value: string
    previousOverlaying: string | null
    rowArray: BookWriteRow[]
}
export const updateOverlayingColumn = ({
    previousOverlaying,
    rowIndex,
    columnKey,
    value,
    rowArray,
}: UpdateOverlayingColumnProps): void => {
    if (columnKey === "question_name") return
    rowArray.forEach((row, iteratingIndex) => {
        if (iteratingIndex < rowIndex) return row

        // NOTE: 인풋에 실제로 기입된 값
        const underlyingValue = iteratingIndex === rowIndex ? value : row[columnKey].value
        const iteraingRow = rowArray[iteratingIndex]
        const iteratingCell = iteraingRow[columnKey]

        // NOTE: "/"가 밑에 있으면 오버레이 업데이트 함
        if (underlyingValue === "/") {
            const newOverlaying = makeNewOverlaying({ previousOverlaying, columnKey })
            iteratingCell.overlaying = newOverlaying ?? "ERROR"
            iteratingCell.isError = !newOverlaying
            previousOverlaying = newOverlaying
            return
        }

        // NOTE: 3을 입력했다면
        // NOTE: 다음 행에서는 이전 오버레이 값을 3으로 설정하자
        if (underlyingValue) {
            // NOTE: 3이라고 구체적으로 입력했으니 오버레이는 필요 없음
            iteratingCell.overlaying = ""
            previousOverlaying = underlyingValue
            return
        }

        // NOTE: 입력된 실제 값(underlyingValue)이 없고 문제 번호도 안 적혀있으면 오버레이를 하지 않음
        if (!iteraingRow.question_name.value) return

        // NOTE: 입력된 실제 값이 없어서 이전 오버레이를 따라가야 하는데 오버레이가 없으면 에러 띄움
        if (!previousOverlaying) {
            iteratingCell.isError = true
            iteratingCell.overlaying = "ERROR"
            return
        }

        // NOTE: 입력된 실제 값(underlyingValue)이 없다면 이전 오버레이 값을 따라감
        iteratingCell.overlaying = previousOverlaying
    })
}
