import { useEffect, useState } from "react"

const useMediaQuery = () => {
    const query = "(min-width: 700px)"
    const [isBig, setIsBig] = useState(() => window.matchMedia(query).matches)

    useEffect(() => {
        const mediaQuery = window.matchMedia(query)
        const handler = (event: MediaQueryListEvent) => {
            setIsBig(event.matches)
        }

        mediaQuery.addEventListener("change", handler)
        return () => mediaQuery.removeEventListener("change", handler)
    }, [query])

    return { isBig }
}

export default useMediaQuery
