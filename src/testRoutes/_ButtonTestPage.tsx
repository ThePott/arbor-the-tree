import Button from "@/packages/Button"
import { Vstack } from "@/packages/layouts"
import RoundBox from "@/packages/RoundBox"
import { buttonColorArray, type ButtonColor } from "@/shared/utils/styles"

const TestButton = ({ color }: { color: ButtonColor }) => {
    return <Button color={color}>이것을 누르세요</Button>
}

const ButtonTestPage = () => {
    return (
        <div className="p-my-xl">
            <RoundBox isShadowed padding="xl">
                <Vstack>
                    {buttonColorArray.map((color) => (
                        <TestButton color={color} />
                    ))}
                </Vstack>
            </RoundBox>
        </div>
    )
}

export default ButtonTestPage
