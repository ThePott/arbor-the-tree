import Button from "@/packages/components/Button/Button"
import { Container, Hstack, Vstack } from "@/packages/components/layouts"
import TabBar, { type Tab } from "@/packages/components/TabBar/TabBar"
import { useState } from "react"
import { useNavigate } from "react-router"
import BookListTable from "./BookListTable/BookListTable"
import type { Book } from "@/shared/interfaces"

type BookTabValue = "active" | "inactive" | "total"

const tabArray: Tab<BookTabValue>[] = [
    { value: "active", label: "사용 중" },
    { value: "inactive", label: "사용 안 함" },
    { value: "total", label: "전체" },
]

const BookListContent = ({ bookArray }: { bookArray: Book[] }) => {
    const [selectedTab, setSelectedTab] = useState<Tab<BookTabValue>>(tabArray[0])
    const navigate = useNavigate()

    const filteredBookArray = bookArray.filter((book) => {
        switch (selectedTab.value) {
            case "active":
                return book.isActive
            case "inactive":
                return !book.isActive
            case "total":
                return true
        }
    })

    return (
        <Container width="lg" isPadded>
            <Vstack gap="xl">
                <Hstack className="justify-between">
                    <h1 className="text-my-xl font-semibold">문제집 관리</h1>
                    <Button color="green" onClick={() => navigate("/book/write")}>
                        새 문제집 관리
                    </Button>
                </Hstack>
                <TabBar variant="underline" tabArray={tabArray} onSelect={(tab) => setSelectedTab(tab)} />
                <BookListTable bookArray={filteredBookArray} />
            </Vstack>
        </Container>
    )
}

export default BookListContent
