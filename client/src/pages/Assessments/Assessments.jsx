import axios from "axios"
import jwt from "jsonwebtoken"
import { useNavigate } from "react-router-dom"
import AssessmentCard from "../../components/AssessmentCard/AssessmentCard"
import { useEffect, useState } from "react"

const Assessments = () => {
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

            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    const handleViewAssessmentDetails = (assessment_name) => {
        navigate("/view-assessment", {
            state: {
                assessmentName: assessment_name,
                recruiterEmail: jwt.decode(localStorage.getItem("token")).email
            }
        })
    }

    useEffect(() => {
        getRecruiterAssessments()
    }, [])

    return (
        <>
            <div className="flex flex-col items-center">
                <button className="bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white px-20 rounded-lg py-3 mt-10 mb-10" onClick={() => navigate("/create-assessment")}>
                    Create New Assessment
                </button>
            </div>
            <div className="container m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 place-items-center gap-3">
                {
                    recruiterAssessments.length === 0 ? <div className="text-xl font-bold col-span-12">No Assessments have been created yet.</div>
                        :
                        recruiterAssessments.map(assessment => {
                            return <AssessmentCard
                                cardTitle={assessment.assessment_name}
                                cardDescription={assessment.assessment_details}
                                badgeText={assessment.assessment_type_name}
                                additionalStyling="max-w-xs"
                                viewClickHandler={() => handleViewAssessmentDetails(assessment.assessment_name)}
                                key={assessment.assessment_name} />
                        })
                }
            </div>
        </>
    )
}

export default Assessments