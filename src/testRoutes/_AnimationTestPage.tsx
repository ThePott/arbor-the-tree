import { Vstack } from "@/packages/components/layouts"
import Container from "@/packages/components/layouts/_Container"
import RoundBox from "@/packages/components/RoundBox"
import type { Color, DivProps } from "@/shared/interfaces"
import { useState } from "react"

const ColoredBox = ({ color, ...props }: { color: Color } & DivProps) => {
    const { children: _children, ...rest } = props

    return (
        <RoundBox color={color} padding="xl" {...rest}>
            this is content
        </RoundBox>
    )
}

const initialColorArray: Color[] = ["red", "blue", "green", "bg0"]

const AnimationTestPage = () => {
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
        <Container width="md" isPadded>
            <RoundBox>
                <Vstack>
                    {colorArray.map((color) => (
                        <ColoredBox
                            key={color}
                            color={color}
                            onClick={() => handleClick(color)}
                            style={{ viewTransitionName: color }}
                        />
                    ))}
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default AnimationTestPage
