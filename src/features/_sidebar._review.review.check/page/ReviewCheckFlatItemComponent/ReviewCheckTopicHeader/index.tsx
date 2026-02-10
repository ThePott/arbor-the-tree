import Title from "@/packages/components/Title/Title"

type TopicHeaderProps = { title: string }
const TopicHeader = ({ title }: TopicHeaderProps) => {
    // TODO: need to adjust margin top bottom
    return (
        <Title as="h2" isMuted className="text-center pt-my-lg sticky top-0 bg-bg-neg-1 z-10">
            {title}
        </Title>
    )
}

export default TopicHeader
