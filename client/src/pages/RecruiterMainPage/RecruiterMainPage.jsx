import axios from "axios"
import jwt from "jsonwebtoken"
import { useEffect, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import AssessmentCard from "../../components/AssessmentCard/AssessmentCard"

import DashboardCard from "../../components/DashboardCard/DashboardCard"
import JobCard from "../../components/JobCard/JobCard"

const RecruiterMainPage = () => {
    const [stats, setStats] = useState([])
    const [recruiterJobs, setRecruiterJobs] = useState([])
    const [recruiterAssessments, setRecruiterAssessments] = useState([])

    const navigate = useNavigate()

    let firstName = ''
    let lastName = ''

    const user = jwt.decode(localStorage.getItem("token"))

    if (user) {
        firstName = user.firstName
        lastName = user.lastName
    }

    const getRecruiterAssessments = () => {
        axios.post("http://localhost:4321/assessment/recruiter/assessments", {
            recruiter_email: user.email
        }).then(response => {
            setRecruiterAssessments(response.data)
        }).catch(_ => {
            toast.error("Unable to get recruiter assessments")
        })
    }

    const getRecruiterJobs = () => {
        axios.post("http://localhost:4321/job/recruiter/jobs", {
            recruiter_email: user.email
        }).then(response => {
            setRecruiterJobs(response.data)
        }).catch(_ => {
            toast.error("Unable to get recruiter jobs")
        })
    }

    const handleViewAssessmentDetails = (assessment_name) => {
        navigate("/view-assessment", {
            state: {
                assessmentName: assessment_name,
                recruiterEmail: user.email
            }
        })
    }

    const handleViewJobDetails = (job_name) => {
        navigate("/view-recruiter-job", {
            state: {
                jobName: job_name,
                recruiterEmail: user.email
            }
        })
    }

    useEffect(() => {
        axios.post("http://localhost:4321/recruiter/stats", {
            recruiterEmail: jwt.decode(localStorage.getItem("token")).email
        }).then(response => {
            setStats(response.data)

            console.log(stats)
        }).catch(error => {
            toast.error("Unable to get recruiter stats")
        })

        getRecruiterAssessments()
        getRecruiterJobs()
    }, [])

    return (
        <>
            <Toaster />
            <div className="pt-6 flex justify-center items-center">
                <p className="text-5xl text-gray-700 font-bold">Welcome {`${firstName} ${lastName}`}</p>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 mx-10">
                {
                    stats.length > 0 
                    &&
                    <DashboardCard title={stats[0].assessmentCount.count} subTitle="Assessment(s) Created" style="bg-orange-400 text-white flex-1" />
                }
                {
                    stats.length > 0
                    &&
                    <DashboardCard title={stats[1].jobCount.count} subTitle="Job(s) Created" style="bg-green-500 text-white col-span-6 flex-1" />
                }
            </div>

            <div className="border-b-[1px] mt-10 mb-5 mx-7 border-gray-400"></div>

            <div className="text-2xl text-center font-medium col-span-12 mb-7">Assessment(s) created by you</div>
            <div className="container m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 place-items-center gap-x-3 gap-y-7">
                {
                    recruiterAssessments.length === 0 ? <div className="text-xl font-bold col-span-12 text-center">You haven't created any assessment(s) yet</div>
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

            <div className="border-b-[1px] mt-10 mb-5 mx-7 border-gray-400"></div>

            <div className="text-2xl text-center font-medium col-span-12 mb-7">Jobs created by you</div>
            <div className="container m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 place-items-center gap-3">
                {
                    recruiterJobs.length === 0 ? <div className="text-xl font-bold col-span-12 text-center">You haven't created any job(s) yet</div>
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

            <div className="border-b-[1px] mt-10 mb-5 mx-7 border-gray-400"></div>

            <div className="flex gap-x-7 justify-center">
                <button className="bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white w-64 rounded-lg py-3 mt-10 mb-10" onClick={() => navigate("/create-job")}>
                    Create New Job
                </button>

                <button className="bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white w-64 rounded-lg py-3 mt-10 mb-10" onClick={() => navigate("/create-job")}>
                    Create New Assessment
                </button>
            </div>
        </>
    )
}

export default RecruiterMainPage