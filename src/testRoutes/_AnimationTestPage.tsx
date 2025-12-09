import { Hstack, Vstack } from "@/packages/components/layouts"
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

const colorArray: Color[] = ["red", "blue", "green", "bg0"]

const AnimationTestPage = () => {
    const [selectedColor, setSelectedColor] = useState<Color>("red")

    const handleClick = (color: Color) => {
        if (color === selectedColor) {
            return
        }
        document.startViewTransition(() => {
            setSelectedColor(color)
        })
    }

    const filteredColorArray = colorArray.filter((color) => color !== selectedColor)

    return (
        <Container width="md">
            <RoundBox>
                <Hstack>
                    <ColoredBox color={selectedColor} className="vt-slide grow" />
                    <Vstack>
                        {filteredColorArray.map((color) => (
                            <ColoredBox key={color} color={color} onClick={() => handleClick(color)} />
                        ))}
                    </Vstack>
                </Hstack>
            </RoundBox>
        </Container>
    )
}

export default AnimationTestPage
