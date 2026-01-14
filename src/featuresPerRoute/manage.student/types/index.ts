import type { AppUser, School, Student } from "@/shared/interfaces"

export type ExtendedStudent = Student & { school: School } & { users: AppUser }
