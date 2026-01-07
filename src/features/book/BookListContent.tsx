import Button from "@/packages/components/Button/Button"
import { Container, Hstack, Vstack } from "@/packages/components/layouts"
import TabBar from "@/packages/components/TabBar/TabBar"
import { useNavigate } from "react-router"
import BookListTable from "./BookListTable/BookListTable"
import { BOOK_LIST_TAB_ARRAY } from "./_bookArrayConstant"
import useBookListStore from "./_bookListStore"
import BookListDeleteModal from "./_BookListDeleteModal"

const BookListContent = () => {
    const setSelectedTab = useBookListStore((state) => state.setSelectedTab)
    const bookArray = useBookListStore((state) => state.bookArray)
    const isPending = useBookListStore((state) => state.isPending)

    const navigate = useNavigate()

    return (
        <>
            <Container width="lg" isPadded>
                <Vstack gap="xl">
                    <Hstack className="justify-between">
                        <h1 className="text-my-xl font-semibold">문제집 관리</h1>
                        <Button color="green" onClick={() => navigate("/book/write")}>
                            새 문제집 관리
                        </Button>
                    </Hstack>
                    <TabBar
                        variant="underline"
                        tabArray={BOOK_LIST_TAB_ARRAY}
                        onSelect={(tab) => setSelectedTab(tab)}
                    />
                    {isPending && <p>partial skeleton</p>}
                    {!isPending && <BookListTable bookArray={bookArray} />}
                </Vstack>
            </Container>

            <BookListDeleteModal />
        </>
    )
}

export default BookListContent
