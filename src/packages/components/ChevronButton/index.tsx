import { motionTransition } from "@/shared/utils/framerMotionAnimations"
import { ChevronRight } from "lucide-react"
import { motion } from "motion/react"
import Button from "../Button/Button"

type ChevronButtonProps = {
    isOpened: boolean
    setIsOpened: (isOpened: boolean) => void
}
const ChevronButton = ({ isOpened, setIsOpened }: ChevronButtonProps) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, React.MouseEvent>) => {
        event.stopPropagation()
        setIsOpened(!isOpened)
    }

    // TODO: 투명한 색 (complete ghost) 하기 위해서 black 씀. 나중에 바꿔야
    return (
        <Button space="tight" color="black" onClick={handleClick} isBorderedOnHover>
            <motion.div transition={motionTransition} animate={{ rotate: isOpened ? 90 : 0 }}>
                <ChevronRight size={16} />
            </motion.div>
        </Button>
    )
}

export default ChevronButton
