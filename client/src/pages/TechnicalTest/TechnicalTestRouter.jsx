import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import TechnicalTest from "./TechnicalTest"

const TechnicalTestRouter = () => {
    const { state } = useLocation()

    const [assessments, setAssessments] = useState([])
    const [activeAssessment, setActiveAssessment] = useState(0)

    const handleNextAssessment = () => {
        if(activeAssessment === (assessments.length - 1)) {
            console.log("Show the results please")
        }
        else {
            setActiveAssessment((prevValue) => prevValue + 1)
        }
    }

    useEffect(() => {
        axios.post("http://localhost:4321/job/assessments/questions", {
            recruiterEmail: state.recruiterEmail,
            jobName: state.jobName
        }).then(response => {
            setAssessments(response.data)

            console.log(response.data)

            if(localStorage.getItem("CANDIDATE_ANSWERS")) {
                localStorage.removeItem("CANDIDATE_ANSWERS")
            }
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        assessments.map((assessment, idx) => {
            return <TechnicalTest
            key={assessment + idx}
            questions={assessment} 
            visible={idx === activeAssessment}
            assessmentName={assessment[0].assessment_name} 
            totalQuestions={assessment.length}
            setActiveAssessmentCB={handleNextAssessment} 
            />
        })
    )
}

export default TechnicalTestRouter