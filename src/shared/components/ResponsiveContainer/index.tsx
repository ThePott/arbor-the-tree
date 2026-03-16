import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import useMediaQuery from "@/shared/utils/use-media-query"
import type { ReactNode } from "react"

type ProfileContainerProps = {
    width: "sm" | "md" | "lg" | "xl"
    children: ReactNode
}
const ResponsiveContainer = ({ width, children }: ProfileContainerProps) => {
    const { isBig } = useMediaQuery()
    if (!isBig) return <RoundBox padding="xl">{children}</RoundBox>

    return (
        <Container width={width} isPadded>
            <RoundBox isShadowed padding="xl" color="bg0" radius="lg">
                {children}
            </RoundBox>
        </Container>
    )
}

export default ResponsiveContainer
