import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import InputTable from "@/packages/components/Table/InputTable"

const TableTestPage = () => {
    return (
        <Container isPadded>
            <RoundBox padding="xl" isBordered>
                <InputTable
                    keyArray={["question_page", "solution_page"]}
                    rowArray={Array(50)
                        .fill(null)
                        .map(() => ({ question_page: "", solution_page: "" }))}
                    keyToLabel={{ question_page: "문제 쪽 번호", solution_page: "답지 쪽 번호" }}
                />
            </RoundBox>
        </Container>
    )
}

export default TableTestPage
