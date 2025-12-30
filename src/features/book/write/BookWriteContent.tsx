import Input from "@/packages/components/Input/Input"
import { Hstack, Vstack } from "@/packages/components/layouts"
import useBookWriteStore from "./_bookWriteStore"
import BWTopicStepSection from "./BWTopicStepSection/BWTopicStepSection"
import BWSubBookSection from "./BWSubBookSection/BWSubBookSection"
import BWTable from "./BWTable/BWTable"
import useBookWriteEventHandler from "./_bookWriteEventHandlers"

const BookWriteContent = () => {
    const title = useBookWriteStore((state) => state.title)
    const setTitle = useBookWriteStore((state) => state.setTitle)
    const { handleSubmit } = useBookWriteEventHandler()

    return (
        <form className="h-full w-full" onSubmit={handleSubmit}>
            <Hstack gap="xl" className="p-my-xl h-full w-full">
                <Vstack className="w-[400px]">
                    <Input
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        variant="ghost"
                        className="text-my-xl"
                        placeholder="문제집 제목을 입력하세요"
                    />
                    <BWTopicStepSection />
                    <BWSubBookSection />
                </Vstack>
                <BWTable />
            </Hstack>
        </form>
    )
}

export default BookWriteContent
