import { useNavigate } from "react-router-dom"

const PostJob = () => {
    const navigate = useNavigate()

    return (
        <div className="flex justify-center">
            <div className="flex justify-center">
                <button className="bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 text-white px-20 rounded-lg py-3 mt-10 mb-10" onClick={() => navigate("/create-job")}>
                    Create New Job
                </button>
            </div>
        </div>
    )
}

export default PostJob