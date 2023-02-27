import axios from "axios"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import QuestionBox from "../../components/QuestionBox/QuestionBox"

const TechnicalTest = () => {
    const { state } = useLocation()

    useEffect(() => {
        axios.post("http://localhost:4321/job/assessments", {
            recruiterEmail: state.recruiterEmail,
            jobName: state.jobName
        }).then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const handleOptionChange = (evt) => {
        console.log(evt.target.value)
    }

    return (
        <QuestionBox
        visible={true}
        mcq={true}
        truefalse={false}
        question="Test"
        optionOne="1"
        optionTwo="2"
        optionThree="3"
        optionFour="4" 
        handleQuestionOptionClick={handleOptionChange} />
    )
}

export default TechnicalTest