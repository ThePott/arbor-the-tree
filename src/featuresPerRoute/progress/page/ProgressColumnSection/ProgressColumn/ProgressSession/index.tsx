import type { ConciseSession } from "@/featuresPerRoute/progress/types"
import RoundBox from "@/packages/components/RoundBox"

type ProgressSessionLabelProps = {
    conciseSession: ConciseSession
}
const ProgressSessionLabel = ({ conciseSession }: ProgressSessionLabelProps) => {
    return (
        <>
            <p>{conciseSession.start.step}</p>
            {conciseSession.end.topic && (
                <p className="text-fg-muted text-my-sm pl-[14px]">{conciseSession.end.topic}</p>
            )}
            {conciseSession.end.step && <p>~ {conciseSession.end.step}</p>}
        </>
    )
}

type ProgressSessionProps = {
    conciseSession: ConciseSession
}
const ProgressSession = ({ conciseSession }: ProgressSessionProps) => {
    return (
        <RoundBox isBordered padding="md" className="w-full">
            <ProgressSessionLabel conciseSession={conciseSession} />
        </RoundBox>
    )
}

export default ProgressSession
