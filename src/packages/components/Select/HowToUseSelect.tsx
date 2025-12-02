import { ArrowBigDown } from "lucide-react"
import Select from "./Select"
import { useState } from "react"

const HowToUseSelect = () => {
    const [selectedOption, setSelectedOption] = useState<string | number | null>(null)

    return (
        <>
            <p>{JSON.stringify({ selectedOption })}</p>
            <Select onOptionSelect={(option) => setSelectedOption(option)}>
                <Select.Trigger>이걸 누르면 열립니다</Select.Trigger>

                <Select.Content>
                    <Select.Option>이렇게 텍스트만 써도 되고</Select.Option>
                    <Select.Option icon={<ArrowBigDown />}>
                        아이콘을 넣고 싶으면 prop icon에 할당하시면 됩니다
                    </Select.Option>
                    <Select.Option value={5}>value를 써 넣으면 onOptionSelect에서 value가 감지됩니다</Select.Option>
                    <Select.Option>value가 없으면 onOptionSelect에서 children이 감지됩니다</Select.Option>
                </Select.Content>
            </Select>
        </>
    )
}

export default HowToUseSelect
