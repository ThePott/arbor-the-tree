import Button from "@/packages/components/Button/Button"
import { type ButtonColor, buttonColorArray, buttonStatusArray } from "@/packages/components/Button/buttonInterfaces"
import { Hstack, Vstack } from "@/packages/components/layouts"
import Loader from "@/packages/components/Loader/Loader"
import RoundBox from "@/packages/components/RoundBox"

const ButtonStatusRow = ({ color }: { color: ButtonColor }) => {
    return (
        <Hstack>
            {buttonStatusArray.map((status) => (
                <Button color={color} status={status}>
                    {status}
                </Button>
            ))}
        </Hstack>
    )
}

const ButtonTestPage = () => {
    return (
        <div className="p-my-xl">
            <h1>여기에다가 아무렇게나 쓰고</h1>
            <RoundBox isShadowed padding="xl">
                <Vstack>
                    {buttonColorArray.map((color) => (
                        <ButtonStatusRow color={color} />
                    ))}
                </Vstack>
            </RoundBox>
        </div>
    )
}

export default ButtonTestPage
