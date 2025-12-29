import Input from "@/packages/components/Input/Input"
import RoundBox from "@/packages/components/RoundBox"
import { useState } from "react"

const TableTestPage = () => {
    const [value, setValue] = useState("")

    return (
        <RoundBox padding="xl" isBordered>
            {Array(2000)
                .fill(null)
                .map((_, index) => (
                    <Input key={index} value={value} onChange={(event) => setValue(event.target.value)} />
                ))}
        </RoundBox>
    )
}

export default TableTestPage
