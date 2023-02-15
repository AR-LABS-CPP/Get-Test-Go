import { useLocation } from "react-router-dom";

const ViewAssessment = (props) => {
    const { state } = useLocation()

    return (
        <div className="flex flex-col items-center mt-5">
            <div className="w-full px-6">
                <div className="bg-white border-[1px] border-gray-300 shadow-lg rounded-md text-4xl font-semibold py-8 text-center">
                    {state.assessmentName}
                </div>
            </div>
        </div>
    )
}

export default ViewAssessment;