import type { Book, Topic } from "@/shared/interfaces"

export type TimeRecord = {
    byWhat: string
    count: number
    time: number
}

export type QuestionForPdf = {
    repeat_count: number
    id: string
    name: string
    order: number
    page: number
    solution_page: number
    step_id: string
    sub_question_id: string | null
}

type TopicForPdf = Topic & { questions: QuestionForPdf[] }
type BookForPdf = Book & { topics: TopicForPdf[] }
export type PdfInfo = {
    id: string
    studentName: string
    assigned_at: string
    bookForPdfArray: BookForPdf[]
}
