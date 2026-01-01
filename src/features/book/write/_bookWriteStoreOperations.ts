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
    // TODO: "?" 로직은 나중에 별도 함수로 분리해야 함
    if (columnKey === "question_name") {
        if (value !== "?") return

        let recent: string | null = null
        for (let index = rowIndex; index >= 0; index--) {
            const previousRow = rowArray[rowIndex - 1]
            const previousOverlaying = previousRow[columnKey].overlaying
            const previousValue = previousRow[columnKey].value
            const candidate = previousOverlaying || previousValue
            if (candidate) {
                recent = candidate
                break
            }
        }
        if (!recent) {
            recent = "1"
        }

        for (let index = 0; index <= rowIndex; index++) {
            const iteratingCell = rowArray[index][columnKey]
        }
        return
    }

    rowArray.forEach((row, iteratingIndex) => {
        if (iteratingIndex < rowIndex) return

        // NOTE: 인풋에 실제로 기입된 값
        const underlyingValue = iteratingIndex === rowIndex ? value : row[columnKey].value
        const iteraingRow = rowArray[iteratingIndex]
        const iteratingCell = iteraingRow[columnKey]

        // NOTE: "/"가 밑에 있으면 오버레이 업데이트 함
        if (underlyingValue === "/") {
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

type ValidateValueProps = {
    rowIndex: number
    columnKey: keyof BookWriteRow
    value: string
}
export const validateValue = ({ rowIndex, columnKey, value }: ValidateValueProps): boolean => {
    if (!value) return true

    // NOTE: 값이 있는데 위 오버레이도 없고 값도 없는데 첫번째 줄이 아니다? 에러 표시
    const previousRow = useBookWriteStore.getState().rowArray[rowIndex - 1]
    const previousOverlaying = previousRow ? previousRow[columnKey].overlaying : null
    const previousValue = previousRow ? previousRow[columnKey].value : null

    const isAboveEmpty = !previousOverlaying && !previousValue && rowIndex > 0
    const isAutoIncrementing = columnKey === "question_name" && value === "?"
    if (isAboveEmpty && !isAutoIncrementing) return false

    // NOTE: invalid 하면 어떻게 할 거야 값을 허용하지 않아? 그러기보다는 붉은색으로 바로 바꾸자
    switch (columnKey) {
        case "topic":
            return value === "/"
        case "step":
            // NOTE: 소단원 선택 기능 만들기 전까지는 우선 다 허용하자
            // TODO: /1, /2 기능 만들고나면 직접 값 입력하는 건 불가능하게 바꿔야
            return true
        case "question_page":
            return value === "/" || Boolean(Number(value))
        case "question_name": {
            if (rowIndex === 0) return true

            // NOTE: 이전 값이 있으면 괜찮음, "?"여도 괜찮음
            return Boolean(previousValue || value === "?")
        }
        case "solution_page":
            return value === "/" || Boolean(Number(value))
        case "session":
            return value === "/"
        case "sub_question_name":
            // NOTE: 아직은 구현하지 않을 거니까
            return true
    }
}
