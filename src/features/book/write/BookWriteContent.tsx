import { Hstack, Vstack } from "@/packages/components/layouts"
import BWTopicStepSection from "./BWTopicStepSection/BWTopicStepSection"
import BWTable from "./BWTable/BWTable"
import useBookWrite from "./useBookWrite/useBookWrite"
import BWMetaInfoSection from "./BWMetaInfoSection/BWMetaInfoSection"

const BookWriteContent = () => {
    const { handleSubmit } = useBookWrite()

    return (
        <form className="h-full w-full" onSubmit={handleSubmit}>
            <Hstack gap="xl" className="p-my-md h-full w-full">
                <Vstack className="w-[400px]">
                    <BWMetaInfoSection />
                    <BWTopicStepSection />
                </Vstack>
                <BWTable />
            </Hstack>
        </form>
    )
}

export default BookWriteContent
