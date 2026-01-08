import { type BookWriteRowFlat, type BookWriteRow, BOOK_DETAIL_KEY_ARRAY } from "../../../_bookWriteInterfaces"
import useBookWriteStore from "../../bookWriteStore"

type MakeNewOverlayingProps = {
    previousOverlaying: string | null
    rowIndex: number
    columnKey: keyof BookWriteRowFlat
}
const makeNewOverlaying = ({ previousOverlaying, rowIndex, columnKey }: MakeNewOverlayingProps): string | null => {
    // NOTE: 숫자 열의 경우
    if (columnKey !== "topic" && columnKey !== "step") {
        // NOTE: 이전 값이 없으면 1로 만든다
        const newValue = previousOverlaying ? String(Number(previousOverlaying) + 1) : "1"
        return newValue
    }

    // NOTE: 문자 열의 경우
    const state = useBookWriteStore.getState()
    const isForTopic = columnKey === "topic"
    const lineArray = isForTopic ? state.topicArray : state.stepArray
    // NOTE: 이전 게 없으면 index = -1
    const indexOfValueRightAbove = lineArray.findIndex((line) => line === previousOverlaying)

    // NOTE: topic은 맨 위에서만 이전게 없어도 됨, 중간에서 그렇다면 topic line 초과한 것이니 오류
    const newIndexForTopic = indexOfValueRightAbove === -1 && rowIndex > 0 ? -1 : indexOfValueRightAbove + 1
    const newIndexForStep = (indexOfValueRightAbove + 1) % lineArray.length
    const newIndex = isForTopic ? newIndexForTopic : newIndexForStep

    // NOTE: this is null if topic info is not enough
    const newValue = lineArray[newIndex] ?? null
    return newValue
}

type UpdateOverlayingColumnProps = {
    startRowIndex?: number
    endRowIndex?: number
    columnKey: keyof BookWriteRow
    rowArray: BookWriteRow[]
}
export const updateOverlayingColumn = ({
    startRowIndex,
    endRowIndex,
    columnKey,
    rowArray,
}: UpdateOverlayingColumnProps): void => {
    if (columnKey === "question_name") return

    startRowIndex = startRowIndex ? startRowIndex : 0
    endRowIndex = endRowIndex ? endRowIndex : rowArray.length - 1

    const previousRow = rowArray[startRowIndex - 1]
    let previousOverlaying = previousRow ? previousRow[columnKey].overlaying : null

    // NOTE: 오류 초기화
    rowArray.map((row) => (row[columnKey].isError = false))

    // NOTE: 위에 채울 곳 있으면 오류 표시
    const firstRowIndexWithValue = rowArray.findIndex((row) => row[columnKey].value)
    for (let i = 0; i < firstRowIndexWithValue; i++) {
        const row = rowArray[i]
        row[columnKey].isError = true
    }

    rowArray.forEach((row, iteratingIndex) => {
        if (iteratingIndex < startRowIndex) return
        if (iteratingIndex > endRowIndex) return

        // NOTE: 인풋에 실제로 기입된 값
        const iteratingCell = row[columnKey]
        if (iteratingCell.value && !row.question_name.value) {
            row.question_name.isError = true
        }

        // TODO: 별도 함수로 분리

        // NOTE: "/"가 밑에 있으면 오버레이 업데이트 함
        if (iteratingCell.value === "/") {
            const newOverlaying = makeNewOverlaying({ previousOverlaying, rowIndex: iteratingIndex, columnKey })
            iteratingCell.overlaying = newOverlaying ?? ""
            // NOTE: topic에 적힌 게 부족해지면 에러 발생
            // NOTE: 그 외에는 이게 falsy할 리 없으니 이전 값을 유지
            iteratingCell.isError = !newOverlaying ? true : iteratingCell.isError
            previousOverlaying = newOverlaying
            return
        }

        // NOTE: 3을 입력했다면
        // NOTE: 다음 행에서는 이전 오버레이 값을 3으로 설정하자
        if (iteratingCell.value) {
            // NOTE: 3이라고 구체적으로 입력했으니 오버레이는 필요 없음
            iteratingCell.overlaying = ""
            previousOverlaying = iteratingCell.value
            return
        }

        // NOTE: 입력된 실제 값(underlyingValue)이 없고 문제 번호도 안 적혀있으면...
        if (!row.question_name.value) {
            // NOTE: 오버레이를 하지 않음
            row[columnKey].overlaying = ""
            return
        }

        // NOTE: 입력된 실제 값(underlyingValue)이 없다면 이전 오버레이 값을 따라감
        iteratingCell.overlaying = previousOverlaying ?? ""
    })
}

type UpdateOverlayingInRowProps = {
    startRowIndex: number
    endRowIndex?: number
    rowArray: BookWriteRow[]
}
export const updateOverlayingInRow = ({ startRowIndex, endRowIndex, rowArray }: UpdateOverlayingInRowProps) => {
    endRowIndex = endRowIndex ? endRowIndex : startRowIndex
    // NOTE: question_name, sub_question_name은 overlay가 없다
    const columnKeyArray = BOOK_DETAIL_KEY_ARRAY.filter((key) => key !== "question_name")
    columnKeyArray.forEach((columnKey) => {
        updateOverlayingColumn({ startRowIndex, endRowIndex, columnKey, rowArray })
    })
}
