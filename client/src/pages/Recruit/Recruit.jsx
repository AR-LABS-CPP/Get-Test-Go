import jwt from "jsonwebtoken"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import CustomAccordin from "../../components/CustomAccordin/CustomAccordin"

const Recruit = () => {
    const [candidates, setCandidates] = useState([])

    useEffect(() => {
        axios.post("http://localhost:4321/job/candidates", {
            recruiterEmail: jwt.decode(localStorage.getItem("token")).email
        }).then(response => {
            let groupedData = {};

            response.data.forEach(record => {
                const { candidate_email, recruiter_email, job_name, assessment_name, score } = record;

                if (!groupedData[job_name]) {
                    groupedData[job_name] = {};
                }

                if (!groupedData[job_name][candidate_email]) {
                    groupedData[job_name][candidate_email] = {};
                }

                if (!groupedData[job_name][candidate_email][assessment_name]) {
                    groupedData[job_name][candidate_email][assessment_name] = score;
                } else {
                    groupedData[job_name][candidate_email][assessment_name] += score;
                }
            });

            setCandidates(groupedData)

            console.log(groupedData)

        }).catch(error => {
            console.log(error)
            toast.error("Unable to fetch candidates")
        })
    }, [])

    const handleSendEmail = (candidateEmail) => {
        const sendEmail = axios.post("http://localhost:4321/mail", {
            candidateEmail: candidateEmail,
            recruiterEmail: jwt.decode(localStorage.getItem("token")).email
        })

        toast.promise(sendEmail, {
            loading: "Sending Email",
            success: "Email sent successfully",
            error: "Error sending email"
        })
    }

    return (
        <>
            <Toaster />
            <div className="mt-10 mx-10">
                {
                    Object.entries(candidates).map(([jobName, data]) => {
                        return <CustomAccordin title={jobName}>
                            {
                                <div className="shadow-md m-3 border-[1px] rounded-md">
                                    {
                                        Object.entries(data).map(([candidateEmail, assessments]) => {
                                            return (
                                                <div className="flex flex-col">
                                                    <p className="rounded-tr-md rounded-tl-md bg-blue-500 text-white text-center text-xl py-2">{candidateEmail}</p>

                                                    {
                                                        Object.entries(assessments).map(([assessmentName, score]) => {
                                                            return (
                                                                <div className="border-[1px] border-gray-400 m-4 flex items-center text-center">
                                                                    <p className="flex-1 py-3 text-lg font-medium border-r-[1px] border-gray-400">{assessmentName}</p>
                                                                    <p className="flex-1 text-xl font-medium">{score}</p>
                                                                </div>
                                                            )
                                                        })
                                                    }

                                                    <div className="flex justify-center">
                                                        <button onClick={() => handleSendEmail(candidateEmail)} className="bg-blue-500 hover:bg-blue-400 py-2 px-10 rounded-md my-5 text-white">Send Email</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </CustomAccordin>
                    })
                }
            </div>

        </>
    );
}

export default Recruit