import { FlexOneContainer } from "@/packages/components/layouts"
import type { ReactNode } from "react"

type OutletContainerProps = {
    forWhat: "progress" | "rest"
    children: ReactNode
}
const OutletContainer = ({ forWhat, children }: OutletContainerProps) => {
    switch (forWhat) {
        case "progress":
            return (
                <FlexOneContainer
                    isXScrollable
                    className="border-l border-l-border-dim h-full pt-my-lg pl-my-lg ml-my-lg"
                >
                    {children}
                </FlexOneContainer>
            )
        case "rest":
            return (
                <FlexOneContainer isYScrollable className="border-l border-l-border-dim ml-my-lg">
                    {children}
                </FlexOneContainer>
            )
    }
}

export default OutletContainer
