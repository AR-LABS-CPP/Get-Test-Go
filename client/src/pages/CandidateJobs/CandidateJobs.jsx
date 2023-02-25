import { useEffect, useState } from "react"

const CandidateJobs = (props) => {
    const [availableJobs, setAvailableJobs] = useState([])

    // Fetch all the jobs available in the database
    useEffect(() => {
        
    }, [])

    return (
        <div className="flex flex-col justify-center items-center">
            Candidate Job Screen
        </div>
    )
}

export default CandidateJobs