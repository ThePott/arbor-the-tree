import Title from "@/packages/components/Title/Title"

type TopicHeaderProps = { title: string }
const TopicHeader = ({ title }: TopicHeaderProps) => {
    return (
        <Title as="h2" isMuted className="text-center mt-my-lg sticky top-0 bg-bg-neg-1 z-10">
            {title}
        </Title>
    )
}

export default TopicHeader
