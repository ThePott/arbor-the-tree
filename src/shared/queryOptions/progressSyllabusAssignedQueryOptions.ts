import type { AssignedJoinedSyllabus } from "@/features/_sidebar._assigned._progress.progress/types"
import { instance } from "@/packages/api/axiosInstances"

type MakeProgressSyllabusAssignedQueryOptionsProps = {
    classroom_id: string | undefined
    student_id: string | undefined
}
export const makeProgressSyllabusAssignedQueryOptions = ({
    classroom_id,
    student_id,
}: MakeProgressSyllabusAssignedQueryOptionsProps) => ({
    // NOTE: progress에서만 mutate을 하므로 progress prefix 사용
    queryKey: ["progressSyllabusAssigned", classroom_id, classroom_id ? undefined : student_id],
    queryFn: async () => {
        const response = await instance.get("/progress/syllabus/assigned", {
            params: { classroom_id, student_id: classroom_id ? undefined : student_id },
        })
        return response.data as AssignedJoinedSyllabus[]
    },
    enabled: Boolean(classroom_id || student_id),
})
export type ProgressSyllabusAssignedResponseData = AssignedJoinedSyllabus[]
