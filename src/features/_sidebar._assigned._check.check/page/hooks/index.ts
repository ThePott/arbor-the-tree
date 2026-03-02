import {
    useConvertRecentToChangedForAssignment,
    useDetectIdToChanedInfoThenMutateForAssignment,
    useReviewCheckMutateForAssignment,
} from "./assignment"
import { useResetChangedWhenSearchParamsChanged, useReviewCheckQuery } from "./common"
import {
    useConvertRecentToChangedForSyllabus,
    useDetectIdToChanedInfoThenMutateForSyllabus,
    useReviewCheckMutateForSyllabus,
} from "./session"

const useReviewCheck = () => {
    const { bookForAssignmentArray, bookForSession } = useReviewCheckQuery()

    // NOTE: for syllabus
    const { mutate: mutateForSyllabus } = useReviewCheckMutateForSyllabus()
    useDetectIdToChanedInfoThenMutateForSyllabus(mutateForSyllabus)
    useConvertRecentToChangedForSyllabus(bookForSession)

    // NOTE: for assignment
    const { mutate: mutateForAssignment } = useReviewCheckMutateForAssignment()
    useDetectIdToChanedInfoThenMutateForAssignment(mutateForAssignment)
    useConvertRecentToChangedForAssignment(bookForAssignmentArray)

    // NOTE: MUTE BE CALLED AT LAST << 진짜 그런가? 어차피 useEffect이니까 상관 없을 것 같기도 한데
    useResetChangedWhenSearchParamsChanged()

    return { bookForSession, bookForAssignmentArray }
}

export default useReviewCheck
