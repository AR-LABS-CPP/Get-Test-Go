import jwt from "jsonwebtoken"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import JobCard from "../../components/JobCard/JobCard"

const Jobs = () => {
    const navigate = useNavigate()

    let recruiterEmail = jwt.decode(localStorage.getItem("token")).email

    const [recruiterJobs, setRecruiterJobs] = useState([])

    const handleViewJobDetails = (job_name) => {
        navigate("/view-recruiter-job", {
            state: {
                jobName: job_name,
                recruiterEmail: recruiterEmail
            }
        })
    }

    useEffect(() => {
        axios.post("http://localhost:4321/job/recruiter/jobs", {
            recruiter_email: recruiterEmail
        }).then(response => {
            setRecruiterJobs(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div className="flex flex-col justify-center">
            <div className="flex justify-center">
                <button className="bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white px-20 rounded-lg py-3 mt-10 mb-10" onClick={() => navigate("/create-job")}>
                    Create New Job
                </button>
            </div>

            <div className="container m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 place-items-center gap-3">
                {
                    recruiterJobs.length === 0 ? <div className="text-xl font-bold col-span-12">No Jobs have been created yet.</div>
                        :
                        recruiterJobs.map(recruiterJob => {
                            return <JobCard
                                key={recruiterJob.job_name + recruiterJob.job_details}
                                badgeText={recruiterJob.job_type_name}
                                cardTitle={recruiterJob.job_name}
                                viewClickHandler={() => handleViewJobDetails(recruiterJob.job_name)} />
                        })
                }
            </div>
        </div>
    )
}

export default Jobs