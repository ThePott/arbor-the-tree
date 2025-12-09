import { useState } from "react"
import "./_AnimationExamplePage.css"

interface ItemData {
    id: string
    title: string
    subtitle: string
    description: string
}

const items: ItemData[] = [
    {
        id: "html",
        title: "HTML",
        subtitle: "HyperText Markup Language",
        description:
            "HyperText Markup Language (HTML) is the most basic building block of the web. It defines the meaning and structure of web content. HTML provides the fundamental building blocks for structuring web documents and apps.",
    },
    {
        id: "css",
        title: "CSS",
        subtitle: "Cascading Style Sheets",
        description:
            "Cascading Style Sheets (CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.",
    },
    {
        id: "svg",
        title: "SVG",
        subtitle: "Scalable Vector Graphics",
        description:
            "Scalable Vector Graphics (SVG) is an XML-based markup language for describing two-dimensional based vector graphics.",
    },
    {
        id: "js",
        title: "JS",
        subtitle: "JavaScript",
        description:
            "JavaScript (JS) is the web's native programming language. JavaScript is a lightweight, interpreted (or just-in-time compiled) programming language with first-class functions. While it is most well-known as the scripting language for web pages, many non-browser environments, such as Node.js, also use it.",
    },
]

const AnimationExamplePage = () => {
    const [activeItemId, setActiveItemId] = useState<string | null>(null)
    const [isMatchElementApplied, _setIsMatchElementApplied] = useState(true)

    const handleItemClick = (itemId: string) => {
        const newActiveId = activeItemId === itemId ? null : itemId

        // Use View Transitions API if supported
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                setActiveItemId(newActiveId)
            })
        } else {
            setActiveItemId(newActiveId)
        }
    }

    return (
        <main className={isMatchElementApplied ? "match-element-applied" : ""}>
            <ul>
                {items.map((item) => (
                    <li key={item.id} className={activeItemId === item.id ? "active-item" : ""}>
                        <h2>
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleItemClick(item.id)
                                }}
                            >
                                {item.title}
                            </a>
                        </h2>
                        <h3>{item.subtitle}</h3>
                        <p>{item.description}</p>
                    </li>
                ))}
            </ul>
        </main>
    )
}

export default AnimationExamplePage
