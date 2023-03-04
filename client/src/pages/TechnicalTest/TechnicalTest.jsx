import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import QuestionBox from "../../components/QuestionBox/QuestionBox"

const TechnicalTest = (props) => {
    const navigate = useNavigate()

    const [questions, setQuestions] = useState(props.questions)
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [mcqselectedOption, setMCQSelectedOption] = useState("")
    const [tfSelectedOption, setTFSelectedOption] = useState(true)
    const [buttonText, setButtonText] = useState("Next")
    const [errorText, setErrorText] = useState("")
    const assessmentInfo = {
        sectionName: "TECHNICAL",
        totalQuestions: props.totalQuestions,
    }
    const [secondsLeft, setSecondsLeft] = useState(120)

    useEffect(() => {
        if (secondsLeft === 0) {
            handleNextQuestion()
        }
    }, [secondsLeft])

    useEffect(() => {
        setSecondsLeft(120)

        if (activeQuestion === (props.questions.length - 1)) {
            setButtonText("Finish")
        }
        else {
            setButtonText("Next")
        }

        let intervalId = setInterval(() => {
            setSecondsLeft((prevSeconds) => prevSeconds - 1);
        }, 1000);

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
            if(questions[activeQuestion].question_type_name === "MCQ") {
                let finalAsnwers = [...JSON.parse(localStorage.getItem("CANDIDATE_ANSWERS")), mcqselectedOption]

                props.storeAnswersCB(props.assessmentName, finalAsnwers)
            }
            else if(questions[activeQuestion].question_type_name === "TrueFalse") {
                let finalAsnwers = [...JSON.parse(localStorage.getItem("CANDIDATE_ANSWERS")), tfSelectedOption]

                props.storeAnswersCB(props.assessmentName, finalAsnwers)
            }

            localStorage.removeItem("CANDIDATE_ANSWERS")

            props.setActiveAssessmentCB()
        }
        else {
            if (secondsLeft === 0) {
                if (localStorage.getItem("CANDIDATE_ANSWERS")) {
                    let newAnswers = JSON.parse(localStorage.getItem("CANDIDATE_ANSWERS"))
                    newAnswers.push("NULL")

                    localStorage.setItem("CANDIDATE_ANSWERS", JSON.stringify(newAnswers))

                    setMCQSelectedOption("")
                    setTFSelectedOption(true)
                    setErrorText("")
                    setActiveQuestion(prevValue => prevValue + 1)
                }
                else {
                    let answers = ["NULL"]

                    localStorage.setItem("CANDIDATE_ANSWERS", JSON.stringify(answers))

                    setMCQSelectedOption("")
                    setTFSelectedOption(true)
                    setErrorText("")
                    setActiveQuestion(prevValue => prevValue + 1)
                }
            }
            else {
                if(questions[activeQuestion].question_type_name === "MCQ" && mcqselectedOption === "") {
                    setErrorText("Please select an option")
                }
                else {
                    if (localStorage.getItem("CANDIDATE_ANSWERS")) {
                        let newAnswers = JSON.parse(localStorage.getItem("CANDIDATE_ANSWERS"))
                        
                        if(questions[activeQuestion].question_type_name === "MCQ") {
                            newAnswers.push(mcqselectedOption)
                        }
                        else if(questions[activeQuestion].question_type_name === "TrueFalse") {
                            newAnswers.push(tfSelectedOption)
                        }

                        localStorage.setItem("CANDIDATE_ANSWERS", JSON.stringify(newAnswers))

                        setMCQSelectedOption("")
                        setTFSelectedOption(true)
                        setErrorText("")
                        setActiveQuestion(prevValue => prevValue + 1)
                    }
                    else {
                        let answers = []

                        if(questions[activeQuestion].question_type_name === "MCQ") {
                            answers.push(mcqselectedOption)
                        }
                        else if(questions[activeQuestion].question_type_name === "TrueFalse") {
                            answers.push(tfSelectedOption)
                        }

                        localStorage.setItem("CANDIDATE_ANSWERS", JSON.stringify(answers))

                        setMCQSelectedOption("")
                        setTFSelectedOption(true)
                        setErrorText("")
                        setActiveQuestion(prevValue => prevValue + 1)
                    }
                }
            }
        }
    }

    const handleSelectOption = (evt) => {
        if (props.questions[activeQuestion].question_type_name === "MCQ") {
            setMCQSelectedOption(evt.target.value)
        }
        else if (props.questions[activeQuestion].question_type_name === "TrueFalse") {
            setTFSelectedOption(evt.target.value)
        }
    }
    
    return (
        props.visible
        &&
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
                props.questions.map((q, idx) => {
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
                            handleQuestionOptionClick={handleSelectOption}
                        />
                    }
                    else {
                        return <QuestionBox
                            key={q + idx}
                            visible={idx === activeQuestion}
                            mcq={false}
                            truefalse={true}
                            question={q.question}
                            handleQuestionOptionClick={handleSelectOption}
                        />
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