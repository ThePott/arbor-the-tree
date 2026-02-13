import type { BookWriteRow } from "../../../_bookWriteInterfaces"
import { updateOverlayingInRow } from "../handleMutateOtherColumn/updateOverlayings"
import { calculateTilda } from "./_calculateTilda"
import { handleQuestionDeletion } from "./_handleDeleteQuestion"
import { validateJumpedQuestions } from "./_validateJumpedQuestion"

type HandleQuestionMutationProps = {
    rowIndex: number
    rowArray: BookWriteRow[]
    value: string
}

export const handleQuestionMutation = ({ rowIndex, rowArray, value }: HandleQuestionMutationProps) => {
    if (value) {
        // NOTE: 추가할 땐 비어있는지, 틸다 확인
        validateJumpedQuestions({ rowArray, rowIndex })
        calculateTilda({ rowArray })
    } else {
        // NOTE: 지울 땐 오버레이, 값 확인
        handleQuestionDeletion({ rowArray, rowIndex })
    }

    // NOTE: 현재 행 딱 한 줄만 열 전체 재계산
    updateOverlayingInRow({ startRowIndex: rowIndex, endRowIndex: rowIndex, rowArray })
}
