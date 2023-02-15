import { useLocation } from "react-router-dom";
import QuestionBox from "../../components/QuestionBox/QuestionBox";

const ViewAssessment = (props) => {
    const { state } = useLocation()

    return (
        <div className="flex flex-col items-center mt-5">
            <div className="w-full px-6">
                <div className="bg-white border-[1px] border-gray-300 shadow-md rounded-md text-4xl font-semibold py-8 text-center">
                    {state.assessmentName}
                </div>

                <QuestionBox isMCQ={true} />
            </div>
        </div>
    )
}

export default ViewAssessment;