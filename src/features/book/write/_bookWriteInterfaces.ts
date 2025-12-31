export type BWTopicStep = "topic" | "step"

export const BOOK_DETAIL_KEY_ARRAY = [
    "topic",
    "step",
    "question_name",
    "question_page",
    "solution_page",
    "session",
    "sub_question_name",
] as const

type BookDetailKey = (typeof BOOK_DETAIL_KEY_ARRAY)[number]

export const BOOK_DETAIL_KEY_TO_LABEL: Record<BookDetailKey, string> = {
    topic: "중단원",
    step: "소단원",
    question_name: "문제 번호",
    question_page: "문제 쪽 번호",
    solution_page: "답지 쪽 번호",
    session: "묶음 번호",
    sub_question_name: "하위 문제",
} as const

export type BookDetail = Record<BookDetailKey, string>

export type BookWritePayload = { title: string; published_year: number; data: BookDetail[] }
