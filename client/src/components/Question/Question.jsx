import { useState } from "react"
import { Collapse } from "react-collapse"

const Question = () => {
    const [isOpen, setIsOpen] = useState(false)

    return(
        <Collapse isOpened={isOpen}>
            <button onClick={() => setIsOpen(prevVal => !prevVal)}>
                {
                    isOpen ? "Close" : "Open"
                }
            </button>
        </Collapse>
    )
}

export default Question