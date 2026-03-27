import { instance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import { Container, Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import TabBar from "@/packages/components/TabBar/TabBar"
import Title from "@/packages/components/Title/Title"
import type { ValueLabel } from "@/shared/interfaces"
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Title as ChartTitle,
    Legend,
    LinearScale,
    Tooltip,
} from "chart.js"
import { useState } from "react"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend)

const PAGE_COUNT_IN_BOOK = 8

const tabArray: ValueLabel[] = [
    { value: "reactPdfDefault", label: "react-pdf/renderer" },
    { value: "reactPdfWithWebWorker", label: "react-pdf/renderer with web worker" },
    { value: "typst", label: "typst" },
]

const getTypstPdf = async (multiplier: number): Promise<{ count: number; time: number }> => {
    const start = performance.now()

    const response = await instance.get(`/test/pdf`, {
        responseType: "blob",
        params: { multiplier },
    })
    const blob = response.data
    const url = URL.createObjectURL(blob)
    window.open(url)

    const end = performance.now()
    const time = end - start
    return { count: multiplier * PAGE_COUNT_IN_BOOK, time }
}

type GeneratePdfProps = {
    multiplier: number
    byWhat: string
}
const generatePdf = async ({ multiplier, byWhat }: GeneratePdfProps): Promise<{ count: number; time: number }> => {
    switch (byWhat) {
        case "reactPdfDefault":
        case "reactPdfWithWebWorker":
        case "typst":
            return getTypstPdf(multiplier)
        default:
            throw new Error("not supported")
    }
}

const labels = ["8쪽", "80쪽", "800쪽", "8000쪽"]

const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: labels.map(() => 100),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: labels.map(() => 123),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
}

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Chart.js Bar Chart",
        },
    },
}

const TestPdfPage = () => {
    const [selectedTab, setSelectedTab] = useState<ValueLabel>(tabArray[0])

    return (
        <Container width="xl" isPadded>
            <RoundBox padding="xl" color="bg0" radius="lg" isShadowed>
                <Vstack gap="lg">
                    <Title as="h1">PDF 생성 속도 비교</Title>
                    <TabBar variant="underline" tabArray={tabArray} onSelect={(tab) => setSelectedTab(tab)} />
                    <Hstack>
                        <Button
                            color="bg1"
                            border="onHover"
                            padding="wide"
                            onClick={() => generatePdf({ multiplier: 1, byWhat: selectedTab.value })}
                        >
                            8매
                        </Button>
                        <Button
                            color="bg1"
                            border="onHover"
                            padding="wide"
                            onClick={() => generatePdf({ multiplier: 10, byWhat: selectedTab.value })}
                        >
                            80매
                        </Button>
                        <Button
                            color="bg1"
                            border="onHover"
                            padding="wide"
                            onClick={() => generatePdf({ multiplier: 100, byWhat: selectedTab.value })}
                        >
                            800매
                        </Button>
                        <Button
                            color="bg1"
                            border="onHover"
                            padding="wide"
                            onClick={() => generatePdf({ multiplier: 1000, byWhat: selectedTab.value })}
                        >
                            8000매
                        </Button>
                    </Hstack>
                    <Bar options={options} data={data} />
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default TestPdfPage
