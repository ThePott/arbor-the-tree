import { instance } from "@/packages/api/axiosInstances"
import { debugMutation } from "@/shared/config/debug/"
import { ClientError } from "@/shared/error/clientError"
import { QueryClient, useMutation } from "@tanstack/react-query"
import type { Method } from "axios"

type UseDeleteMutationProps<TAdditionalData, TParams, TQueryKeyElement, TPrevious> = {
    method: Method
    url: string
    params?: TParams
    queryKeyWithoutParams: TQueryKeyElement[]
    addtionalOnSetteled?: (client: QueryClient) => void
    update: ({ previous, additionalData }: { previous: TPrevious; additionalData: TAdditionalData }) => TPrevious
}
const useSimpleMutation = <TBody, TAdditionalData, TParams, TQueryKey, TPrevious>({
    method,
    url,
    params,
    queryKeyWithoutParams,
    addtionalOnSetteled,
    update,
}: UseDeleteMutationProps<TAdditionalData, TParams, TQueryKey, TPrevious>) => {
    const queryKey = params ? [...queryKeyWithoutParams, params] : queryKeyWithoutParams

    const mutation = useMutation({
        mutationFn: ({ body, additionalData: _additionalData }: { body: TBody; additionalData: TAdditionalData }) => {
            return instance.request({ method, url, params, data: body })
        },
        onMutate: ({ additionalData }, context) => {
            debugMutation("useSimpleMutation onMutate", { url, queryKey, additionalData })
            context.client.cancelQueries({ queryKey })
            const previous = context.client.getQueryData(queryKey) as TPrevious
            const newData = update({ previous, additionalData })
            debugMutation("useSimpleMutation onMutate setQueryData", { queryKey, newData })
            context.client.setQueryData(queryKey, newData)
            return { previous }
        },
        onError: (_error, _variables, onMutateResult, context) => {
            debugMutation("useSimpleMutation onError", { url, queryKey })
            context.client.setQueryData(queryKey, onMutateResult?.previous)
            throw ClientError.Network("낙관적 업데이트를 실패했어요")
        },
        onSettled: (_data, _error, _variables, _onMutateResult, context) => {
            debugMutation("useSimpleMutation onSettled", { url, queryKey })
            context.client.invalidateQueries({ queryKey })
            addtionalOnSetteled?.(context.client)
        },
    })
    return mutation
}

export default useSimpleMutation
