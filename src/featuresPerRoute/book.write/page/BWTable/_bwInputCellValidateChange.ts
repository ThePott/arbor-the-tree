import type { BookWriteRow } from "../_bookWriteInterfaces"

const acceptOnlySlash = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value === "/") return
    if (value.includes("/")) {
        event.target.value = "/"
        return
    }
    event.target.value = ""
}

const acceptOnlySlashOrNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    if (value === "/" || !Number.isNaN(Number(value))) return

    if (value.includes("/")) {
        event.target.value = "/"
        return
    }

    event.target.value = value.replace(/\D/g, "")
}

type ValidateChangeProps = {
    event: React.ChangeEvent<HTMLInputElement>
    columnKey: keyof BookWriteRow
}
const validateChange = ({ event, columnKey }: ValidateChangeProps) => {
    switch (columnKey) {
        case "topic":
            acceptOnlySlash(event)
            return
        case "step":
            return
        case "question_page":
            acceptOnlySlashOrNumber(event)
            return
        case "question_name":
            return
        case "solution_page":
            acceptOnlySlashOrNumber(event)
            return
        case "session":
            acceptOnlySlash(event)
            return
    }
}

export default validateChange
