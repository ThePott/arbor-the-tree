import Input from "@/packages/components/Input/Input"
import Labeled from "@/packages/components/Labeled/Labeled"
import { Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import { debugRender } from "@/shared/config/debug/debug"
import useBookWriteStore from "../bookWriteStore/bookWriteStore"

const BWMetaInfoSection = () => {
    debugRender("BWMetaInfoSection")
    const title = useBookWriteStore((state) => state.title)
    const setTitle = useBookWriteStore((state) => state.setTitle)
    const publishedYear = useBookWriteStore((state) => state.publishedYear)
    const setPublishedYear = useBookWriteStore((state) => state.setPublishedYear)
    const register = useBookWriteStore((state) => state.register)
    const errors = useBookWriteStore((state) => state.errors)
    const isPending = useBookWriteStore((state) => state.isPending)

    return (
        <RoundBox isBordered padding="md">
            <Vstack gap="none">
                <Title as="h2" isMuted>
                    문제집 정보
                </Title>
                <Labeled isInDanger={Boolean(errors?.title)} isRequired>
                    <Input
                        {...register?.("title")}
                        disabled={isPending}
                        isRed={Boolean(errors?.title)}
                        variant="ghost"
                        className="text-my-xl"
                        placeholder="문제집 제목"
                        defaultValue={title}
                        onBlur={(event) => setTitle(event.target.value)}
                    />
                    <Labeled.Footer>{errors?.title?.message}</Labeled.Footer>
                </Labeled>
                <Labeled isInDanger={Boolean(errors?.published_year)} isRequired>
                    <Input
                        {...register?.("published_year")}
                        disabled={isPending}
                        isRed={Boolean(errors?.published_year)}
                        variant="ghost"
                        type="number"
                        defaultValue={publishedYear}
                        placeholder="출간년도"
                        onBlur={(event) => setPublishedYear(Number(event.target.value))}
                    />
                    <Labeled.Footer>{errors?.published_year?.message}</Labeled.Footer>
                </Labeled>
            </Vstack>
        </RoundBox>
    )
}

export default BWMetaInfoSection
