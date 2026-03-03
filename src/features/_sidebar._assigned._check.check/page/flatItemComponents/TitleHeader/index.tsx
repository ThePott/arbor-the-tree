import Title from "@/packages/components/Title/Title"

type TitleHeaderProps = { title: string }
const TitleHeader = ({ title }: TitleHeaderProps) => {
    return (
        <Title as="h2" isMuted className="text-center mt-my-lg sticky top-0 bg-bg-neg-1 z-10">
            {title}
        </Title>
    )
}

export default TitleHeader
