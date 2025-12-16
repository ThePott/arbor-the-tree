import AutoComplete from "@/packages/components/AutoComplete/AutoComplete"
import Container from "@/packages/components/layouts/_Container"
import { useState } from "react"

const optionArray: string[] = [
    "apple",
    "banana",
    "carrot",
    "dinosaur",
    "elephant",
    "forest",
    "guitar",
    "house",
    "igloo",
    "jungle",
    "keyboard",
    "lemon",
    "mountain",
    "notebook",
    "ocean",
    "pencil",
    "queen",
    "rainbow",
    "sunset",
    "turtle",
    "umbrella",
    "volcano",
    "waterfall",
    "xylophone",
    "yellow",
    "zebra",
]

const AutoCompleteTestPage = () => {
    const [filteredOptionArray, setFileteredOptionArray] = useState<string[]>(optionArray)

    const handleChage = (value: string) => {
        const filtered: string[] = optionArray.filter((option) => option.includes(value))
        setFileteredOptionArray(filtered)
    }

    return (
        <Container isPadded width="md">
            <AutoComplete onChange={handleChage} isNewOptionAvailable={false}>
                <AutoComplete.Input />
                <AutoComplete.Content>
                    {filteredOptionArray.map((option) => (
                        <AutoComplete.Option>{option}</AutoComplete.Option>
                    ))}
                </AutoComplete.Content>
            </AutoComplete>
        </Container>
    )
}

export default AutoCompleteTestPage
