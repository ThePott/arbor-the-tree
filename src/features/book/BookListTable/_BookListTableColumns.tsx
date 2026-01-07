import { createColumnHelper } from "@tanstack/react-table"
import Button from "@/packages/components/Button/Button"
import { Ellipsis, Trash } from "lucide-react"
import Dropdown from "@/packages/components/Dropdown/Dropdown"
import type { Book } from "@/shared/interfaces"
import { withHeadInstance } from "@/packages/api/axiosInstances"

const columnHelper = createColumnHelper<Book>()

const bookColumns = [
    columnHelper.accessor("title", { header: "문제집 제목", cell: (info) => info.getValue() }),
    columnHelper.display({
        id: "delete",
        cell: ({
            row: {
                original: { id },
            },
        }) => {
            return (
                <Button onClick={() => withHeadInstance.delete(`/book/${id}`)}>
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
                <Dropdown.Menu onChange={() => {}} direction="bottomRight">
                    <Dropdown.MenuItem value="edit">수정하기</Dropdown.MenuItem>
                </Dropdown.Menu>
            </Dropdown>
        ),
    }),
]

export default bookColumns
