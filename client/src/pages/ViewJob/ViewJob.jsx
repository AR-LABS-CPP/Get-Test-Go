import axios from "axios"
import jwt from "jsonwebtoken"
import { useState, useEffect } from "react"
import { toast, Toaster } from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"

const ViewJob = () => {
    const navigate = useNavigate()
    const { state } = useLocation()

    const [jobDetails, setJobDetails] = useState([])
    const [jobDesc, setJobDesc] = useState("")
    const [recruiterEmail, setRecruiterEmail] = useState("")

    const getUserType = () => {
        return localStorage.getItem("token") && jwt.decode(localStorage.getItem("token")).userType
    }

    const handleViewAssessmentDetails = (assessment_name) => {
        if(getUserType() == 'RECRUITER') {
            navigate("/view-assessment", {
                state: {
                    assessmentName: assessment_name,
                    recruiterEmail: jwt.decode(localStorage.getItem("token")).email
                }
            })
        }
    }

    useEffect(() => {
        axios.post("http://localhost:4321/job/recruiter/details", {
            jobName: state.jobName,
            recruiterEmail: state.recruiterEmail
        }).then(response => {
            setJobDetails(response.data)

            setJobDesc(response.data[0].job_details)
            setRecruiterEmail(response.data[0].email)
        }).catch(_ => {
            toast.error("Unable to view job details, please try again")
        })
    }, [])

    return (
        <div className="flex flex-col items-center mt-5">
            <Toaster />
            <div className="w-full px-6">
                <div className="bg-white border-[1px] p-4 flex flex-col">
                    <p className="text-3xl font-bold text-center">{state.jobName}</p>

                    <span className="py-2"></span>
                    <div className="w-full flex justify-center">
                        <p className="border-[1px] p-3 rounded-md shadow-md">By: {recruiterEmail}</p>
                    </div>
                </div>

                <p className="mt-10 text-lg font-semibold text-center">Job Details</p>
                <div className="mt-3 mb-6 flex-grow border-t border-gray-500"></div>

                <p>{jobDesc}</p>

                <p className="mt-10 text-lg font-semibold text-center">Required Assessments</p>
                <div className="mt-3 mb-6 flex-grow border-t border-gray-500"></div>

                <div className="flex gap-x-2 justify-center">
                    {
                        jobDetails.map(jobDetail => {
                            return <div key={`${jobDetail.assessment_name} + 1`} className={`border-[1px] min-w-[250px] flex justify-center p-4 rounded-md shadow-md ${getUserType() == 'RECRUITER' ? 'hover:cursor-pointer hover:bg-blue-100' : ''}`} onClick={() => handleViewAssessmentDetails(jobDetail.assessment_name)}>
                                {jobDetail.assessment_name}
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewJob