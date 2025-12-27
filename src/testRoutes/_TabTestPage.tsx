import Button from "@/packages/components/Button/Button"
import Input from "@/packages/components/Input/Input"
import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import { useState } from "react"

const dummyKeyArray = ["question_page", "solution_page"] as const
type DummyKey = (typeof dummyKeyArray)[number]
const keyToLabel: Record<DummyKey, string> = {
    question_page: "문제 쪽 번호",
    solution_page: "답지 쪽 번호",
}
type DummyInterface = Record<DummyKey, string>

const dummyData: DummyInterface[] = Array(50)
    .fill(null)
    .map(() => ({ question_page: "", solution_page: "" }))

const TabTestPage = () => {
    const [data, setData] = useState<DummyInterface[]>(dummyData)
    const [convertedData, setConvertedData] = useState<DummyInterface[]>(dummyData)
    const [selectedLabel, _setSelectedLabel] = useState("something")

    return (
        <Container width="lg" isPadded>
            <RoundBox padding="xl" isBordered>
                <div>Tab Test Page</div>
                <div>{selectedLabel}</div>
                <Button onClick={() => console.log({ data })}>print</Button>
                <table>
                    <thead>
                        <tr>
                            {dummyKeyArray.map((key) => (
                                <th key={key} className="border">
                                    {keyToLabel[key]}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((el, rowIndex) => (
                            <tr key={rowIndex}>
                                {dummyKeyArray.map((key) => (
                                    <td key={key} className="border p-3">
                                        <div className="relative">
                                            <Input
                                                onBlur={(event) => {
                                                    const value = event.target.value
                                                    const newData = [...data]
                                                    newData[rowIndex][key] = value
                                                    setData(newData)

                                                    if (value !== "/") return
                                                }}
                                                defaultValue={el[key]}
                                            />
                                            <p className="absolute top-1/2 right-4 -translate-y-1/2 text-red-400/60">
                                                {convertedData[rowIndex][key]}
                                            </p>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </RoundBox>
        </Container>
    )
}

export default TabTestPage
