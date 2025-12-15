import AutoComplete from "@/packages/components/AutoComplete/AutoComplete"
import Container from "@/packages/components/layouts/_Container"

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
    return (
        <Container isPadded width="md">
            <AutoComplete onChange={() => {}} isNewOptionAvailable={false}>
                <AutoComplete.Input />
                <AutoComplete.Content>
                    {optionArray.map((option) => (
                        <AutoComplete.Option>{option}</AutoComplete.Option>
                    ))}
                </AutoComplete.Content>
            </AutoComplete>
        </Container>
    )
}

export default AutoCompleteTestPage
