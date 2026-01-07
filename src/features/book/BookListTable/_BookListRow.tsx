import { withHeadInstance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import Dropdown from "@/packages/components/Dropdown/Dropdown"
import { Hstack } from "@/packages/components/layouts"
import type { Book } from "@/shared/interfaces"
import { Ellipsis, Trash } from "lucide-react"
import { id } from "zod/v4/locales"

const BookListRow = ({ book }: { book: Book }) => {
    return (
        <Hstack>
            <p>{book.title}</p>

            <Hstack>
                <Button onClick={() => withHeadInstance.delete(`/book/${id}`)}>
                    <Trash />
                </Button>

                <Dropdown className="inline-block">
                    <Dropdown.Trigger>
                        <Button>
                            <Ellipsis />
                        </Button>
                    </Dropdown.Trigger>
                    <Dropdown.Menu onChange={() => {}} direction="bottomRight">
                        <Dropdown.MenuItem value="edit">수정</Dropdown.MenuItem>
                        <Dropdown.MenuItem value="subscribe">구독</Dropdown.MenuItem>
                        <Dropdown.MenuItem value="fork">포크</Dropdown.MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
            </Hstack>
        </Hstack>
    )
}

export default BookListRow
