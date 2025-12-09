import { Vstack } from "@/packages/components/layouts"
import Container from "@/packages/components/layouts/_Container"
import RoundBox from "@/packages/components/RoundBox"
import type { Color, DivProps } from "@/shared/interfaces"
import { Activity, useState } from "react"
import "./_AnimationTestPage.css"

const ColoredBox = ({ color, ...props }: { color: Color } & DivProps) => {
    const { children: _children, ...rest } = props

    return (
        <RoundBox color={color} padding="xl" {...rest}>
            this is content
        </RoundBox>
    )
}

const initialColorArray: Color[] = ["red", "blue", "green", "bg0"]

const JustReorderBox = () => {
    const [colorArray, setColorArray] = useState<Color[]>(initialColorArray)

    const handleClick = (color: Color) => {
        if (color === colorArray[0]) {
            return
        }
        const newColorArray = colorArray.filter((el) => el !== color)
        newColorArray.unshift(color)

        document.startViewTransition(() => {
            setColorArray(newColorArray)
        })
    }

    return (
        <RoundBox isBordered padding="xl">
            <Vstack>
                {colorArray.map((color) => (
                    <ColoredBox
                        key={color}
                        color={color}
                        onClick={() => handleClick(color)}
                        style={{ viewTransitionName: color, animationDuration: "0.01" }}
                    />
                ))}
            </Vstack>
        </RoundBox>
    )
}

// TODO: 현재 문제 - view transition이 작동을 안 하는데 원인을 모르겠음
// TODO: Activity는 아무 효과 없음
const RemoveCurrentBox = () => {
    const [colorArray, setColorArray] = useState<Color[]>(initialColorArray)

    const handleClick = (color: Color) => {
        const newColorArray = initialColorArray.filter((el) => el !== color)

        document.startViewTransition(() => {
            setColorArray(newColorArray)
        })
    }
    return (
        <RoundBox padding="xl" isBordered>
            <Vstack>
                {initialColorArray.map((color) => (
                    <Activity mode={colorArray.includes(color) ? "visible" : "hidden"}>
                        <ColoredBox
                            key={`remove_${color}`}
                            color={color}
                            onClick={() => handleClick(color)}
                            style={{ viewTransitionName: `remove_${color}` }}
                        />
                    </Activity>
                ))}
            </Vstack>
        </RoundBox>
    )
}

const AnimationTestPage = () => {
    return (
        <Container width="md" isPadded>
            <Vstack gap="xl">
                <JustReorderBox />
                <RemoveCurrentBox />
            </Vstack>
        </Container>
    )
}

export default AnimationTestPage
