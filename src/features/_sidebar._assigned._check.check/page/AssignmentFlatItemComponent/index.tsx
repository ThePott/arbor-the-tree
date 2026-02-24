import { ClientError } from "@/shared/error/clientError"
import type { ReviewAssginmentQuestion } from "@/shared/interfaces"
import Checkbox from "../flatItemComponents/Checkbox"
import CheckboxGrid from "../flatItemComponents/CheckboxGrid"
import SubtitleHeader from "../flatItemComponents/SubtitleHeader"
import TitleHeader from "../flatItemComponents/TitleHeader"

export type AssignmentFlatItem =
    | { forWhat: "title"; title: string }
    | { forWhat: "subtitle"; title: string }
    | { forWhat: "assignmentQuestions"; reviewAssignmentQuestions: ReviewAssginmentQuestion[] }
const AssignmentFlatItemComponent = ({ flatItem }: { flatItem: AssignmentFlatItem }) => {
    const forWhat = flatItem.forWhat
    switch (forWhat) {
        case "title":
            return <TitleHeader title={flatItem.title} />
        case "subtitle":
            return <SubtitleHeader title={flatItem.title} />
        case "assignmentQuestions":
            return (
                <CheckboxGrid>
                    {flatItem.reviewAssignmentQuestions.map((assignmentQuestion) => (
                        <Checkbox
                            key={assignmentQuestion.id}
                            onClick={() => {}}
                            session_status="HOMEWORK"
                            recent="no"
                            review_check_status_visual={null}
                        >
                            오더
                        </Checkbox>
                    ))}
                </CheckboxGrid>
            )
        default:
            throw ClientError.Unexpected("오답 체크를 보여주는 데에 실패했어요")
    }
}
export default AssignmentFlatItemComponent
