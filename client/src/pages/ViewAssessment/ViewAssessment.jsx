import { useEffect, useState } from "react";
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom";
import QuestionBox from "../../components/QuestionBox/QuestionBox";

const ViewAssessment = (props) => {
    const navigate = useNavigate()

    const { state } = useLocation()

    const [assessmentQuestions, setAssessmentQuestions] = useState([])

    useEffect(() => {
        axios.post("http://localhost:4321/assessment/recruiter/questions", {
            assessmentName: state.assessmentName,
            recruiterEmail: state.recruiterEmail
        }).then(response => {
            setAssessmentQuestions(response.data)

            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div className="flex flex-col items-center mt-5">
            <div className="w-full px-6">
                <div className="bg-white border-[1px] border-gray-300 shadow-md rounded-md text-4xl font-semibold py-8 text-center">
                    {state.assessmentName}
                </div>

                {
                    assessmentQuestions.length == 0
                        ?
                        <p className="text-center mt-10 font-semibold">No Questions have Been Added Yet</p>
                        :
                        assessmentQuestions.map(assessmentQuestionsSet => {
                            return (
                                assessmentQuestionsSet.map(q => {
                                    if (q.question_type_name === "MCQ") {
                                        return <div className="border-[1px]">
                                            <p>{q.question}</p>
                                            <p>{q.option_one}</p>
                                            <p>{q.option_two}</p>
                                            <p>{q.option_three}</p>
                                            <p>{q.option_four}</p>
                                            <p>{q.correct_answer}</p>
                                        </div>
                                    }
                                    else if (q.question_type_name === "TrueFalse") {
                                        return <div className="border-[1px]">
                                            <p>{q.question}</p>
                                            {
                                                q.answer ? "True" : "False"
                                            }
                                        </div>
                                    }
                                })
                            )
                        })
                }

                <div className="w-full flex justify-center">
                    <button className="bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white px-20 rounded-lg py-3 mt-10 mb-10 w-[300px]" onClick={() => {
                        navigate("/add-questions", {
                            state: {
                                assessment_name: state.assessmentName,
                                recruiter_email: state.recruiterEmail
                            }
                        })
                    }}>
                        Add Question
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ViewAssessment;