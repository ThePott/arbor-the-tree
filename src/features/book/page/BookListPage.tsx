import Button from "@/packages/components/Button/Button"
import { Container, FlexOneContainer, Hstack, Vstack } from "@/packages/components/layouts"
import Title from "@/packages/components/Title/Title"
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
                    <Vstack gap="lg">
                        <Hstack className="justify-between items-end">
                            <Title as="h1">문제집 등록 / 삭제</Title>
                            <Button color="green" onClick={() => navigate({ to: "/book/write" })}>
                                문제집 등록
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
