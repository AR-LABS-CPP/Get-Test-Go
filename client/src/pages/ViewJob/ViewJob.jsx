import axios from "axios"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

const ViewJob = () => {
    const { state } = useLocation()

    const [jobDetails, setJobDetails] = useState([])

    useEffect(() => {
        axios.post("http://localhost:4321/job/recruiter/details", {
            jobName: state.jobName,
            recruiterEmail: state.recruiterEmail
        }).then(response => {
            setJobDetails(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        // Continue from here
        <div className="flex flex-col items-center mt-5">
            <div className="w-full px-6">
                <div className="bg-white border-[1px] p-4 flex flex-col">
                    <p className="text-xl font-bold">{state.jobName}</p>
                    <span className="py-1"></span>
                    <p>{jobDetails[0].job_details}</p>
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