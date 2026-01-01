export type BWTopicStep = "topic" | "step"

export const BOOK_DETAIL_KEY_ARRAY = [
    "topic",
    "step",
    "question_page",
    "question_name",
    "solution_page",
    "session",
    "sub_question_name",
] as const

type BookWriteColumnKey = (typeof BOOK_DETAIL_KEY_ARRAY)[number]

export const BOOK_DETAIL_KEY_TO_LABEL: Record<BookWriteColumnKey, string> = {
    topic: "중단원",
    step: "소단원",
    question_name: "문제 번호",
    question_page: "쪽",
    solution_page: "답지 쪽",
    session: "묶음",
    sub_question_name: "하위 문제",
} as const

// NOTE: additional state for row
type BookWriteCell = {
    value: string
    overlaying: string
    isError: boolean
}

// NOTE: actual input data row
export type BookWriteRow = Record<BookWriteColumnKey, BookWriteCell>
export type BookWriteRowFlat = Record<BookWriteColumnKey, string>

export type BookWritePayload = { title: string; published_year: number; data: BookWriteRowFlat[] }
