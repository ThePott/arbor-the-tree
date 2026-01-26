import type { ConciseSession } from "@/featuresPerRoute/progress/types"
import RoundBox from "@/packages/components/RoundBox"

type ProgressSession = {
    conciseSession: ConciseSession
}
const ProgressSession = ({ conciseSession }: ProgressSession) => {
    return (
        <RoundBox isBordered padding="md" className="w-full">
            <p>{conciseSession.start.topic}</p>
            <p>{conciseSession.start.step}</p>
            <p>{conciseSession.end.topic}</p>
            <p>{conciseSession.end.step}</p>
        </RoundBox>
    )
}

export default ProgressSession
