import type { Book, ClassroomSyllabus, StudentSyllabus, Syllabus } from "@/shared/interfaces"

export type ExtendedSyllabus = Syllabus & { book: Book }
export type AssignedJoinedSyllabus = Omit<ClassroomSyllabus, "classroom_id"> &
    Omit<StudentSyllabus, "student_id"> & { syllabus: Syllabus & { book: Book } } & {
        classroom_id?: string
        student_id?: string
    }
export type ConciseSession = {
    id: string
    topic_step: string
}
export type ConciseSyllabus = {
    id: string
    book: Book
    sessions: ConciseSession[]
}
