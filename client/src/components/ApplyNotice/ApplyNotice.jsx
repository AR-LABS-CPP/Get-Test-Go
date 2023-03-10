import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const ApplyNotice = (props) => {
    const [answer, setAnswer] = useState("")

    const navigate = useNavigate()
    const { state } = useLocation()

    useEffect(() => {
        if (answer === "YES") {
            navigate('/iq-test', {
                state: {
                    jobName: state.jobName,
                    candidateEmail: state.candidateEmail,
                    recruiterEmail: state.recruiterEmail
                },
                replace: true
            })
        }
        else if (answer === "NO") {
            navigate("/candidate-jobs")
        }
    }, [answer])

    return (
        <div className="pt-20 flex flex-col items-center justify-center">
            <p className="text-4xl">Are you sure you want to proceed?</p>
            <div className="flex gap-x-2 pt-5">
                <button onClick={() => setAnswer("YES")} className="bg-blue-600 text-white px-10 py-2 rounded-md hover:bg-blue-500">Yes</button>
                <button onClick={() => setAnswer("NO")} className="bg-blue-600 text-white px-10 py-2 rounded-md hover:bg-blue-500">No</button>
            </div>
        </div>
    )
}

export default ApplyNotice