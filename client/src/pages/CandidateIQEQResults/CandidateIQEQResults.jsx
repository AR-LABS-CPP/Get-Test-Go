import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import CustomAccordin from "../../components/CustomAccordin/CustomAccordin"

const CandidateIQEQResults = () => {
    const [IQEQScores, setIQEQScores] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4321/assessment/candidate/iq_eq_scores")
            .then(scores => {
                setIQEQScores(scores.data)

                console.log(IQEQScores)
            }).catch(err => {
                console.log(err)
                toast.error("Unable to get scores")
            })
    }, [])

    return (
        <div className="mt-10 mx-10">
            {
                Object.entries(IQEQScores).map(([name, scores]) => {
                    return (
                        <CustomAccordin title={name}>
                            <div className="flex flex-col gap-y-4">
                                {
                                    scores.map(score => {
                                        return (
                                            <div className="rounded-md text-center flex shadow-md border-[1px] border-gray-300">
                                                <p className="flex-1 bg-blue-500 text-white py-3">{score.assessment_type}</p>
                                                <p className="flex-1 py-3 font-medium">{score.score}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </CustomAccordin>
                    )
                })
            }
        </div>
    )
}

export default CandidateIQEQResults