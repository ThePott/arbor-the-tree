import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import useBookWriteQuery from "../_useBookWriteQuery"
import AutoComplete from "@/packages/components/AutoComplete/AutoComplete"
import { withHeadInstance } from "@/packages/api/axiosInstances"
import type { Book } from "@/shared/interfaces"

const getBookTitleArray = async () => {
    const response = await withHeadInstance.get("/book", { params: { activity: "total" } })
    const bookTitleArray = response.data.map((book: Book) => book.title)
    return bookTitleArray
}

const BWSubBookSection = () => {
    useBookWriteQuery()

    return (
        <RoundBox className="flex-1">
            <Title as="h2" isMuted>
                하위 문제집
            </Title>
            <AutoComplete
                available="onlyExisting"
                queryKey={["book", "title"]}
                getOptionArray={getBookTitleArray}
                onErrorChange={() => {}}
                onValueChange={() => {}}
                outerIsRed={false}
            />
        </RoundBox>
    )
}

export default BWSubBookSection
