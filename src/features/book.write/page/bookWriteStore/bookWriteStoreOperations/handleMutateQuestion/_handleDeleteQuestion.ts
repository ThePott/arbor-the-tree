import type { BookWriteRow } from "../../../_bookWriteInterfaces"

const findLastQuestionIndex = ({ rowArray }: { rowArray: BookWriteRow[] }) => {
    const lastQuestionIndex = rowArray.reduce((acc, row, index) => {
        if (row.question_name.value) return index
        return acc
    }, 0)
    return lastQuestionIndex
}

const handleQuestionDeletionAtEnd = ({ row }: { row: BookWriteRow }) => {
    const { question_name: cell, ...rest } = row
    const isClearingOverlay = Object.entries(rest).every(([_key, column]) => !column.value)

    if (isClearingOverlay) {
        // NOTE: 문제를 지웠는데 같은 행 다른 열에 값이 없으면 모든 오버레이 초기화
        Object.entries(row).forEach(([_key, column]) => {
            column.overlaying = ""
        })
    } else {
        // NOTE: 다른 값이 있으면 오류 띄우기
        cell.isError = true
    }
}

type HandleQuestionDeletionProps = {
    rowIndex: number
    rowArray: BookWriteRow[]
}
export const handleQuestionDeletion = ({ rowIndex, rowArray }: HandleQuestionDeletionProps) => {
    const row = rowArray[rowIndex]
    const cell = row.question_name

    const lastQuestionIndex = findLastQuestionIndex({ rowArray })

    if (rowIndex < lastQuestionIndex) {
        cell.isError = true
    } else {
        handleQuestionDeletionAtEnd({ row })

        for (let i = lastQuestionIndex + 1; i < rowArray.length; i++) {
            rowArray[i].question_name.isError = false
        }
    }
}
