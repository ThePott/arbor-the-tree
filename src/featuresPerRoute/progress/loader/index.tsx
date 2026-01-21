import manageStudentLoaderFn from "@/featuresPerRoute/manage.student/loader"
import type { QueryClient } from "@tanstack/react-query"

const progressLoaderFn = (queryClient: QueryClient) => {
    // NOTE: 반, 학생 받아오는 것만 필요하니 기존 로더 재탕함
    manageStudentLoaderFn({ queryClient })
}

export default progressLoaderFn
