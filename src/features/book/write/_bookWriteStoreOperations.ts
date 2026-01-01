import type { BookWriteRow, BookWriteRowFlat } from "./_bookWriteInterfaces"
import useBookWriteStore from "./_bookWriteStore"

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

        // NOTE: 입력된 실제 값(underlyingValue)이 없다면 이전 오버레이 값을 따라감
        iteratingCell.overlaying = previousOverlaying ?? ""
    })
}
