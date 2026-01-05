import { Hstack, Vstack } from "@/packages/components/layouts"
import BWTopicStepSection from "./BWTopicStepSection/BWTopicStepSection"
import BWSubBookSection from "./BWSubBookSection/BWSubBookSection"
import BWTable from "./BWTable/BWTable"
import useBookWrite from "./useBookWrite/useBookWrite"
import BWMetaInfoSection from "./BWMetaInfoSection/BWMetaInfoSection"

const BookWriteContent = () => {
    const { handleSubmit } = useBookWrite()
    const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
        if (event.key !== "Enter") return
        event.preventDefault()
    }

    return (
        <form className="h-full w-full" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <Hstack gap="xl" className="p-my-xl h-full w-full">
                <Vstack className="w-[400px]">
                    <BWMetaInfoSection />
                    <BWTopicStepSection />
                    <BWSubBookSection />
                </Vstack>
                <BWTable />
            </Hstack>
        </form>
    )
}

export default BookWriteContent
