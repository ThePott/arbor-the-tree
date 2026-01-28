import { useState } from "react"
import Select from "./Select"

const HowToUseSelect = () => {
    // TODO: CHANGE HERE TO GENERIC I GUESS????
    const [selectedOption, setSelectedOption] = useState<string | number | null>(null)

    return (
        <>
            <p>{JSON.stringify({ selectedOption })}</p>
            <Select onOptionSelect={(option) => setSelectedOption(option)}>
                <Select.Trigger>이걸 누르면 열립니다</Select.Trigger>

                <Select.Content>
                    <Select.Option value={5}>value를 써 넣으면 onOptionSelect에서 value가 감지됩니다</Select.Option>
                </Select.Content>
            </Select>
        </>
    )
}

export default HowToUseSelect
