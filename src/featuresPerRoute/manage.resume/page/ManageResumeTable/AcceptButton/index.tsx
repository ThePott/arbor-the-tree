import type { ExtendedResume } from "@/featuresPerRoute/manage.resume/types"
import { instance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import { debugCache, debugMutation, debugRender } from "@/shared/config/debug/"
import { useMutation } from "@tanstack/react-query"
import { Check } from "lucide-react"

type AcceptButtonProps = { resume_id: string }
const AcceptButton = ({ resume_id }: AcceptButtonProps) => {
    debugRender("AcceptButton %s", resume_id)
    const postMutation = useMutation({
        mutationFn: () => instance.post(`/auth/resume/${resume_id}/accept`),
        onMutate: async (_variables, context) => {
            debugMutation("AcceptButton:onMutate - accepting resume_id: %s", resume_id)
            await context.client.cancelQueries({ queryKey: ["resume"] })
            const previousResumeArray = context.client.getQueryData(["resume"]) as ExtendedResume[]

            const newResumeArray = previousResumeArray.filter((resume) => resume.id !== resume_id)
            context.client.setQueryData(["resume"], newResumeArray)
            debugCache("AcceptButton - cache updated, removed resume from list")

            return { previousResumeArray }
        },
        onError: (_error, _variables, onMutateResult, context) => {
            debugMutation("AcceptButton:onError - rolling back")
            context.client.setQueryData(["resume"], onMutateResult?.previousResumeArray)
        },
        onSettled: (_data, _error, _variables, _onMutateResult, context) => {
            debugMutation("AcceptButton:onSettled - invalidating queries")
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
