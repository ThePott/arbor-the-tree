import { createColumnHelper } from "@tanstack/react-table"
import type { Book } from "./_TableDummyData"
import Button from "@/packages/components/Button/Button"
import { Ellipsis, Trash } from "lucide-react"
import Dropdown from "@/packages/components/Dropdown/Dropdown"

const columnHelper = createColumnHelper<Book>()

export const tableDummyColumns = [
    columnHelper.accessor("title", { header: "문제집 제목", cell: (info) => info.getValue() }),
    columnHelper.accessor("publishedYear", { header: "출간년도", cell: (info) => info.getValue() }),
    columnHelper.accessor("modifiedAt", { header: "수정일", cell: (info) => info.getValue() }),
    columnHelper.display({
        id: "delete",
        cell: (props) => (
            <Button onClick={() => console.log({ props })}>
                <Trash />
            </Button>
        ),
    }),
    columnHelper.display({
        id: "menu",
        cell: (props) => (
            <Dropdown>
                <Dropdown.Trigger>
                    <Button>
                        <Ellipsis />
                    </Button>
                </Dropdown.Trigger>
                <Dropdown.Menu onChange={() => console.log({ props })} direction="bottomRight">
                    <Dropdown.MenuItem value="edit">수정하기</Dropdown.MenuItem>
                </Dropdown.Menu>
            </Dropdown>
        ),
    }),
]
