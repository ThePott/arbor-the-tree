import { instance } from "@/packages/api/axiosInstances"
import type { RequestMethod } from "@/shared/interfaces"
import { useMutation } from "@tanstack/react-query"

type UseDeleteMutationProps<TBody, TParams, TQueryKeyElement, TPrevious> = {
    method: RequestMethod
    url: string
    body?: TBody
    params?: TParams
    queryKey: TQueryKeyElement[]
    update: (previous: TPrevious) => TPrevious
}
const useSimpleMutation = <TBody, TParams, TQueryKey, TPrevious>({
    method,
    url,
    body,
    params,
    queryKey,
    update,
}: UseDeleteMutationProps<TBody, TParams, TQueryKey, TPrevious>) => {
    const mutation = useMutation({
        mutationFn: () => instance.request({ method, url, params, data: body }),
        onMutate: (_variables, context) => {
            context.client.cancelQueries({ queryKey })
            const previous = context.client.getQueryData(queryKey) as TPrevious
            const newData = update(previous)
            context.client.setQueryData(queryKey, newData)
            return { previous }
        },
        onError: (_error, _variables, onMutateResult, context) => {
            context.client.setQueryData(queryKey, onMutateResult?.previous)
        },
        onSettled: (_data, _error, _variables, _onMutateResult, context) => {
            context.client.invalidateQueries({ queryKey })
        },
    })
    return mutation
}

export default useSimpleMutation
