import bookListLoaderFn from "@/features/book/loader/bookListLoaderFn"
import BookListPage from "@/features/book/page/BookListPage"
import BookListPending from "@/features/book/pending/BookListPending"
import { ClientError } from "@/shared/error/clientError"
import { checkIsAllowed } from "@/shared/utils/check-is-allowed"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/book/")({
    component: BookListPage,
    pendingComponent: BookListPending,
    beforeLoad: () => {
        if (!checkIsAllowed("HELPER")) {
            throw ClientError.Unauthorized("이 페이지에 접근할 권한이 없습니다", {
                to: "/",
                label: "홈으로 이동",
            })
        }
    },
    loader: async ({ context: { queryClient } }) => bookListLoaderFn({ queryClient }),
})
