import axios from "axios"
import useTilg from "tilg"
import { useEffect } from "react"
import { useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"

const AddQuestions = () => {
    useTilg()

    const navigate = useNavigate()
    const { state } = useLocation()

    const mcqInititalValues = {
        question: "",
        optionOne: "",
        optionTwo: "",
        optionThree: "",
        optionFour: "",
        correctAnswer: ""
    }

    const trueFalseInitialValues = {
        question: "",
        answer: true,
    }

    const [mcqQuestionVals, setMcqQuestionVals] = useState(mcqInititalValues)
    const [trueFalseQuestionVals, setTrueFalseQuestionVals] = useState(trueFalseInitialValues)

    const [questionTypes, setQuestionTypes] = useState([])
    const [currentQuestionType, setCurrentQuestionType] = useState("MCQ")
    const [mcqErrors, setMcqErrors] = useState({})
    const [tfErrors, setTfErrors] = useState({})

    const [formSaved, setFormSaved] = useState(false)

    const handleFormChange = (e) => {
        const { name, value } = e.target

        if (currentQuestionType === "MCQ") {
            setMcqQuestionVals({ ...mcqQuestionVals, [name]: value })
        }
        else if (currentQuestionType === "TrueFalse") {
            setTrueFalseQuestionVals({ ...trueFalseQuestionVals, [name]: value })
        }
    }

    const handleSaveQuestion = () => {
        if (currentQuestionType === "MCQ") {
            setMcqErrors(validateMCQValues(mcqQuestionVals))
            setFormSaved(true)
        }
        else if (currentQuestionType === "TrueFalse") {
            setTfErrors(validateTrueFalseValues(trueFalseQuestionVals))
            setFormSaved(true)
        }
    }

    const validateMCQValues = (vals) => {
        const mcqErrors = {}

        if (vals.question.trim() === "") {
            mcqErrors.question = "Please enter the question"
        }

        if (vals.optionOne.trim() === "") {
            mcqErrors.optionOne = "Please fill option one"
        }

        if (vals.optionTwo.trim() === "") {
            mcqErrors.optionTwo = "Please fill option two"
        }

        if (vals.optionThree.trim() === "") {
            mcqErrors.optionThree = "Please fill option three"
        }

        if (vals.optionFour.trim() === "") {
            mcqErrors.optionFour = "Please fill option four"
        }

        if (vals.correctAnswer.trim() === "") {
            mcqErrors.correctAnswer = "Please reselect the answer"
        }

        return mcqErrors
    }

    const validateTrueFalseValues = (vals) => {
        const tfErrors = {}

        if (vals.question.trim() === "") {
            tfErrors.question = "Please enter the question"
        }

        return tfErrors
    }

    useEffect(() => {
        axios.get("http://localhost:4321/assessment/question/types").then(response => {
            setQuestionTypes(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        if (Object.keys(mcqErrors).length === 0 && formSaved) {
            const payload = {
                "assessmentName": state.assessment_name,
                "recruiterEmail": state.recruiter_email,
                "assessmentQuestion": mcqQuestionVals.question,
                "optionOne": mcqQuestionVals.optionOne,
                "optionTwo": mcqQuestionVals.optionTwo,
                "optionThree": mcqQuestionVals.optionThree,
                "optionFour": mcqQuestionVals.optionFour,
                "correctOption": mcqQuestionVals.correctAnswer
            }

            axios.post("http://localhost:4321/assessment/question/add/mcq", payload).then(_ => {
                toast.success("Question added successfully")
                setMcqQuestionVals(mcqInititalValues)
            }).catch(error => {
                if (error.response.status === 409) {
                    toast.error(error.response.data)
                }
                else {
                    console.log(error)
                }
            })
        }
    }, [mcqErrors])

    useEffect(() => {
        if (Object.keys(tfErrors).length === 0 && formSaved) {
            const payload = {
                "assessmentName": state.assessment_name,
                "assessmentQuestion": trueFalseQuestionVals.question,
                "answer": trueFalseQuestionVals.answer
            }
            
            axios.post("http://localhost:4321/assessment/question/add/truefalse", payload).then(_ => {
                toast.success("Question added successfully")
                setTrueFalseQuestionVals(trueFalseInitialValues)
            }).catch(error => {
                if (error.response.status === 409) {
                    toast.error(error.response.data)
                }
                else {
                    console.log(error)
                }
            })
        }
    }, [tfErrors])

    return (
        <div className="flex flex-col items-center mt-5">
            <Toaster />
            <form className="flex flex-col justfiy-center w-[70%] md:w-[50%] lg:w-[50%] rounded-lg shadow-xl border-[1px] bg-white p-4">
                <label htmlFor="questionType" className="font-semibold">Question Type</label>
                <select onChange={(e) => setCurrentQuestionType(e.target.value)} name="questionType" id="questionType" className="mt-1 border-[1px] py-2 px-1">
                    {
                        questionTypes.map(questionType => {
                            return <option key={questionType.question_type_name} value={questionType.question_type_name}>{questionType.question_type_name}</option>
                        })
                    }
                </select>

                {
                    currentQuestionType === "MCQ" &&
                    <div className="mt-3">
                        <div>
                            <label htmlFor="question" className="font-semibold">Question</label>
                            <textarea onChange={handleFormChange} value={mcqQuestionVals.question} name="question" id="question" cols="30" rows="5" className="w-full mt-1 border-[1px] rounded-md px-1"></textarea>
                            <small className="text-red-500">{mcqErrors.question}</small>
                        </div>

                        <div>
                            <label htmlFor="optionOne" className="font-semibold">Option One</label>
                            <input name="optionOne" value={mcqQuestionVals.optionOne} onChange={handleFormChange} type="text" className="w-full border-[1px] rounded-md py-2 px-1 mt-1" />
                            <small className="text-red-500">{mcqErrors.optionOne}</small>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="optionTwo" className="font-semibold">Option Two</label>
                            <input name="optionTwo" value={mcqQuestionVals.optionTwo} onChange={handleFormChange} type="text" className="w-full border-[1px] rounded-md py-2 px-1 mt-1" />
                            <small className="text-red-500">{mcqErrors.optionTwo}</small>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="optionThree" className="font-semibold">Option Three</label>
                            <input name="optionThree" value={mcqQuestionVals.optionThree} onChange={handleFormChange} type="text" className="w-full border-[1px] rounded-md py-2 px-1 mt-1" />
                            <small className="text-red-500">{mcqErrors.optionThree}</small>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="optionFour" className="font-semibold">Option Four</label>
                            <input name="optionFour" value={mcqQuestionVals.optionFour} onChange={handleFormChange} type="text" className="w-full border-[1px] rounded-md py-2 px-1 mt-1" />
                            <small className="text-red-500">{mcqErrors.optionFour}</small>
                        </div>

                        <div className="mt-3">
                            <label htmlFor="correctAnswer" className="font-semibold">Correct Answer</label>
                            <select onChange={handleFormChange} name="correctAnswer" id="correctAnswer" className="w-full mt-1 border-[1px] py-2 px-1">
                                <option value={mcqQuestionVals.optionOne}>Option 1</option>
                                <option value={mcqQuestionVals.optionTwo}>Option 2</option>
                                <option value={mcqQuestionVals.optionThree}>Option 3</option>
                                <option value={mcqQuestionVals.optionFour}>Option 4</option>
                            </select>
                            <small className="text-red-500">{mcqErrors.correctAnswer}</small>
                        </div>
                    </div>
                }

                {
                    currentQuestionType === "TrueFalse" &&
                    <div className="mt-3">
                        <div>
                            <label htmlFor="question" className="font-semibold">Question</label>
                            <textarea onChange={handleFormChange} value={trueFalseQuestionVals.question} name="question" id="question" cols="30" rows="5" className="w-full mt-1 border-[1px] rounded-md px-1"></textarea>
                            <small className="text-red-500">{tfErrors.question}</small>
                        </div>

                        <div>
                            <label htmlFor="answer" className="font-semibold">Correct Answer</label>
                            <select onChange={handleFormChange} name="answer" id="answer" className="w-full mt-1 border-[1px] py-2 px-1">
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                            </select>
                        </div>
                    </div>
                }
            </form>

            <div className="flex w-[70%] md:w-[50%] lg:w-[50%] justify-center my-10">
                <button onClick={() => handleSaveQuestion()} className="w-full bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white rounded-lg py-2">
                    Save Question
                </button>
            </div>
        </div>
    )
}

export default AddQuestions