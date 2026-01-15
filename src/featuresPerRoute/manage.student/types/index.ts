import type { AppUser, Classroom, ClassroomStudent, School, Student } from "@/shared/interfaces"

export type ExtendedStudent = Student & { school: School } & { users: AppUser }
export type ExtendedClassroom = Classroom & { classroomStudents: (ClassroomStudent & { student: ExtendedStudent })[] }
