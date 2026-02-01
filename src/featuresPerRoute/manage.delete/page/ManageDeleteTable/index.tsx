import { instance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import TanstackTable from "@/packages/components/TanstackTable"
import { debugCache, debugMutation, debugRender } from "@/shared/config/debug/"
import type { AppUser } from "@/shared/interfaces"
import { roleToText } from "@/shared/utils/apiTypeToLabel"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useLoaderData } from "@tanstack/react-router"
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Trash } from "lucide-react"
import { useMemo } from "react"
import { manageDeleteQueryOptions } from "../../loader"
import { MANAGE_DELETE_ROW_KET_TO_LABEL, MANAGE_DELETE_ROW_KEY_ARRAY, type ManageDeleteRow } from "../../types"

const DeleteButton = ({ user_id }: { user_id: string }) => {
    debugRender("DeleteButton %s", user_id)
    if (!user_id) throw new Error("---- Invalid request")
    const deleteMutation = useMutation({
        mutationFn: ({ user_id }: { user_id: string }) => instance.delete(`/auth/user/${user_id}`),
        onMutate: async ({ user_id }, context) => {
            debugMutation("DeleteButton:onMutate - deleting user_id: %s", user_id)
            await context.client.cancelQueries()
            const previousUserArray = context.client.getQueryData(["all"]) as AppUser[]

            const newUserArray = previousUserArray.filter((user) => user.id !== user_id)
            context.client.setQueryData(["all"], newUserArray)
            debugCache("DeleteButton - cache updated, removed user from list")

            return { previousUserArray }
        },
        onError: (_error, _variables, onMutateResult, context) => {
            debugMutation("DeleteButton:onError - rolling back")
            context.client.setQueryData(["all"], onMutateResult?.previousUserArray)
        },
        onSettled: (_data, _error, _variables, _onMutateResult, context) => {
            debugMutation("DeleteButton:onSettled - invalidating queries")
            context.client.invalidateQueries({ queryKey: ["all"] })
        },
    })

    return (
        <Button onClick={() => deleteMutation.mutate({ user_id })}>
            <Trash />
        </Button>
    )
}

const columnHelper = createColumnHelper<ManageDeleteRow>()
const columns = [
    ...MANAGE_DELETE_ROW_KEY_ARRAY.map((key) =>
        columnHelper.accessor(key, { header: MANAGE_DELETE_ROW_KET_TO_LABEL[key], cell: (info) => info.getValue() })
    ),
    columnHelper.display({
        id: "delete",
        cell: ({
            row: {
                original: { id },
            },
        }) => <DeleteButton user_id={id} />,
    }),
]

const convertDataToRowArray = ({ appUserArray }: { appUserArray: AppUser[] }): ManageDeleteRow[] => {
    const rowArray: ManageDeleteRow[] = appUserArray.map((appUser) => ({
        name: appUser.name,
        phone_number: appUser.phone_number,
        role: appUser.role ? roleToText[appUser.role] : undefined,
        id: appUser.id,
    }))

    return rowArray
}
const ManageDeleteTable = () => {
    debugRender("ManageDeleteTable")
    const userArray = useLoaderData({ from: "/manage/delete" })
    const { data } = useQuery(manageDeleteQueryOptions)

    const rowArray = useMemo(() => convertDataToRowArray({ appUserArray: data ?? userArray }), [data, userArray])

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({ columns: columns, data: rowArray, getCoreRowModel: getCoreRowModel() })

    return <TanstackTable table={table} />
}

export default ManageDeleteTable
