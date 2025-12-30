import { Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import TabBar from "@/packages/components/TabBar/TabBar"
import Textarea from "@/packages/components/Textarea/Textarea"
import Title from "@/packages/components/Title/Title"
import useBookWriteStore from "../_bookWriteStore"
import { useEffect, useRef } from "react"

const BWTopicStepSection = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const selectedTab = useBookWriteStore((state) => state.selectedTab)
    const setSelectedTab = useBookWriteStore((state) => state.setSelectedTab)
    const topicInfo = useBookWriteStore((state) => state.topicInfo)
    const setTopicInfo = useBookWriteStore((state) => state.setTopicInfo)
    const stepInfo = useBookWriteStore((state) => state.stepInfo)
    const setStepInfo = useBookWriteStore((state) => state.setStepInfo)

    const isTopicSelected = selectedTab.value === "topic"

    useEffect(() => {
        if (!textareaRef.current) return

        textareaRef.current.value = isTopicSelected ? topicInfo : stepInfo
    }, [isTopicSelected])

    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement, Element>) => {
        const value = event.target.value

        if (isTopicSelected) {
            setTopicInfo(value)
            return
        }

        setStepInfo(value)
    }

    return (
        <RoundBox className="flex-1" isBordered padding="md">
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
                <Textarea ref={textareaRef} className="flex-1" onBlur={handleBlur} />
            </Vstack>
        </RoundBox>
    )
}

export default BWTopicStepSection
