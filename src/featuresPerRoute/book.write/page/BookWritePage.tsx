import { Hstack, Vstack } from "@/packages/components/layouts"
import BWTopicStepSection from "./BWTopicStepSection/BWTopicStepSection"
import BWTable from "./BWTable/BWTable"
import useBookWrite from "./useBookWrite/useBookWrite"
import BWMetaInfoSection from "./BWMetaInfoSection/BWMetaInfoSection"
import BWModalMany from "./BWModalMany"

const BookWritePage = () => {
    const { wrappedHandleSubmit } = useBookWrite()

    return (
        <>
            <form className="h-full w-full" onSubmit={wrappedHandleSubmit}>
                <Hstack gap="xl" className="p-my-md h-full w-full">
                    <Vstack className="w-[400px]">
                        <BWMetaInfoSection />
                        <BWTopicStepSection />
                    </Vstack>
                    <BWTable />
                </Hstack>
            </form>
            <BWModalMany />
        </>
    )
}

export default BookWritePage
