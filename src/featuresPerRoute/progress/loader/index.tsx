import bookListLoaderFn from "@/featuresPerRoute/book/loader/bookListLoaderFn"
import manageStudentLoaderFn, { type ManageStudentLoaderResponseData } from "@/featuresPerRoute/manage.student/loader"
import type { Book } from "@/shared/interfaces"
import type { QueryClient } from "@tanstack/react-query"

type ProgressLoaderFnProps = ManageStudentLoaderResponseData & { bookArray: Book[] }

const progressLoaderFn = async (queryClient: QueryClient) => {
    // NOTE: 반, 학생 받아오는 것만 필요하니 기존 로더 재탕함
    const promiseArray = [manageStudentLoaderFn({ queryClient }), bookListLoaderFn({ queryClient })]
    const resolvedArray = await Promise.all(promiseArray)
    const merged = resolvedArray.reduce((acc: ProgressLoaderFnProps, cur) => {
        return { ...acc, ...cur }
    }, {} as ProgressLoaderFnProps)

    return merged
}

export default progressLoaderFn
