import { useLoaderData } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import useGlobalStore from "@/shared/store/globalStore"
import { manageResumeQueryOptions } from "../../loader"
import MaintainerTable from "./MaintainerTable"
import PrincipalTable from "./PrincipalTable"

const ManageResumeTable = () => {
    const extendedResumeArray = useLoaderData({ from: "/manage/resume" })
    const { data } = useQuery(manageResumeQueryOptions)

    const me = useGlobalStore((state) => state.me)
    const isMaintainer = me?.role === "MAINTAINER"

    if (isMaintainer) return <MaintainerTable extendedResumeArray={data ?? extendedResumeArray} />
    return <PrincipalTable extendedResumeArray={data ?? extendedResumeArray} />
}

export default ManageResumeTable
