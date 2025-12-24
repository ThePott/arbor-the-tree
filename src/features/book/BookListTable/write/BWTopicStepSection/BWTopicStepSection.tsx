import { Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import TabBar from "@/packages/components/TabBar/TabBar"
import Textarea from "@/packages/components/Textarea/Textarea"
import Title from "@/packages/components/Title/Title"

const BWTopicStepSection = () => {
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
                    onSelect={() => {}}
                />
                <Textarea className="flex-1" />
            </Vstack>
        </RoundBox>
    )
}

export default BWTopicStepSection
