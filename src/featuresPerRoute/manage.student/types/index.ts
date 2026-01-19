import type { AppUser, School, Student } from "@/shared/interfaces"
import z from "zod/v3"

export type ExtendedStudent = Student & { school: School } & { users: AppUser }

export const manageStudentSearchArray = ["classroom", "student"] as const
export type ManageStudentSearch = (typeof manageStudentSearchArray)[number]
export const manageStudentSearchSchema = z.object({
    by: z.enum(manageStudentSearchArray).optional(),
})
