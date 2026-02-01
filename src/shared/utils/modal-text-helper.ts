import { makeUlLul } from "./stringManipulation"

export const DESTRUCTIVE_MODAL_BODY = "이 작업은 돌이킬 수 없어요"

export const makeDestructiveModalTitle = (title: string): string => {
    const ulLul = makeUlLul(title)
    return `"${title}"${ulLul} 삭제할까요?`
}
