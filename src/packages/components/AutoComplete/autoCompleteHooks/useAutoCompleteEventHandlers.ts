interface UseAutoCompleteEventHandlerProps {
    cancel: () => void
}

const useAutoCompleteEventHandler = ({ cancel }: UseAutoCompleteEventHandlerProps) => {
    const handleBlur = () => {
        cancel()
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") {
            return
        }
        cancel()
    }

    return { handleBlur, handleKeyDown }
}

export default useAutoCompleteEventHandler
