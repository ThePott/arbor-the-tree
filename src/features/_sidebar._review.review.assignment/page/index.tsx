import Button from "@/packages/components/Button/Button"
import RoundBox from "@/packages/components/RoundBox"
import { useNavigate } from "@tanstack/react-router"

const ReviewAssignmentPage = () => {
    const navigate = useNavigate()
    return (
        <RoundBox color="bg0" radius="lg" isShadowed padding="xl">
            <Button color="bg2" onClick={() => navigate({ to: "/review/check" })}>
                review check
            </Button>
            <p>not yet created </p>
        </RoundBox>
    )
}

export default ReviewAssignmentPage
