import jwt from "jsonwebtoken"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
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

            // let groupedData = {};

            // records.forEach(record => {
            //     const { candidate_email, recruiter_email, job_name, assessment_name, score } = record;

            //     if (!groupedData[job_name]) {
            //         groupedData[job_name] = {};
            //     }

            //     if (!groupedData[job_name][assessment_name]) {
            //         groupedData[job_name][assessment_name] = {};
            //         groupedData[job_name][assessment_name]['total_score'] = score;
            //         groupedData[job_name][assessment_name]['count'] = 1;
            //     } else {
            //         groupedData[job_name][assessment_name]['total_score'] += score;
            //         groupedData[job_name][assessment_name]['count']++;
            //     }
            // });

            // for (let job in groupedData) {
            //     console.log(`Job: ${job}`);
            //     for (let assessment in groupedData[job]) {
            //         const { total_score, count } = groupedData[job][assessment];
            //         console.log(`Assessment: ${assessment}`);
            //         console.log(`Total Score: ${total_score}`);
            //         console.log(`Average Score: ${total_score / count}`);
            //     }
            // }

            setCandidates(groupedData)

            console.log(groupedData)

        }).catch(error => {
            console.log(error)
            toast.error("Unable to fetch candidates")
        })
    }, [])

    return (
        <div>
            {
                Object.entries(candidates).map(([jobName, data]) => {
                    return <CustomAccordin title={jobName}>
                        {
                            <div className="shadow-md m-3 border-[1px] rounded-md">
                                {
                                    Object.entries(data).map(([candidateEmail, assessments]) => {
                                        return (
                                            <div>
                                                <p className="rounded-tr-md rounded-tl-md bg-blue-500 text-white text-center text-xl py-2">{candidateEmail}</p>

                                                {
                                                    Object.entries(assessments).map(([assessmentName, score]) => {
                                                        return (
                                                            <div className="border-[1px] m-4 flex items-center text-center">
                                                                <p className="flex-1 bg-blue-500 text-white py-3">{assessmentName}</p>
                                                                <p className="flex-1 text-xl font-medium">{score}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
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
    );
}

export default Recruit