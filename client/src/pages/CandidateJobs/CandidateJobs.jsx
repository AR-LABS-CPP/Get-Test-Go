import axios from "axios"
import jwt from "jsonwebtoken"
import { useEffect, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

import JobCard from "../../components/JobCard/JobCard"

const CandidateJobs = () => {
    const navigate = useNavigate()

    const [availableJobs, setAvailableJobs] = useState([])

    const getCandidateEmail = () => {
        return jwt.decode(localStorage.getItem("token"))
            && jwt.decode(localStorage.getItem("token")).email
    }

    const handleViewJobDetails = (job_name, recruiter_email) => {
        navigate("/view-recruiter-job", {
            state: {
                jobName: job_name,
                recruiterEmail: recruiter_email
            }
        })
    }

    const handleApplyForJob = (job_name, recruiter_email) => {
        navigate("/apply-notice", {
            state: {
                jobName: job_name,
                recruiterEmail: recruiter_email,
                candidateEmail: getCandidateEmail()
            }
        })
    }

    // Fetch all the jobs available in the database
    useEffect(() => {
        axios.post("http://localhost:4321/job/all", {
            candidateEmail: getCandidateEmail()
        }).then(response => {
            setAvailableJobs(response.data)
        }).catch(_ => {
            toast.error("Unable to get jobs, please try again")
        })
    }, [])

    return (
        <>
            <Toaster />
            <p className="mt-10 text-4xl font-semibold text-center">Jobs for you</p>
            <div className="flex-grow mx-5  mt-6 border-t border-gray-500"></div>
            <div className="flex flex-col justify-center items-center">
                <div className="container mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 place-items-center gap-3">
                    {
                        availableJobs.length === 0 ? <div className="text-xl font-bold col-span-12">No job(s) available.</div>
                            :
                            availableJobs.map(job => {
                                return <JobCard
                                    key={job.job_name + job.job_type_details}
                                    badgeText={job.job_type_name}
                                    cardTitle={job.job_name}
                                    applyButton={true}
                                    viewClickHandler={() => handleViewJobDetails(job.job_name, job.email)}
                                    applyClickHandler={() => handleApplyForJob(job.job_name, job.email)} />
                            })
                    }
                </div>
            </div>
        </>
    )
}

export default CandidateJobs