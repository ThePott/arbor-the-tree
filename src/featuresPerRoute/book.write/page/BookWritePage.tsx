import { Hstack, Vstack } from "@/packages/components/layouts"
import { debugRender } from "@/shared/config/debug/debug"
import BWMetaInfoSection from "./BWMetaInfoSection/BWMetaInfoSection"
import BWModalMany from "./BWModalMany"
import BWTable from "./BWTable/BWTable"
import BWTopicStepSection from "./BWTopicStepSection/BWTopicStepSection"
import useBookWrite from "./useBookWrite/useBookWrite"

const BookWritePage = () => {
    debugRender("BookWritePage")
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
