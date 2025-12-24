import Input from "@/packages/components/Input/Input"
import { FlexOneContainer, Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import useBookWriteStore from "./_bookWriteStore"
import Title from "@/packages/components/Title/Title"

const BookWriteContent = () => {
    const title = useBookWriteStore((state) => state.title)
    const setTitle = useBookWriteStore((state) => state.setTitle)

    return (
        <Hstack gap="xl" className="p-my-xl h-full w-full">
            <Vstack className="w-[400px]">
                <Input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    variant="ghost"
                    className="text-my-xl"
                    placeholder="문제집 제목을 입력하세요"
                />
                <RoundBox className="flex-1">
                    <Title as="h2" isMuted>
                        단원 정보 기입
                    </Title>
                </RoundBox>
                <RoundBox className="flex-1">
                    <Title as="h2" isMuted>
                        하위 문제집
                    </Title>
                </RoundBox>
            </Vstack>

            <FlexOneContainer isYScrollable>
                <Title as="h2" isMuted>
                    문제 정보 기입
                </Title>
                <div className="bg-bg-3 h-[1000px] w-full" />
            </FlexOneContainer>
        </Hstack>
    )
}

export default BookWriteContent
