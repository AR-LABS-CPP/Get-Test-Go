import axios from "axios"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

const ViewJob = () => {
    const { state } = useLocation()

    const [jobDetails, setJobDetails] = useState([])
    const [jobDesc, setJobDesc] = useState("")
    const [recruiterEmail, setRecruiterEmail] = useState("")

    useEffect(() => {
        axios.post("http://localhost:4321/job/recruiter/details", {
            jobName: state.jobName,
            recruiterEmail: state.recruiterEmail
        }).then(response => {
            setJobDetails(response.data)

            setJobDesc(jobDetails[0].job_details)
            setRecruiterEmail(jobDetails[0].email)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div className="flex flex-col items-center mt-5">
            <div className="w-full px-6">
                <div className="bg-white border-[1px] p-4 flex flex-col">
                    <p className="text-xl font-bold">{state.jobName}</p>
                    <span className="py-1"></span>
                    <p>{jobDesc}</p>

                    <span className="py-2"></span>
                    <div className="w-full flex justify-center">
                        <p className="border-[1px] p-3 rounded-md shadow-md">{recruiterEmail}</p>
                    </div>
                </div>

                <p className="mt-10 text-lg font-semibold text-center">Required Assessments</p>
                <div class="mt-3 mb-6 flex-grow border-t border-gray-500"></div>

                <div className="flex gap-x-2 ">
                    {
                        jobDetails.map(jobDetail => {
                            return <div className="border-[1px] p-4 rounded-md shadow-md">
                                {jobDetail.assessment_name}
                            </div>
                        })
                    }
                </div>

                <pre>
                    {
                        JSON.stringify(jobDetails)
                    }
                </pre>
            </div>
        </div>
    )
}

export default ViewJob