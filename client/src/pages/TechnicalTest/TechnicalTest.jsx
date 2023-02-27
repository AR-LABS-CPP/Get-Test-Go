import QuestionBox from "../../components/QuestionBox/QuestionBox"

const TechnicalTest = () => {
    const handleOptionChange = (evt) => {
        console.log(evt.target.value)
    }

    return (
        <QuestionBox handleQuestionOptionClick={handleOptionChange} />
    )
}

export default TechnicalTest