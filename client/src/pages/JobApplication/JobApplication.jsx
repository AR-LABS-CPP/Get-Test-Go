import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import AddonQuestionBox from "../../components/AddonQuestionBox/AddonQuestionBox"

const JobApplication = () => {
    const { state } = useLocation()

    const [questions, setQuestions] = useState([])
    const [activeQuestion, setActiveQuestion] = useState(0)

    const [buttonText, setButtonText] = useState("Next")

    useEffect(() => {
        axios.post("http://localhost:4321/assessment/iq/questions", {
            candidateEmail: state.candidateEmail
        }).then(response => {
            setQuestions(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        if(activeQuestion === (questions.length - 1)) {
            setButtonText("Finish")
        }
        else {
            setButtonText("Next")
        }
    }, [activeQuestion])

    const handleNextQuestion = () => {
        setActiveQuestion(prevValue => prevValue + 1)
    }

    const handlePreviousQuestion = () => {
        setActiveQuestion(prevValue => prevValue - 1)
    }

    const handleFinish = () => {

    }

    return (
        <div>
            <div className="m-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 grid-rows-1 border-[1px] rounded-lg shadow-md">
                <div className="flex flex-col">
                    <p className="rounded-tr-lg rounded-tl-lg md:rounded-tr-none lg:rounded-tr-none bg-blue-500 w-full text-white text-center py-2 font-bold">Total Time</p>
                    <p className="text-center py-2 font-bold">00:00</p>
                </div>
                <div className="flex flex-col">
                    <p className="bg-blue-500 w-full text-white text-center py-2 font-bold">Section</p>
                    <p className="text-center py-2 font-bold">IQ</p>
                </div>
                <div className="flex flex-col">
                    <p className="rounded-tr-none md:rounded-tr-lg lg:rounded-tr-lg xl:rounded-tr-lg bg-blue-500 w-full text-white text-center py-2 font-bold">Time remaining for this question</p>
                    <p className="text-center py-2 font-bold">00:00</p>
                </div>
            </div>

            {
                questions.map((q, idx) => {
                    return <AddonQuestionBox
                        key={q + idx}
                        visible={idx == activeQuestion}
                        question={q.question}
                        optionOne={q.option_one}
                        optionTwo={q.option_two}
                        optionThree={q.option_three}
                        optionFour={q.option_four}
                    />
                })
            }

            <div className="w-full flex justify-center gap-x-3 text-white">
                {
                    activeQuestion > 0
                    &&
                    <button className="bg-blue-600 hover:bg-blue-500 px-10 py-2 rounded-md">Prev</button>
                }
                <button onClick={handleNextQuestion} className="bg-blue-600 hover:bg-blue-500 px-10 py-2 rounded-md">
                    {
                        buttonText
                    }
                </button>
            </div>
        </div>
    )
}

export default JobApplication