import { instance } from "@/packages/api/axiosInstances"
import { ClientError } from "@/shared/error/clientError"
import type { RequestMethod } from "@/shared/interfaces"
import { useMutation } from "@tanstack/react-query"

type UseDeleteMutationProps<TAdditionalData, TParams, TQueryKeyElement, TPrevious> = {
    method: RequestMethod
    url: string
    params?: TParams
    queryKeyWithoutParams: TQueryKeyElement[]
    update: ({ previous, additionalData }: { previous: TPrevious; additionalData: TAdditionalData }) => TPrevious
}
const useSimpleMutation = <TBody, TAdditionalData, TParams, TQueryKey, TPrevious>({
    method,
    url,
    params,
    queryKeyWithoutParams,
    update,
}: UseDeleteMutationProps<TAdditionalData, TParams, TQueryKey, TPrevious>) => {
    const queryKey = params ? [...queryKeyWithoutParams, params] : queryKeyWithoutParams

    const mutation = useMutation({
        mutationFn: ({ body, additionalData: _additionalData }: { body: TBody; additionalData: TAdditionalData }) => {
            return instance.request({ method, url, params, data: body })
        },
        onMutate: ({ additionalData }, context) => {
            context.client.cancelQueries({ queryKey })
            const previous = context.client.getQueryData(queryKey) as TPrevious
            const newData = update({ previous, additionalData })
            context.client.setQueryData(queryKey, newData)
            return { previous }
        },
        onError: (_error, _variables, onMutateResult, context) => {
            context.client.setQueryData(queryKey, onMutateResult?.previous)
            throw ClientError.Network("낙관적 업데이트를 실패했어요")
        },
        onSettled: (_data, _error, _variables, _onMutateResult, context) => {
            context.client.invalidateQueries({ queryKey })
        },
    })
    return mutation
}

export default useSimpleMutation
