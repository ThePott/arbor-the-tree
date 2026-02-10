import Title from "@/packages/components/Title/Title"

type StepHeaderProps = { title: string }
const StepHeader = ({ title }: StepHeaderProps) => {
    // TODO: need to adjust margin top bottom
    return (
        <Title as="h3" className="pt-my-md sticky top-[24px] bg-bg-neg-1">
            {title}
        </Title>
    )
}

export default StepHeader
