import type { Book, ClassroomSyllabus, SessionStatus, StudentSyllabus, Syllabus } from "@/shared/interfaces"

export type ExtendedSyllabus = Syllabus & { book: Book }
export type AssignedJoinedSyllabus = Omit<ClassroomSyllabus, "classroom_id"> &
    Omit<StudentSyllabus, "student_id"> & { syllabus: Syllabus & { book: Book } } & {
        classroom_id?: string
        student_id?: string
    }
type TopicStep = {
    topic: string
    step: string
}
export type ConciseSession = {
    id: string
    start: TopicStep
    end: Partial<TopicStep>
    status: SessionStatus | null
    completed_at: string | null
    assigned_at: string | null
}
type SessionByTopic = {
    id: string
    title: string
    conciseSessionArray: ConciseSession[]
}
export type ConciseSyllabus = {
    id: string
    book: Book
    sessionsByTopicArray: SessionByTopic[]
}
