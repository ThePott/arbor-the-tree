import Input from "@/packages/components/Input/Input"
import { Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"

const BookWriteContent = () => {
    return (
        <Hstack gap="xl" className="p-my-xl h-full w-full">
            <Vstack className="w-[400px]">
                <Input className="text-my-xl" placeholder="문제집 제목을 입력하세요" />
                <RoundBox padding="xl" isBordered className="flex-1">
                    단원 정보 기입 placeholder
                </RoundBox>
                <RoundBox padding="xl" isBordered className="flex-1">
                    하위 문제집placeholder
                </RoundBox>
            </Vstack>

            <RoundBox padding="xl" isBordered className="h-full grow">
                placeholder for table
            </RoundBox>
        </Hstack>
    )
}

export default BookWriteContent
