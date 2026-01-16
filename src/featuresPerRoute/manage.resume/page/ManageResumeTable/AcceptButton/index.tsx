import type { ExtendedResume } from "@/featuresPerRoute/manage.resume/types"
import { instance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import { useMutation } from "@tanstack/react-query"
import { Check } from "lucide-react"

type AcceptButtonProps = { resume_id: string }
const AcceptButton = ({ resume_id }: AcceptButtonProps) => {
    const postMutation = useMutation({
        mutationFn: () => instance.post(`/auth/resume/${resume_id}/accept`),
        onMutate: async (_variables, context) => {
            await context.client.cancelQueries({ queryKey: ["resume"] })
            const previousResumeArray = context.client.getQueryData(["resume"]) as ExtendedResume[]

            const newResumeArray = previousResumeArray.filter((resume) => resume.id !== resume_id)
            context.client.setQueryData(["resume"], newResumeArray)

            return { previousResumeArray }
        },
        onError: (_error, _variables, onMutateResult, context) => {
            context.client.setQueryData(["resume"], onMutateResult?.previousResumeArray)
        },
        onSettled: (_data, _error, _variables, _onMutateResult, context) => {
            context.client.invalidateQueries({ queryKey: ["resume"] })
        },
    })

    const handleClick = () => {
        postMutation.mutate()
    }

    return (
        <Button isBorderedOnHover onClick={handleClick}>
            <Check />
        </Button>
    )
}

export default AcceptButton
