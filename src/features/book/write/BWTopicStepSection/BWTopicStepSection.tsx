import { Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import TabBar from "@/packages/components/TabBar/TabBar"
import Textarea from "@/packages/components/Textarea/Textarea"
import Title from "@/packages/components/Title/Title"
import useBookWriteStore from "../_bookWriteStore"

const BWTopicStepSection = () => {
    const selectedTab = useBookWriteStore((state) => state.selectedTab)
    const setSelectedTab = useBookWriteStore((state) => state.setSelectedTab)
    const topicInfo = useBookWriteStore((state) => state.topicInfo)
    const setTopicInfo = useBookWriteStore((state) => state.setTopicInfo)
    const stepInfo = useBookWriteStore((state) => state.stepInfo)
    const setStepInfo = useBookWriteStore((state) => state.setStepInfo)

    const isTopicSelected = selectedTab.value === "topic"
    const value = isTopicSelected ? topicInfo : stepInfo
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (isTopicSelected) {
            setTopicInfo(event.target.value)
            return
        }
        setStepInfo(event.target.value)
    }

    return (
        <RoundBox className="flex-1">
            <Vstack className="h-full">
                <Title as="h2" isMuted>
                    단원 정보 기입
                </Title>
                <TabBar
                    tabArray={[
                        { value: "topic", label: "중단원" },
                        { value: "step", label: "소단원" },
                    ]}
                    variant="underline"
                    onSelect={setSelectedTab}
                />
                <Textarea className="flex-1" value={value} onChange={handleChange} />
            </Vstack>
        </RoundBox>
    )
}

export default BWTopicStepSection
