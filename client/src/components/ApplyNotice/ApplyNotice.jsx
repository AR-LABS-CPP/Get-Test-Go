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
        <div className="pt-20 flex flex-col gap-y-5 items-center justify-center">
            <div className="flex flex-col gap-y-5 font-medium text-left rounded-md border-[1px] border-gray-300 p-5">
                <p className="text-center text-3xl font-bold text-red-500">CAUTION!</p>
                <p className="border-[1px] px-2 border-gray-500 py-2">Once started, please donot stop in the middle</p>
                <p className="border-[1px] px-2 border-gray-500 py-2">Once started, please donot refresh the page</p>
                <p className="border-[1px] px-2 border-gray-500 py-2">Once started, please donot log out during assessments</p>
                <p className="border-[1px] px-2 border-gray-500 py-2">Submit your question before time, the system will move to the next question when time is finished</p>
                <p className="border-[1px] px-2 border-gray-500 py-2">Read the question carefully and then answer</p>
                <p className="border-[1px] px-2 border-gray-500 py-2">IQ and EQ test are only taken once so if have done it before, the system will not let you do it again</p>
            </div>
            <p className="text-4xl">Are you sure you want to proceed?</p>
            <div className="flex gap-x-2 pt-5">
                <button onClick={() => setAnswer("YES")} className="bg-blue-600 text-white px-10 py-2 rounded-md hover:bg-blue-500">Yes</button>
                <button onClick={() => setAnswer("NO")} className="bg-blue-600 text-white px-10 py-2 rounded-md hover:bg-blue-500">No</button>
            </div>
        </div>
    )
}

export default ApplyNotice