import type { ConciseSession } from "@/featuresPerRoute/progress/types"
import RoundBox from "@/packages/components/RoundBox"

type ProgressSessionLabelProps = {
    conciseSession: ConciseSession
}
const ProgressSessionLabel = ({ conciseSession }: ProgressSessionLabelProps) => {
    if (conciseSession.end.topic) {
        return (
            <>
                <p>{conciseSession.start.step}</p>
                <p> ~</p>
                <p className="text-fg-muted">{conciseSession.end.topic}</p>
                <p>{conciseSession.end.step}</p>
            </>
        )
    }
    if (conciseSession.end.step) {
        return (
            <>
                <p>{conciseSession.start.step}</p>
                <p>~ {conciseSession.end.step}</p>
            </>
        )
    }
    return <p>{conciseSession.start.step}</p>
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
