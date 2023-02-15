import Collapsible from "react-collapsible"

const QuestionBox = (props) => {
    const getQuestionBox = () => {
        if(props.isMCQ) {
            return <div>
                {props.questionText}
                {props.optionOne}
                {props.optionTwo}
                {props.optionThree}
                {props.optionFour}
                {props.correctAnswer}
            </div>
        }
        else {
            return <div>
                {props.questionText}
                {props.correctAnswer}
            </div>
        }
    }

    return (
        <div className="shadow-md mt-4 border-[1px] border-gray-300 py-4 rounded-md">
            {
                getQuestionBox()
            }
        </div>
    )
}

export default QuestionBox