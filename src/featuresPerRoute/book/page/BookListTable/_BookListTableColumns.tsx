import Button from "@/packages/components/Button/Button"
import Dropdown from "@/packages/components/Dropdown"
import type { Book } from "@/shared/interfaces"
import { createColumnHelper } from "@tanstack/react-table"
import { Ellipsis, Trash } from "lucide-react"
import useBookListStore from "../_bookListStore"

const columnHelper = createColumnHelper<Book>()

const bookColumns = [
    columnHelper.accessor("title", { header: "문제집 제목", cell: (info) => info.getValue() }),
    columnHelper.display({
        id: "delete",
        cell: ({ row: { original } }) => {
            return (
                <Button
                    onClick={() => {
                        const state = useBookListStore.getState()
                        state.setSelectedBook(original)
                        state.setModalKey("delete")
                    }}
                >
                    <Trash />
                </Button>
            )
        },
    }),
    columnHelper.display({
        id: "menu",
        cell: (_props) => (
            <Dropdown className="inline-block">
                <Dropdown.Trigger>
                    <Button>
                        <Ellipsis />
                    </Button>
                </Dropdown.Trigger>
                <Dropdown.Menu>
                    <Dropdown.MenuItem onClick={() => {}}>수정</Dropdown.MenuItem>
                    <Dropdown.MenuItem onClick={() => {}}>구독</Dropdown.MenuItem>
                    <Dropdown.MenuItem onClick={() => {}}>포크</Dropdown.MenuItem>
                </Dropdown.Menu>
            </Dropdown>
        ),
    }),
]

export default bookColumns
