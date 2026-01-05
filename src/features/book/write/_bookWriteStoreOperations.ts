import { separateNumberAtEnd as separateStringNumber } from "@/shared/utils/parseNumberAtEnd"
import type { BookWriteRow, BookWriteRowFlat } from "./_bookWriteInterfaces"
import useBookWriteStore from "./_bookWriteStore"

type MakeNewOverlayingProps = {
    previousOverlaying: string | null
    columnKey: keyof BookWriteRowFlat
}
const makeNewOverlaying = ({ previousOverlaying, columnKey }: MakeNewOverlayingProps): string | null => {
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
    const indexOfValueRightAbove = lineArray.findIndex((line) => line === previousOverlaying)

    const newIndex = isForTopic ? indexOfValueRightAbove + 1 : (indexOfValueRightAbove + 1) % lineArray.length

    // NOTE: this is null if topic info is not enough
    const newValue = lineArray[newIndex] ?? null
    return newValue
}

type UpdateOverlayingColumnProps = {
    startRowIndex: number
    endRowIndex: number
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

    const previousRow = rowArray[startRowIndex - 1]
    let previousOverlaying = previousRow ? previousRow[columnKey].overlaying : null

    rowArray.forEach((row, iteratingIndex) => {
        if (iteratingIndex < startRowIndex) return
        if (iteratingIndex > endRowIndex) return

        // NOTE: 인풋에 실제로 기입된 값
        const iteratingCell = row[columnKey]

        // TODO: 별도 함수로 분리

        // NOTE: "/"가 밑에 있으면 오버레이 업데이트 함
        if (iteratingCell.value === "/") {
            const newOverlaying = makeNewOverlaying({ previousOverlaying, columnKey })
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

        // NOTE: 입력된 실제 값(underlyingValue)이 없고 문제 번호도 안 적혀있으면 오버레이를 하지 않음
        if (!row.question_name.value) return

        // NOTE: 입력된 실제 값(underlyingValue)이 없다면 이전 오버레이 값을 따라감
        iteratingCell.overlaying = previousOverlaying ?? ""
    })
}

// NOTE: 여기서는 "~" 로직만 신경쓰면 된다
export const updateQuestionNameColumn = ({ rowArray }: { rowArray: BookWriteRow[] }) => {
    // NOTE: rowArray에서 ~ 들어있는 행들의 인덱스만 알아낸 다음
    // NOTE: 덮어씌울 후보 행들이 비어있는지 확인
    // NOTE: 안 비어있으면 에러 처리
    // NOTE: 비어있으면 덮어씌우기
    const indexArrayIncludingTilda: number[] = rowArray.reduce((acc: number[], row, index) => {
        if (!row.question_name.value) return acc
        if (row.question_name.value.includes("~")) {
            return [...acc, index]
        }
        return acc
    }, [])

    indexArrayIncludingTilda.map((filteredIndex) => {
        const { baseText, startNumber, endNumber } = separateStringNumber(rowArray[filteredIndex].question_name.value)
        let currentNumber: number = startNumber

        const startIndex = filteredIndex
        const endIndex = filteredIndex + endNumber - startNumber
        // NOTE: filteredIndex에서부터 하나라도 채워져 있으면 false
        const isClear = rowArray.slice(startIndex + 1, endIndex + 1).every((row) => {
            return !row.question_name.value
        })
        if (!isClear) {
            rowArray[filteredIndex].question_name.isError = true
            return
        }

        // NOTE: 비어있으니 덮어쓰기
        // NOTE: 지금까지의 오류 없애기
        for (let i = startIndex; i <= endIndex; i++) {
            rowArray[i].question_name.value = `${baseText}${currentNumber}`
            currentNumber++
            rowArray[i].question_name.isError = false
        }
    })
}

type RecalculateColumnProps = {
    startRowIndex?: number
    endRowIndex?: number
    columnKey: keyof BookWriteRow
    rowArray: BookWriteRow[]
}
export const recalculateColumn = ({
    startRowIndex,
    endRowIndex,
    columnKey,
    rowArray,
}: RecalculateColumnProps): void => {
    startRowIndex = startRowIndex ? startRowIndex : 0
    endRowIndex = endRowIndex ? endRowIndex : rowArray.length - 1
    // TODO: 재계산 순서
    // 1. 값 기입 -> 이건 스토어에서
    // 2. overlay 혹은 ~ 핸들링
    // 3. 이빨 빠진 곳 있는지 확인
    if (columnKey === "question_name") {
        updateQuestionNameColumn({ rowArray })
        return
    }

    updateOverlayingColumn({ startRowIndex, endRowIndex, rowArray, columnKey })
}
