import Button from "@/packages/components/Button/Button"
import { Hstack } from "@/packages/components/layouts"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import { getRouteApi, useNavigate } from "@tanstack/react-router"
import { X } from "lucide-react"
import type { JoinedBook } from ".."

const route = getRouteApi("/progress/")

type ProgressBookButtonProps = {
    joinedBook: JoinedBook | null
}
const ProgressBookButton = ({ joinedBook }: ProgressBookButtonProps) => {
    const navigate = useNavigate({ from: "/progress/" })
    const searchParams = route.useSearch()

    const deleteMutation = useSimpleMutation({
        method: "delete",
        url: `/progress/book/${joinedBook?.book.id}`,
        params: { student_id: joinedBook?.student_id, classroom_id: joinedBook?.classroom_id },
        queryKey: ["progressBook", { student_id: joinedBook?.student_id, classroom_id: joinedBook?.classroom_id }],
        update: ({ previous }: { previous: JoinedBook[] }) =>
            previous.filter((el) => el.book.id !== joinedBook?.book.id),
    })

    const handleBodyClick = () => {
        navigate({ search: { ...searchParams, book_id: joinedBook?.book.id } })
    }
    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation()
        deleteMutation.mutate({ body: undefined, additionalData: undefined })
    }

    const isDeleteButtonVisible =
        Boolean(searchParams.classroom_id) !== Boolean(searchParams.student_id) && joinedBook?.book.id

    return (
        <Button isBorderedOnHover color="black" isOnLeft onClick={handleBodyClick} className="grow">
            <Hstack className="w-full">
                <p className="grow">{joinedBook ? joinedBook.book.title : "전체"}</p>

                {isDeleteButtonVisible && (
                    <Button color="black" isBorderedOnHover onClick={handleDeleteClick}>
                        <X size={16} />
                    </Button>
                )}
            </Hstack>
        </Button>
    )
}

export default ProgressBookButton
