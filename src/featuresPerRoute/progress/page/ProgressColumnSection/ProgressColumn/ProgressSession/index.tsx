import type { ConciseSession } from "@/featuresPerRoute/progress/types"
import RoundBox from "@/packages/components/RoundBox"

type ProgressSession = {
    conciseSession: ConciseSession
}
const ProgressSession = ({ conciseSession }: ProgressSession) => {
    return (
        <RoundBox isBordered padding="md" className="w-[200px]">
            <p>{JSON.stringify(conciseSession)}</p>
        </RoundBox>
    )
}

export default ProgressSession
