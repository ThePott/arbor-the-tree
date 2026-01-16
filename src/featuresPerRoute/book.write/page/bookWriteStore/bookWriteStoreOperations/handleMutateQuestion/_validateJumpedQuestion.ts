import type { BookWriteRow } from "../../../_bookWriteInterfaces"

type ValidateJumpedQuestionProps = {
    rowIndex: number
    rowArray: BookWriteRow[]
}
export const validateJumpedQuestions = ({ rowIndex, rowArray }: ValidateJumpedQuestionProps) => {
    // NOTE: 내 위로 빈 것이 있으면 그것들은 오류 처리
    // NOTE: 내 위로 빈 행 필터
    // NOTE: 원래 index를 살려야 하기 때문에 slice가 아닌 reduce 사용
    const filteredArray = rowArray.reduce((acc: BookWriteRow[], row, index) => {
        if (index >= rowIndex) return acc
        if (!row.question_name.value) return [...acc, row]
        return acc
    }, [])

    filteredArray.forEach((row) => {
        row.question_name.isError = true
    })

    // // NOTE: 딱 지금 행만 모든 열 오버레이 재계산
    // updateOverlayingInRow({ startRowIndex: rowIndex, endRowIndex: rowIndex, rowArray })
}
