import type { ConciseSession } from "@/featuresPerRoute/progress/types"
import RoundBox from "@/packages/components/RoundBox"

type ProgressSession = {
    conciseSession: ConciseSession
}
const ProgressSession = ({ conciseSession }: ProgressSession) => {
    const label = conciseSession.topic_step.replace(" __", "\n").replace(" ~ ", "\n~ ")
    return (
        <RoundBox isBordered padding="md" className="w-[200px]">
            <pre className="text-wrap">{label}</pre>
        </RoundBox>
    )
}

export default ProgressSession
