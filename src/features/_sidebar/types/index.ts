import type { Book, Syllabus } from "@/shared/interfaces"

export type ExtendedSyllabus = Syllabus & { book: Book }
