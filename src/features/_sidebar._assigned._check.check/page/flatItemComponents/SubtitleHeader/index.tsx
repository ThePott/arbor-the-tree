import Title from "@/packages/components/Title/Title"

type SubtitleHeaderProps = { title: string }
const SubtitleHeader = ({ title }: SubtitleHeaderProps) => {
    return (
        <Title as="h3" className="mt-my-md sticky top-[24px] bg-bg-neg-1">
            {title}
        </Title>
    )
}

export default SubtitleHeader
