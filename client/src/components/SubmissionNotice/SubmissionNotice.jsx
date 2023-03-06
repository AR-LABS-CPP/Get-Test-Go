import { useNavigate } from "react-router-dom"

const SubmissionNotice = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-[90vh] flex flex-col justify-center items-center gap-y-5">
                <p className="text-3xl font-semibold">Your answers have been submitted successfully!</p>
                <div className="flex w-[150px] md:w-[150px] lg:w-[150px] justify-center">
                <button onClick={() => navigate("/results")} className="w-full bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white rounded-lg py-2">
                    Results
                </button>
            </div>
        </div>
    )
}

export default SubmissionNotice