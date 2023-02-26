import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Toaster, toast } from "react-hot-toast"
import AddonQuestionBox from "../../components/AddonQuestionBox/AddonQuestionBox"

const JobApplication = () => {
    const navigate = useNavigate()

    const { state } = useLocation()

    const [questions, setQuestions] = useState([])
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedOption, setSelectedOption] = useState("")
    const [buttonText, setButtonText] = useState("Next")
    const [errorText, setErrorText] = useState("")

    const [assessmentInfo, setAssessmentInfo] = useState({
        sectionName: "IQ",
        totalQuestions: 0,
        timeRemainingForCurrentQuestion: "00:00"
    })

    useEffect(() => {
        axios.post("http://localhost:4321/assessment/iq/questions", {
            candidateEmail: state.candidateEmail
        }).then(response => {
            setQuestions(response.data)

            if (localStorage.getItem("CANDIDATE_ANSWERS")) {
                localStorage.removeItem("CANDIDATE_ANSWERS")
            }
        }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        if (activeQuestion === (questions.length - 1)) {
            setButtonText("Finish")
        }
        else {
            setButtonText("Next")
        }
    }, [activeQuestion])

    const handleNextQuestion = () => {
        if (buttonText === "Finish") {
            handleFinish()
        }
        else {
            if (selectedOption == "") {
                setErrorText("Please select an option")
            }
            else {
                if (localStorage.getItem("CANDIDATE_ANSWERS")) {
                    let newAnswers = JSON.parse(localStorage.getItem("CANDIDATE_ANSWERS"))
                    newAnswers.push(selectedOption)

                    localStorage.setItem("CANDIDATE_ANSWERS", JSON.stringify(newAnswers))

                    setSelectedOption("")
                    setErrorText("")
                    setActiveQuestion(prevValue => prevValue + 1)
                }
                else {
                    let answers = [selectedOption]

                    localStorage.setItem("CANDIDATE_ANSWERS", JSON.stringify(answers))

                    setSelectedOption("")
                    setErrorText("")
                    setActiveQuestion(prevValue => prevValue + 1)
                }
            }
        }
    }

    const handleSelectOption = (evt) => {
        setSelectedOption(evt.target.value)
        console.log(selectedOption)
    }

    const handleFinish = () => {
        let newAnswers = JSON.parse(localStorage.getItem("CANDIDATE_ANSWERS"))
        newAnswers.push(selectedOption)

        localStorage.setItem("CANDIDATE_ANSWERS", JSON.stringify(newAnswers))

        setSelectedOption("")
        setErrorText("")

        console.log(JSON.parse(localStorage.getItem("CANDIDATE_ANSWERS")))

        axios.post("http://localhost:4321/assessment/iq/calculate_score", {
            candidateAnswers: JSON.parse(localStorage.getItem("CANDIDATE_ANSWERS"))
        }).then(response => {
            toast.success(`Your Score is: ${response.data.score}`, )
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <Toaster />
            <div className="m-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 grid-rows-1 border-[1px] rounded-lg shadow-md">
                <div className="flex flex-col">
                    <p className="rounded-tr-lg rounded-tl-lg md:rounded-tr-none lg:rounded-tr-none bg-blue-500 w-full text-white text-center py-2 font-bold">Section</p>
                    <p className="text-center py-2 font-bold">{assessmentInfo.sectionName}</p>
                </div>
                <div className="flex flex-col">
                    <p className="bg-blue-500 w-full text-white text-center py-2 font-bold">Total Questions</p>
                    <p className="text-center py-2 font-bold">{assessmentInfo.totalQuestions}</p>
                </div>
                <div className="flex flex-col">
                    <p className="rounded-tr-none md:rounded-tr-lg lg:rounded-tr-lg xl:rounded-tr-lg bg-blue-500 w-full text-white text-center py-2 font-bold">Time remaining for this question</p>
                    <p className="text-center py-2 font-bold">{assessmentInfo.timeRemainingForCurrentQuestion}</p>
                </div>
            </div>

            <div className="w-full text-center">
                <span className="text-sm text-red-500">{errorText}</span>
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
                        handleQuestionOptionClick={handleSelectOption}
                    />
                })
            }

            <div className="w-full flex justify-center gap-x-3 text-white">
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