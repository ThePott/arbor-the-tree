import type { Role } from "../interfaces"

export const roleToText: Record<Role, string> = {
    PRINCIPAL: "원장",
    STUDENT: "학생",
    HELPER: "조교",
    PARENT: "학부모",
    MAINTAINER: "관리자",
}
