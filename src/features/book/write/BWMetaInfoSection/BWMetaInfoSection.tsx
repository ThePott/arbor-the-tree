import Input from "@/packages/components/Input/Input"
import RoundBox from "@/packages/components/RoundBox"
import { Vstack } from "@/packages/components/layouts"
import Title from "@/packages/components/Title/Title"
import useBookWriteStore from "../bookWriteStore/bookWriteStore"

const BWMetaInfoSection = () => {
    const title = useBookWriteStore((state) => state.title)
    const setTitle = useBookWriteStore((state) => state.setTitle)
    const publishedYear = useBookWriteStore((state) => state.publishedYear)
    const setPublishedYear = useBookWriteStore((state) => state.setPublishedYear)

    return (
        <RoundBox isBordered padding="md">
            <Vstack gap="none">
                <Title as="h2" isMuted>
                    문제집 정보
                </Title>
                <Input
                    variant="ghost"
                    className="text-my-xl"
                    placeholder="문제집 제목을 입력하세요"
                    defaultValue={title}
                    onBlur={(event) => setTitle(event.target.value)}
                />
                <Input
                    variant="ghost"
                    type="number"
                    defaultValue={publishedYear}
                    placeholder="출간년도"
                    onBlur={(event) => setPublishedYear(Number(event.target.value))}
                />
            </Vstack>
        </RoundBox>
    )
}

export default BWMetaInfoSection
