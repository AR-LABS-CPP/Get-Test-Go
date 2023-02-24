import { useEffect, useState } from "react";
import axios from "axios"
import { useLocation } from "react-router-dom";
import QuestionBox from "../../components/QuestionBox/QuestionBox";

const ViewAssessment = (props) => {
    const { state } = useLocation()

    const [assessmentQuestions, setAssessmentQuestions] = useState([])

    useEffect(() => {
        axios.post("http://localhost:4321/assessment/recruiter/questions", {
            assessmentName: state.assessmentName,
            recruiterEmail: state.recruiterEmail
        }).then(response => {
            setAssessmentQuestions(response.data)
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
                    assessmentQuestions 
                    ? 
                    <p>No Questions have Been Added Yet</p>
                    :
                    assessmentQuestions.map(assessmentQuestion => {
                        return <div>
                            <p>{assessmentQuestion.recruiter_id}</p>
                            <p>{assessmentQuestion.assessment_name}</p>
                            
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default ViewAssessment;