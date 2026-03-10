import BookWritePage from "@/features/book.write/page/BookWritePage"
import BookWritePending from "@/features/book.write/pending/BookWritePending"
import { ClientError } from "@/shared/error/clientError"
import { checkIsAllowed } from "@/shared/utils/check-is-allowed"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/book/write")({
    component: BookWritePage,
    pendingComponent: BookWritePending,
    beforeLoad: () => {
        if (!checkIsAllowed("HELPER")) {
            throw ClientError.Unauthorized("이 페이지에 접근할 권한이 없습니다", {
                to: "/",
                label: "홈으로 이동",
            })
        }
    },
})
