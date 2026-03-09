import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import type { BookResponseData } from "../loader/bookListLoaderFn"
import useBookListStore from "./_bookListStore"

const useBookListMutation = () => {
    const setModalKey = useBookListStore((state) => state.setModalKey)
    const selectedBook = useBookListStore((state) => state.selectedBook)
    const deleteMutation = useSimpleMutation({
        method: "delete",
        url: `/book/${selectedBook?.id}`,
        queryKey: ["book"],
        update: ({ previous }: { previous: BookResponseData }) => {
            return previous.filter((book) => book.id !== selectedBook?.id)
        },
        additionalOnSetteled: () => setModalKey(null),
    })

    return { deleteMutation }
}

export default useBookListMutation
