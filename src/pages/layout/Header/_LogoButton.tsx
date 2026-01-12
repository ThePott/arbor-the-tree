import { useNavigate } from "@tanstack/react-router"
const Logo = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate({ to: "/" })
    }

    return (
        <button className="text-my-lg cursor-pointer tracking-[18px]" onClick={handleClick}>
            ARBOR
        </button>
    )
}

export default Logo
