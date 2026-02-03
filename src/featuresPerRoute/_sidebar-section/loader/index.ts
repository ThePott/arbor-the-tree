import manageStudentLoaderFn, { type ManageStudentLoaderResponseData } from "@/featuresPerRoute/manage.student/loader"
import { instance } from "@/packages/api/axiosInstances"
import type { QueryClient } from "@tanstack/react-query"
import type { ExtendedSyllabus } from "../types"

type ProgressLoaderFnProps = ManageStudentLoaderResponseData & { extendedSyllabusArray: ExtendedSyllabus[] } // TODO: 여기에 syllabus[]라든지 해야

const sidebarSectionLoaderInnerFn = async (queryClient: QueryClient) => {
    const extendedSyllabusArray = await queryClient.ensureQueryData({
        queryKey: ["progressSyllabus"],
        queryFn: async () => {
            const response = await instance.get("/progress/syllabus")
            return response.data as ExtendedSyllabus[]
        },
    })
    return { extendedSyllabusArray }
}

const sidebarSectionLoaderFn = async (queryClient: QueryClient) => {
    // NOTE: 반, 학생 받아오는 것만 필요하니 기존 로더 재탕함
    const promiseArray = [manageStudentLoaderFn({ queryClient }), sidebarSectionLoaderInnerFn(queryClient)]
    const resolvedArray = await Promise.all(promiseArray)
    const merged = resolvedArray.reduce((acc: ProgressLoaderFnProps, cur) => {
        return { ...acc, ...cur }
    }, {} as ProgressLoaderFnProps)

    return merged
}

export default sidebarSectionLoaderFn
