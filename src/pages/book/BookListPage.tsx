import Button from "@/packages/components/Button/Button"
import { Container, Hstack, Vstack } from "@/packages/components/layouts"
import TabBar, { type Tab } from "@/packages/components/TabBar/TabBar"
import { useState } from "react"
import { useNavigate } from "react-router"

const tabArray: Tab[] = [
    { value: "active", label: "사용 중" },
    { value: "inactive", label: "사용 안 함" },
    { value: "total", label: "전체" },
]

const BookListPage = () => {
    const [_selectedTab, setSelectedTab] = useState<Tab>(tabArray[0])
    const navigate = useNavigate()

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
            </Vstack>
        </Container>
    )
}

export default BookListPage
