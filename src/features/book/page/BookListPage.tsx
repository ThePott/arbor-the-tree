import Button from "@/packages/components/Button/Button"
import { Container, FlexOneContainer, Hstack, Vstack } from "@/packages/components/layouts"
import useGlobalStore from "@/shared/store/globalStore"
import { useQuery } from "@tanstack/react-query"
import { useLoaderData, useNavigate } from "@tanstack/react-router"
import { bookQueryOptions } from "../loader/bookListLoaderFn"
import BookListDeleteModal from "./_BookListDeleteModal"
import BookListTable from "./BookListTable/BookListTable"

const BookListPage = () => {
    const { bookArray: loaderData } = useLoaderData({ from: "/book/" })
    const { data: queryData } = useQuery(bookQueryOptions)

    const isBodyScrollable = useGlobalStore((state) => state.isBodyScrollable)

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
                        <BookListTable bookArray={queryData ?? loaderData} />
                    </Vstack>
                </Container>
            </FlexOneContainer>

            <BookListDeleteModal />
        </>
    )
}

export default BookListPage
