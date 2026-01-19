import type { AppUser, Classroom, ClassroomStudent, School, Student } from "@/shared/interfaces"
import z from "zod/v3"

export type ExtendedStudent = Student & { school: School } & { users: AppUser } & {
    classroomStudents: (ClassroomStudent & { classroom: Classroom })[]
}

export type ExtendedClassroom = Classroom & {
    classroomStudents: (ClassroomStudent & {
        student: ExtendedStudent
    })[]
}

export const manageStudentSearchArray = ["classroom", "student"] as const
export type ManageStudentSearch = (typeof manageStudentSearchArray)[number]
export const manageStudentSearchSchema = z.object({
    by: z.enum(manageStudentSearchArray).optional(),
})
