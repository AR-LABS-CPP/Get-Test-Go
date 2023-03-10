import { useEffect, useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import CustomAccordin from "../../components/CustomAccordin/CustomAccordin"

const Results = () => {
    const [candidateJobs, setCandidateJobs] = useState([])

    useEffect(() => {
        // TODO: fetch the results of candidate for each job
    }, [])

    return (
        <>
            <Toaster />
            <p className="mt-10 text-4xl font-semibold text-center">Your Results</p>
            <div className="flex-grow mx-5  mt-6 border-t border-gray-500"></div>
            <div className="m-5">
                <CustomAccordin title="Question">
                    this line will represent the details.
                </CustomAccordin>
            </div>
        </>
    )
}

export default Results