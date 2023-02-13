import useTilg from "tilg"
import axios from "axios"
import jwt from "jsonwebtoken"
import { useNavigate } from "react-router-dom"
import AssessmentCard from "../../components/AssessmentCard/AssessmentCard"
import { useEffect, useState } from "react"

const Assessments = () => {
    useTilg()

    const navigate = useNavigate()

    const [recruiterAssessments, setRecruiterAssessments] = useState([])

    const getRecruiterAssessments = () => {
        const user = jwt.decode(localStorage.getItem("token"))
        let email = null

        if (user) {
            email = user.email
        }

        axios.post("http://localhost:4321/assessment/recruiter/assessments", {
            recruiter_email: email
        }).then(response => {
            setRecruiterAssessments(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getRecruiterAssessments()
    }, [])

    return (
        <>
            <div className="flex justify-center">
                <button className="bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white px-20 rounded-lg py-3 mt-10 mb-10" onClick={() => navigate("/create-assessment")}>
                    Create New Assessment
                </button>
            </div>
            <div className="p-3 grid grid-cols-8 gap-x-3 place-items-center">
                {
                    recruiterAssessments.length === 0 ? <div>No Assessments have been created yet.</div>
                        :
                        recruiterAssessments.map(assessment => {
                            return <AssessmentCard
                                cardTitle={assessment.assessment_name}
                                cardDescription={assessment.assessment_details}
                                additionalStyling="col-span-2"
                                key={assessment.assessment_name} />
                        })
                }
            </div>
        </>
    )
}

export default Assessments