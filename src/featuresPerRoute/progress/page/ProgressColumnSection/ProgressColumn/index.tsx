import type { ConciseSyllabus } from "@/featuresPerRoute/progress/types"
import RoundBox from "@/packages/components/RoundBox"

type ProgressColumnProps = {
    conciseSyllabus: ConciseSyllabus
}
const ProgressColumn = ({ conciseSyllabus }: ProgressColumnProps) => {
    return (
        <RoundBox padding="md" isBordered className="h-full overflow-y-hidden shrink-0 w-[200px]">
            <p>{JSON.stringify(conciseSyllabus)}</p>
        </RoundBox>
    )
}

export default ProgressColumn
