import { FlexOneContainer, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import type { ReactNode } from "react"

type ColumnWithBoxesContentProps = { children: ReactNode }
const ColumnWithBoxesContent = ({ children }: ColumnWithBoxesContentProps) => {
    return (
        <FlexOneContainer isYScrollable className="px-my-lg pb-my-lg">
            <Vstack>{children}</Vstack>
        </FlexOneContainer>
    )
}

type ColumnWithBoxesTitleProps = { children: string }
const ColumnWithBoxesTitle = ({ children }: ColumnWithBoxesTitleProps) => {
    return (
        <Title as="h3" className="px-my-lg pt-my-lg">
            {children}
        </Title>
    )
}

type ColumnWithBoxesProps = { children: ReactNode }
const ColumnWithBoxes = ({ children }: ColumnWithBoxesProps) => {
    return (
        <RoundBox isBordered color="bg0" className="h-full shrink-0 overflow-hidden">
            <Vstack className="h-full w-[300px]">{children}</Vstack>
        </RoundBox>
    )
}

ColumnWithBoxes.Title = ColumnWithBoxesTitle
ColumnWithBoxes.Content = ColumnWithBoxesContent

export default ColumnWithBoxes
