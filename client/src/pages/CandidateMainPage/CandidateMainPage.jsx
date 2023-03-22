import jwt from "jsonwebtoken"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DashboardCard from "../../components/DashboardCard/DashboardCard"
import JobCard from "../../components/JobCard/JobCard"
import { toast, Toaster } from "react-hot-toast"

const CandidateMainPage = () => {
    const navigate = useNavigate()

    const [appliedJobs, setAppliedJobs] = useState([])
    const [jobCount, setJobCount] = useState("")
    const [candidateIQResults, setCandidateIQResults] = useState("No score")
    const [candidateEQResults, setCandidateEQResults] = useState("No score")

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

    const getData = async () => {
        try {
            const res = await axios.post("http://localhost:4321/assessment/candidate/scores", {
                candidateEmail: getCandidateEmail()
            })

            setCandidateIQResults(res.data.candidateIqResults[0])
            setCandidateEQResults(res.data.candidateEqResults[0])
        }
        catch (_) {
            toast.error("Unable to get results")
            console.log(err)
        }
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
        getData()
        getCandidateAppliedJobs()

        axios.get("http://localhost:4321/job/count")
            .then(res => setJobCount(res.data.count))
            .catch(err => toast.error("Cannot get job count"))
    }, [])

    return (
        <>
            <Toaster />
            <div className="flex flex-col justify-center items-center pt-10 mx-10">
                <div className="flex w-full gap-x-5">
                    <DashboardCard title={appliedJobs.length} subTitle="Job(s) applied" style="bg-orange-400 text-white" />
                    <DashboardCard title={jobCount} subTitle="Total Job(s) in the system" style="bg-green-500 text-white" />
                </div>

                <div className="flex w-full justify-center gap-x-5 mt-10">
                    <div className="bg-cyan-500 text-white flex divide-x shadow-md border-[1px] border-gray-300 rounded-lg">
                        <p className="text-xl font-medium px-12 py-3">IQ Score</p>
                        <p className="text-xl font-medium px-12 py-3">{candidateIQResults.score}</p>
                    </div>

                    <div className="bg-red-400 text-white flex divide-x shadow-md border-[1px] border-gray-300 rounded-lg">
                        <p className="text-xl font-medium px-12 py-3">EQ Score</p>
                        <p className="text-xl font-medium px-12 py-3">{candidateEQResults.score}</p>
                    </div>
                </div>
            </div>

            <div className="border-b-[1px] mt-10 mb-5 mx-7 border-gray-400"></div>

            <div className="text-2xl text-center font-medium col-span-12 mb-7">Your applied jobs</div>
            <div className="flex flex-col justify-center items-center">
                <div className="container mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 place-items-center gap-3">
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

export default CandidateMainPage