import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import AutoComplete from "@/packages/components/AutoComplete/AutoComplete"
import { withHeadInstance } from "@/packages/api/axiosInstances"
import type { Book } from "@/shared/interfaces"
import useBookWriteStore from "../_bookWriteStore"

const getBookTitleArray = async () => {
    const response = await withHeadInstance.get("/book", { params: { activity: "total" } })
    const bookTitleArray = response.data.map((book: Book) => book.title)
    return bookTitleArray
}

const BWSubBookSection = () => {
    const setSubBookTitle = useBookWriteStore((state) => state.setSubBookTitle)

    const handleValueChange = (value: string, isError: boolean) => {
        if (isError) {
            setSubBookTitle(null)
            return
        }
        setSubBookTitle(value)
    }

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
                onValueChange={handleValueChange}
                outerIsRed={false}
            />
        </RoundBox>
    )
}

export default BWSubBookSection
