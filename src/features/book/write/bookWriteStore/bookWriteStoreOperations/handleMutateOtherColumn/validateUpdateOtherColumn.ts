import type { BookWriteRow } from "../../../_bookWriteInterfaces"

type ValidateUpdateOtherColumnProps = {
    row: BookWriteRow
    value: string
}
export const validateUpdateOtherColumn = ({ row, value }: ValidateUpdateOtherColumnProps): void => {
    // NOTE: other column validation으로 빼야
    // NOTE: 문제 말고 다른 걸 입력했는데 문제 이름이 없으면...
    if (value && !row.question_name.value) {
        // NOTE: 문제 비었다고 오류
        row.question_name.isError = true
    }
}
