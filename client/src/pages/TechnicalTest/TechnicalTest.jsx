import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import QuestionBox from "../../components/QuestionBox/QuestionBox"

const TechnicalTest = () => {
    const { state } = useLocation()

    const [assessments, setAssessments] = useState([])
    const [questions, setQuestions] = useState([])
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [activeAssessment, setActiveAssessment] = useState(0)
    const [mcqSelectedOption, setMCQSelectedOption] = useState("")
    const [trueFalseSelectedOption, setTrueFalseSelectedOption] = useState(true)
    const [buttonText, setButtonText] = useState("Next")
    const [errorText, setErrorText] = useState("")
    const [assessmentInfo, setAssessmentInfo] = useState({
        sectionName: "Technical",
        totalQuestions: 0,
    })
    const [secondsLeft, setSecondsLeft] = useState(120)

    useEffect(() => {
        axios.post("http://localhost:4321/job/assessments/questions", {
            recruiterEmail: state.recruiterEmail,
            jobName: state.jobName
        }).then(response => {
            setAssessments(response.data)
            setQuestions(response.data[activeAssessment])

            console.log(response.data[activeAssessment])

            if (localStorage.getItem("CANDIDATE_ANSWERS")) {
                localStorage.removeItem("CANDIDATE_ANSWERS")
            }

            console.log(questions[0])
        }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        setSecondsLeft(120)

        if (activeQuestion === (questions.length - 1)) {
            setButtonText("Finish")
        }
        else {
            setButtonText("Next")
        }

        let intervalId = setInterval(() => {
            setSecondsLeft((prevSeconds) => prevSeconds - 1);
        }, 1000);

        console.log("ACTIVE QUESTION USE-EFFECT TRIGGERED")

        // cleanup function to clear interval when component unmounts
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
                /* if the answers array is already available in the local storage then push the 
                value in it otherwise create a new array and store it in the local storage */

                if (localStorage.getItem("CANDIDATE_ANSWERS")) {
                    let newAnswers = JSON.parse(localStorage.getItem("CANDIDATE_ANSWERS"))
                    newAnswers.push("NULL")

                    localStorage.setItem("CANDIDATE_ANSWERS", JSON.stringify(newAnswers))

                    if (questions[activeQuestion].question_type_name === "MCQ") {
                        setMCQSelectedOption("")
                    }
                    else if (questions[activeQuestion].question_type_name === "TrueFalse") {
                        setTrueFalseSelectedOption(true)
                    }

                    setErrorText("")
                    setActiveQuestion(prevValue => prevValue + 1)
                }
                else {
                    let answers = ["NULL"]

                    localStorage.setItem("CANDIDATE_ANSWERS", JSON.stringify(answers))

                    if (questions[activeQuestion].question_type_name === "MCQ") {
                        setMCQSelectedOption("")
                    }
                    else if (questions[activeQuestion].question_type_name === "TrueFalse") {
                        setTrueFalseSelectedOption(true)
                    }

                    setErrorText("")
                    setActiveQuestion(prevValue => prevValue + 1)
                }
            }
            else {
                if(questions[activeQuestion].question_type_name === "MCQ" && mcqSelectedOption === "") {
                    setErrorText("Please select an option")
                }
                else {
                    if (localStorage.getItem("CANDIDATE_ANSWERS")) {
                        let newAnswers = JSON.parse(localStorage.getItem("CANDIDATE_ANSWERS"))
                        newAnswers.push(selectedOption)

                        localStorage.setItem("CANDIDATE_ANSWERS", JSON.stringify(newAnswers))

                        if (questions[activeQuestion].question_type_name === "MCQ") {
                            setMCQSelectedOption("")
                        }
                        else if (questions[activeQuestion].question_type_name === "TrueFalse") {
                            setTrueFalseSelectedOption(true)
                        }

                        setErrorText("")
                        setActiveQuestion(prevValue => prevValue + 1)
                    }
                    else {
                        let answers = []

                        if(questions[activeQuestion].question_type_name === "MCQ") {
                            answers.push(mcqSelectedOption)
                        }
                        else if(questions[activeQuestion].question_type_name === "TrueFalse") {
                            answers.push(trueFalseSelectedOption)
                        }

                        localStorage.setItem("CANDIDATE_ANSWERS", JSON.stringify(answers))

                        if (questions[activeQuestion].question_type_name === "MCQ") {
                            setMCQSelectedOption("")
                        }
                        else if (questions[activeQuestion].question_type_name === "TrueFalse") {
                            setTrueFalseSelectedOption(true)
                        }

                        setErrorText("")
                        setActiveQuestion(prevValue => prevValue + 1)
                    }
                }
            }
        }
    }

    const handleFinish = () => {
        let newAnswers = JSON.parse(localStorage.getItem("CANDIDATE_ANSWERS"))
        
        if(questions[activeQuestion].question_type_name === "MCQ") {
            newAnswers.push(mcqSelectedOption)
        }
        else if(questions[activeQuestion].question_type_name === "TrueFalse") {
            newAnswers.push(trueFalseSelectedOption)
        }

        localStorage.setItem("CANDIDATE_ANSWERS", JSON.stringify(newAnswers))

        if(questions[activeQuestion].question_type_name === "MCQ") {
            setMCQSelectedOption("")
        }
        else if(questions[activeQuestion].question_type_name === "TrueFalse") {
            setTrueFalseSelectedOption(true)
        }

        setErrorText("")

        console.log(JSON.parse(localStorage.getItem("CANDIDATE_ANSWERS")))

        axios.post("http://localhost:4321/assessment/technical/calculate_score", {
            candidateAnswers: JSON.parse(localStorage.getItem("CANDIDATE_ANSWERS"))
        }).then(response => {
            if (localStorage.getItem("CANDIDATE_SCORES")) {
                localStorage.removeItem("CANDIDATE_SCORES")
            }

            if (response.data.score > 10) {
                let scores = [[assessments[activeAssessment][0].assessment_name, response.data.score, "PASSED"]]

                localStorage.setItem("CANDIDATE_SCORES", JSON.stringify(scores))

                if (activeAssessment <= assessments.length - 1) {
                    setActiveAssessment((prevValue) => prevValue + 1)
                }
                else {
                    if(activeAssessment < assessments.length) {
                        setActiveAssessment((prevVal) => prevVal + 1)
                    }
                    else {
                        navigate("/scores", {
                            state: {
                                scoresArray: scores
                            },
                            replace: true
                        })
                    }
                }
            }
            else if (response.data.score < 2) {
                if(activeAssessment < assessments.length - 1) {
                    let scores = [[assessments[activeAssessment][0].assessment_name, response.data.score, "DIDN'T PASS"]]

                    localStorage.setItem("CANDIDATE_SCORES", JSON.stringify(scores))

                    setActiveAssessment((prevVal) => prevVal + 1)
                }
                else {
                    navigate("/scores", {
                        state: {
                            scoresArray: scores
                        },
                        replace: true
                    })
                }
                navigate("/scores", {
                    state: {
                        scoresArray: [
                            scores
                        ]
                    },
                    replace: true
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const handleSelectOption = (evt) => {
        if (questions[activeQuestion].question_type_name === "MCQ") {
            setMCQSelectedOption(evt.target.value)
            console.log(mcqSelectedOption)
        }
        else if (questions[activeQuestion].question_type_name === "TrueFalse") {
            setTrueFalseSelectedOption(evt.target.value)
            console.log(trueFalseSelectedOption)
        }
    }

    return (
        <div>
            {/* Can make a separate component to avoid markup repitition */}
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
                    <p className="text-center py-2 font-bold">{formatTime(secondsLeft)}</p>
                </div>
            </div>

            <div className="w-full text-center">
                <span className="text-sm text-red-500">{errorText}</span>
            </div>

            {
                questions.map((q, idx) => {
                    if (q.question_type_name === "MCQ") {
                        return <QuestionBox
                            key={q + idx}
                            visible={idx === activeQuestion}
                            mcq={true}
                            truefalse={false}
                            question={q.question}
                            optionOne={q.option_one}
                            optionTwo={q.option_two}
                            optionThree={q.option_three}
                            optionFour={q.option_four}
                            handleQuestionOptionClick={handleSelectOption} />
                    }
                    else if (q.question_type_name === "TrueFalse") {
                        return <QuestionBox
                            key={q + idx}
                            visible={idx === activeQuestion}
                            mcq={false}
                            truefalse={true}
                            question={q.question}
                            handleQuestionOptionClick={handleSelectOption} />
                    }
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

export default TechnicalTest