import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import AddonQuestionBox from "../../components/AddonQuestionBox/AddonQuestionBox"

import { IQ_TEST_QUESTION_TIME } from "../../utils/QUESTION_TIME"

const IQTest = () => {
    const navigate = useNavigate()

    const { state } = useLocation()

    const [questions, setQuestions] = useState([])
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedOption, setSelectedOption] = useState("NULL")
    const [buttonText, setButtonText] = useState("Next")
    const [errorText, setErrorText] = useState("")
    const [assessmentInfo, setAssessmentInfo] = useState({
        sectionName: "IQ",
        totalQuestions: 0,
    })
    const [secondsLeft, setSecondsLeft] = useState(IQ_TEST_QUESTION_TIME)

    useEffect(() => {
        axios.post("http://localhost:4321/assessment/iq/score_exists", {
            candidateEmail: state.candidateEmail
        }).then(response => {
            // If the candidate has already taken the IQ test
            // when applying for another job then forward the
            // candidate to EQ test since he/she cannot retake
            if (response.data === true) {
                navigate("/eq-test", {
                    state: {
                        jobName: state.jobName,
                        candidateEmail: state.candidateEmail,
                        recruiterEmail: state.recruiterEmail
                    },
                    replace: true
                })
            }
            else {
                axios.post("http://localhost:4321/assessment/iq/questions", {
                    candidateEmail: state.candidateEmail
                }).then(response => {
                    setQuestions(response.data)

                    setAssessmentInfo({
                        ...assessmentInfo,
                        totalQuestions: response.data.length
                    })

                    if (localStorage.getItem("CANDIDATE_ANSWERS")) {
                        localStorage.removeItem("CANDIDATE_ANSWERS")
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        })
    }, [])

    useEffect(() => {
        if (secondsLeft === 0) {
            handleNextQuestion()
        }
    }, [secondsLeft])

    useEffect(() => {
        setSecondsLeft(IQ_TEST_QUESTION_TIME)
        setSelectedOption("NULL")

        if (activeQuestion === (questions.length - 1)) {
            setButtonText("Finish")
        }
        else {
            setButtonText("Next")
        }

        let intervalId = setInterval(() => {
            setSecondsLeft((prevSeconds) => prevSeconds - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [activeQuestion])

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    const handleNextQuestion = () => {
        if (buttonText === "Finish") {
            handleFinish()
        }
        else {
            if (secondsLeft === 0) {
                if (localStorage.getItem("CANDIDATE_ANSWERS")) {
                    let newAnswers = JSON.parse(localStorage.getItem("CANDIDATE_ANSWERS"))
                    newAnswers.push(selectedOption)

                    localStorage.setItem("CANDIDATE_ANSWERS", JSON.stringify(newAnswers))

                    setSelectedOption("")
                    setErrorText("")
                    setActiveQuestion(prevValue => prevValue + 1)
                }
                else {
                    localStorage.setItem("CANDIDATE_ANSWERS", JSON.stringify(["NULL"]))

                    setSelectedOption("")
                    setErrorText("")
                    setActiveQuestion(prevValue => prevValue + 1)
                }
            }
            else {
                if (selectedOption == "NULL") {
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
                        localStorage.setItem("CANDIDATE_ANSWERS", JSON.stringify([selectedOption]))

                        setSelectedOption("")
                        setErrorText("")
                        setActiveQuestion(prevValue => prevValue + 1)
                    }
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
            candidateEmail: state.candidateEmail,
            candidateAnswers: JSON.parse(localStorage.getItem("CANDIDATE_ANSWERS"))
        }).then(_ => {
            navigate("/eq-test", {
                state: {
                    jobName: state.jobName,
                    candidateEmail: state.candidateEmail,
                    recruiterEmail: state.recruiterEmail
                },
                replace: true
            })
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            {/* Can make a separate component to avoid markup repitition */}
            <div className="m-5 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 grid-rows-1 border-[1px] rounded-lg shadow-md">
                <div className="flex flex-col">
                    <p className="rounded-tr-lg rounded-tl-lg md:rounded-tr-none lg:rounded-tr-none bg-blue-500 w-full text-white text-center py-2 font-bold">Section</p>
                    <p className="text-center py-2 font-bold">{assessmentInfo.sectionName}</p>
                </div>
                <div className="flex flex-col">
                    <p className="bg-blue-500 w-full text-white text-center py-2 font-bold">Total Questions</p>
                    <p className="text-center py-2 font-bold">{assessmentInfo.totalQuestions}</p>
                </div>
                <div className="flex flex-col">
                    <p className="bg-blue-500 w-full text-white text-center py-2 font-bold">Current Question</p>
                    <p className="text-center py-2 font-bold">{activeQuestion + 1}</p>
                </div>
                <div className="flex flex-col">
                    <p className="rounded-tr-none md:rounded-tr-lg lg:rounded-tr-lg xl:rounded-tr-lg bg-blue-500 w-full text-white text-center py-2 font-bold">Time</p>
                    <p className="text-center py-2 font-bold">{formatTime(secondsLeft)}</p>
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

export default IQTest