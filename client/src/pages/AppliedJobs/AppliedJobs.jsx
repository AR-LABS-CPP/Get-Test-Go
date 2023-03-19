import jwt from "jsonwebtoken"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import JobCard from "../../components/JobCard/JobCard"

const AppliedJobs = () => {
    const navigate = useNavigate()

    const [appliedJobs, setAppliedJobs] = useState([])

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

    const getCandidateAppliedJobs = async () => {
        try {
            const res = await axios.post("http://localhost:4321/job/applied", {
                candidateEmail: getCandidateEmail()
            })

            if (res.status === 200) {
                setAppliedJobs(res.data)
            }

        }
        catch (err) {
            toast.error("Unable to get jobs, please try again later")
        }
    }

    useEffect(() => {
        getCandidateAppliedJobs()
    }, [])

    return (
        <>
            <Toaster />
            <p className="mt-10 text-4xl font-semibold text-center">Applied Jobs</p>
            <div className="flex-grow mx-5  mt-6 border-t border-gray-500"></div>
            <div className="flex flex-col justify-center items-center">
                <div className="container mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 place-items-center gap-3">
                    {
                        appliedJobs.length === 0 ? <div className="text-xl font-bold col-span-12">You haven't applied for any job yet.</div>
                            :
                            appliedJobs.map(job => {
                                return <JobCard
                                    key={job.job_name + job.job_type_details}
                                    badgeText={job.job_type_name}
                                    cardTitle={job.job_name}
                                    viewClickHandler={() => handleViewJobDetails(job.job_name, job.email)} />
                            })
                    }
                </div>
            </div>
        </>
    )
}

export default AppliedJobs