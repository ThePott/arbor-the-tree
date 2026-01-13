import { useLoaderData } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import useGlobalStore from "@/shared/store/globalStore"
import type { Role } from "@/shared/interfaces"
import { manageResumeQueryOptions } from "../../loader"
import MaintainerTable from "./MaintainerTable"
import PrincipalTable from "./PrincipalTable"

const ManageResumeTable = () => {
    const extendedResumeArray = useLoaderData({ from: "/manage/resume" })
    const { data } = useQuery(manageResumeQueryOptions)

    const me = useGlobalStore((state) => state.me)
    const allowedRoleArray: (Role | undefined)[] = ["MAINTAINER", "PRINCIPAL"]

    // NOTE: 커스텀 에러 클래스 만들어야
    if (!allowedRoleArray.includes(me?.role)) throw new Error("---- Unauthorized")

    const isMaintainer = me?.role === "MAINTAINER"

    if (isMaintainer) return <MaintainerTable extendedResumeArray={data ?? extendedResumeArray} />
    return <PrincipalTable extendedResumeArray={data ?? extendedResumeArray} />
}

export default ManageResumeTable
