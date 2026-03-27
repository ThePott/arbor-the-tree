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
import { PAGE_LABEL_ARRAY, TAB_ARRAY } from "./utils/constants"
import { convertToChartData } from "./utils/convert-to-chart-data"
import { generatePdf } from "./utils/generate-pdf"
import type { TimeRecord } from "./utils/types"

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend)

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: false,
        },
    },
    scales: {
        y: {
            ticks: {
                // Include a unit in the ticks
                callback: (value: number) => `${value} ms`,
            },
        },
    },
}

const TestPdfPage = () => {
    const [selectedTab, setSelectedTab] = useState<ValueLabel>(TAB_ARRAY[0])
    const [timeRecordArray, setTimeRecordArray] = useState<TimeRecord[]>([])
    const appendTimeRecord = (timeRecord: TimeRecord) => {
        setTimeRecordArray((prev) => [...prev, timeRecord])
    }
    const data = convertToChartData(timeRecordArray)

    return (
        <Container width="xl" isPadded>
            <RoundBox padding="xl" color="bg0" radius="lg" isShadowed>
                <Vstack gap="lg">
                    <Title as="h1">PDF 생성 속도 비교</Title>
                    <TabBar variant="underline" tabArray={TAB_ARRAY} onSelect={(tab) => setSelectedTab(tab)} />
                    <Hstack>
                        <Button
                            color="bg1"
                            border="onHover"
                            padding="wide"
                            onClick={() =>
                                generatePdf({ multiplier: 1, byWhat: selectedTab.value, callback: appendTimeRecord })
                            }
                        >
                            {PAGE_LABEL_ARRAY[0]}
                        </Button>
                        <Button
                            color="bg1"
                            border="onHover"
                            padding="wide"
                            onClick={() =>
                                generatePdf({ multiplier: 10, byWhat: selectedTab.value, callback: appendTimeRecord })
                            }
                        >
                            {PAGE_LABEL_ARRAY[1]}
                        </Button>
                        <Button
                            color="bg1"
                            border="onHover"
                            padding="wide"
                            onClick={() =>
                                generatePdf({ multiplier: 100, byWhat: selectedTab.value, callback: appendTimeRecord })
                            }
                        >
                            {PAGE_LABEL_ARRAY[2]}
                        </Button>
                        <Button
                            color="bg1"
                            border="onHover"
                            padding="wide"
                            onClick={() =>
                                generatePdf({ multiplier: 1000, byWhat: selectedTab.value, callback: appendTimeRecord })
                            }
                        >
                            {PAGE_LABEL_ARRAY[3]}
                        </Button>
                    </Hstack>

                    <Bar options={options} data={data} />
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default TestPdfPage
