import Button from "@/packages/components/Button/Button"
import { Container, Hstack, Vstack } from "@/packages/components/layouts"
import { useNavigate } from "react-router"
import BookListTable from "./BookListTable/BookListTable"
import useBookListStore from "./_bookListStore"
import BookListDeleteModal from "./_BookListDeleteModal"

const BookListContent = () => {
    const bookArray = useBookListStore((state) => state.bookArray)

    const navigate = useNavigate()

    return (
        <>
            <Container width="lg" isPadded>
                <Vstack gap="xl">
                    <Hstack className="justify-between">
                        <h1 className="text-my-xl font-semibold">문제집 관리</h1>
                        <Button color="green" onClick={() => navigate("/book/write")}>
                            문제집 추가
                        </Button>
                    </Hstack>
                    <BookListTable bookArray={bookArray} />
                </Vstack>
            </Container>

            <BookListDeleteModal />
        </>
    )
}

export default BookListContent
