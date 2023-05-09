import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./AnimatedText.css"

const AnimatedText = (props) => {
    
    const navigate = useNavigate()

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate("/login-screen")
        }, 5000)

        return () => {
            console.log("Splash Screen Timeout cleared")
            clearTimeout(timeout)
        }
    }, [])

    return (
        <svg viewBox="0 0 1320 300" className="bg-slate-50">
            <text x="50%" y="50%" dy=".35em" textAnchor="middle">
                {props.text}
            </text>
        </svg>
    )

}

export default AnimatedText