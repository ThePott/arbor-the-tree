import Button from "@/packages/components/Button/Button"
import Labeled from "@/packages/components/Labeled/Labeled"
import { Hstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import { Plus, Trash } from "lucide-react"
import { useState } from "react"

const ParentInputMany = () => {
    const [childrenCount, setChildrenCount] = useState(1)
    const indexArray = Array(childrenCount).fill(0)

    const handleClick = () => setChildrenCount(childrenCount + 1)

    return (
        <>
            {indexArray.map((_, index) => (
                <RoundBox isBordered padding="md">
                    <Hstack>
                        <Labeled key={`name ${index}`} className="w-full">
                            <Labeled.Header>자녀 이름</Labeled.Header>
                            <Labeled.Input />
                            <Labeled.Footer>여기에 에러를 적습니다</Labeled.Footer>
                        </Labeled>
                        <Labeled key={`phone ${index}`} className="w-full">
                            <Labeled.Header>자녀 핸드폰 번호</Labeled.Header>
                            <Labeled.Input />
                            <Labeled.Footer>여기에 에러를 적습니다</Labeled.Footer>
                        </Labeled>
                        <Button color="red">
                            <Trash />
                        </Button>
                    </Hstack>
                </RoundBox>
            ))}
            <Button isShadowed onClick={handleClick} isWide>
                <Plus size={16} />
            </Button>
        </>
    )
}

export default ParentInputMany
