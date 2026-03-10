import { ClientError } from "../error/clientError"
import type { Role } from "../interfaces"
import useGlobalStore from "../store/globalStore"

export const checkIsAllowed = (minimumRole: Role): boolean => {
    const currentRole = useGlobalStore.getState().me?.role
    if (!currentRole) return false

    const baseRoleArray: Role[] = ["MAINTAINER", "PRINCIPAL", "HELPER", "STUDENT", "PARENT"]
    const index = baseRoleArray.findIndex((role) => role === minimumRole)
    if (index === -1) throw ClientError.Unexpected("권한을 찾는 데에 실패했어요")

    const allowedRoleArray = baseRoleArray.slice(0, index + 1)
    return allowedRoleArray.includes(currentRole)
}
