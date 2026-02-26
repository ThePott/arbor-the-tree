import { ClientError } from "@/shared/error/clientError"
import type { AssignmentQuestionForCheckbox } from "../../types"
import Checkbox from "../flatItemComponents/Checkbox"
import CheckboxGrid from "../flatItemComponents/CheckboxGrid"
import SubtitleHeader from "../flatItemComponents/SubtitleHeader"
import TitleHeader from "../flatItemComponents/TitleHeader"

export type AssignmentFlatItem =
    | { forWhat: "title"; title: string }
    | { forWhat: "subtitle"; title: string }
    | { forWhat: "assignmentQuestions"; assignmentQuestionWithExtraInfoArray: AssignmentQuestionForCheckbox[] }
type AssignmentFlatItemComponentProps = { flatItem: AssignmentFlatItem }
const AssignmentFlatItemComponent = ({ flatItem }: AssignmentFlatItemComponentProps) => {
    const forWhat = flatItem.forWhat
    switch (forWhat) {
        case "title":
            return <TitleHeader title={flatItem.title} />
        case "subtitle":
            return <SubtitleHeader title={flatItem.title} />
        case "assignmentQuestions":
            return (
                <CheckboxGrid>
                    {flatItem.assignmentQuestionWithExtraInfoArray.map((assignmentQuestionWithExtraInfo) => (
                        <Checkbox
                            forWhat="assignment"
                            source={assignmentQuestionWithExtraInfo}
                            indexInfo={assignmentQuestionWithExtraInfo.indexInfo}
                        >
                            {assignmentQuestionWithExtraInfo.order}
                        </Checkbox>
                    ))}
                </CheckboxGrid>
            )
        default:
            throw ClientError.Unexpected("오답 체크를 보여주는 데에 실패했어요")
    }
}
export default AssignmentFlatItemComponent
