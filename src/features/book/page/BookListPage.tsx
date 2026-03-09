import Button from "@/packages/components/Button/Button"
import { Container, FlexOneContainer, Hstack, Vstack } from "@/packages/components/layouts"
import useGlobalStore from "@/shared/store/globalStore"
import { useNavigate } from "@tanstack/react-router"
import BookListDeleteModal from "./_BookListDeleteModal"
import useBookListStore from "./_bookListStore"
import BookListTable from "./BookListTable/BookListTable"

const BookListPage = () => {
    const isBodyScrollable = useGlobalStore((state) => state.isBodyScrollable)
    const bookArray = useBookListStore((state) => state.bookArray)

    const navigate = useNavigate()

    return (
        <>
            <FlexOneContainer isYScrollable={isBodyScrollable} className="h-full [scrollbar-gutter:stable]">
                <Container width="lg" isPadded>
                    <Vstack gap="xl">
                        <Hstack className="justify-between">
                            <h1 className="text-my-xl font-semibold">문제집 관리</h1>
                            <Button color="green" onClick={() => navigate({ to: "/book/write" })}>
                                문제집 추가
                            </Button>
                        </Hstack>
                        <BookListTable bookArray={bookArray} />
                    </Vstack>
                </Container>
            </FlexOneContainer>

            <BookListDeleteModal />
        </>
    )
}

export default BookListPage
