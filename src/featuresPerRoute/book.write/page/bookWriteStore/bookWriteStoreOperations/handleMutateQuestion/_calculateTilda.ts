import { separateStringNumber } from "@/shared/utils/stringManipulation"
import type { BookWriteRow } from "../../../_bookWriteInterfaces"
import { updateOverlayingInRow } from "../handleMutateOtherColumn/updateOverlayings"

export const calculateTilda = ({ rowArray }: { rowArray: BookWriteRow[] }) => {
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
        // NOTE: 틸다 로직
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
        for (let i = startIndex; i <= endIndex; i++) {
            // NOTE: 틸다 로직에 맞춰 계산
            rowArray[i].question_name.value = `${baseText}${currentNumber}`
            currentNumber++
            // NOTE: 지금까지의 오류 없애기
            rowArray[i].question_name.isError = false
        }

        updateOverlayingInRow({ startRowIndex: startIndex, endRowIndex: endIndex, rowArray })
    })
}
