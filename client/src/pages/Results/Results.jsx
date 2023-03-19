import jwt from "jsonwebtoken"
import axios from "axios"
import { useEffect, useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import CustomAccordin from "../../components/CustomAccordin/CustomAccordin"

const Results = () => {
    const [candidateIQResults, setCandidateIQResults] = useState([])
    const [candidateEQResults, setCandidateEQResults] = useState([])
    const [candidateTechnicalResults, setCandidateTechnicalResults] = useState([])

    const getCandidateEmail = () => {
        return jwt.decode(localStorage.getItem("token"))
            && jwt.decode(localStorage.getItem("token")).email
    }

    const groupResultsByJobName = (results) => {
        const resultsByJob = {}

        results.forEach(result => {
            const jobName = result.job_name

            if (!resultsByJob[jobName]) {
                resultsByJob[jobName] = []
            }

            resultsByJob[jobName].push(result)
        })

        return resultsByJob
    }

    const getData = async () => {
        try {
            const res = await axios.post("http://localhost:4321/assessment/candidate/scores", {
                candidateEmail: getCandidateEmail()
            })

            setCandidateIQResults(res.data.candidateIqResults[0])
            setCandidateEQResults(res.data.candidateEqResults[0])
            setCandidateTechnicalResults(groupResultsByJobName(res.data.candidateResults))

            console.log(candidateTechnicalResults)
        }
        catch (err) {
            toast.error("Unable to get results")
            console.log(err)
        }
    }

    useEffect(() => {
        getData()

        console.log(candidateTechnicalResults)
    }, [])

    return (
        <>
            <Toaster />
            <p className="mt-10 text-4xl font-semibold text-center">Your Results</p>
            <div className="flex-grow mx-5 mt-6 border-t border-gray-500"></div>
            <div className="mt-10 w-full flex justify-center gap-x-10">
                <div className="border-[1px] flex flex-col items-center shadow-md w-60 h-24 rounded-md">
                    <p className="rounded-tl-md rounded-tr-md text-xl font-medium bg-blue-500 text-white w-full text-center py-1">IQ Score</p>
                    <div className="w-full flex flex-1 items-center">
                        <p className="text-2xl font-medium w-full text-center">{candidateIQResults.score}</p>
                    </div>
                </div>

                <div className="border-[1px] flex flex-col items-center shadow-md w-60 h-24 rounded-md">
                    <p className="rounded-tl-md rounded-tr-md text-xl font-medium bg-blue-500 text-white w-full text-center py-1">EQ Score</p>
                    <div className="w-full flex flex-1 items-center">
                        <p className="text-2xl font-medium w-full text-center">{candidateEQResults.score}</p>
                    </div>
                </div>
            </div>
            <div className="m-5">
                {
                    candidateTechnicalResults
                    &&
                    Object.entries(candidateTechnicalResults).map(([jobName, results]) => {
                        return (
                            <CustomAccordin title={jobName} key={jobName}>
                                {results.map((result, index) => (
                                    <div key={index} className="mt-5 shadow-md w-50 border-[1px]">
                                        <p className="bg-blue-500 text-white text-lg text-center font-medium py-3">{result.assessment_name}</p>
                                        <p className="text-center py-5 text-2xl"><span className="pr-2">Score:</span>{result.score}</p>
                                    </div>
                                ))}
                            </CustomAccordin>
                        )
                    })

                }
            </div>
        </>
    )
}

export default Results