import type { ReactNode } from "react"
import RoundBox from "../RoundBox"
import { Vstack } from "../layouts"

const AutoCompleteContent = ({ children }: { children: ReactNode }) => {
    return (
        <RoundBox color="bg2" padding="md" className="max-h-[500px] overflow-y-scroll">
            <Vstack>{children}</Vstack>
        </RoundBox>
    )
}

export default AutoCompleteContent
