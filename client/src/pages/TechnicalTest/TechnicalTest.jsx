import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const TechnicalTest = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const candidateAnswers = useRef([])
  const [error, setError] = useState("")
  const [assessments, setAssessments] = useState([])
  const [secondsLeft, setSecondsLeft] = useState(10)
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [activeAssessment, setActiveAssessment] = useState(0)
  const [activeQuestionOption, setActiveQuestionOption] = useState("NULL")
  const [activeAssessmentAnswers, setActiveAssessmentAnswers] = useState([])

  useEffect(() => {
    axios.post("http://localhost:4321/job/assessments/questions", {
      recruiterEmail: state.recruiterEmail,
      jobName: state.jobName
    }).then(response => {
      setAssessments(response.data)

      if (localStorage.getItem("CANDIDATE_TECHNICAL_TESTS_ANSWERS")) {
        localStorage.removeItem("CANDIDATE_TECHNICAL_TESTS_ANSWERS")
      }

      candidateAnswers.current = []

      console.log(response.data)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    setSecondsLeft(10)
    setError("")
    setActiveQuestionOption("NULL")

    let intervalId = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [activeQuestion, activeAssessment])

  useEffect(() => {
    if (secondsLeft === 0) {
      handleTimeFinished()
    }
  }, [secondsLeft])

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  const setOption = (evt) => {
    setActiveQuestionOption(evt.target.value)
  }

  const handleNextQuestion = () => {
    // This is the last question of the last assessment
    if (activeAssessment === (assessments.length - 1) && activeQuestion === (assessments[activeAssessment].length - 1)) {
      if (activeQuestionOption === "NULL") {
        setError("Please select an option")
      }
      else {
        let prevAnswers = activeAssessmentAnswers
        prevAnswers.push(activeQuestionOption)
        setActiveAssessmentAnswers(prevAnswers)

        candidateAnswers.current.push([assessments[activeAssessment][0].assessment_name, activeAssessmentAnswers])
        navigate("/candidate-main-page")
      }
    }
    else if (activeQuestion === assessments[activeAssessment].length - 1) {
      if (activeQuestionOption === "NULL") {
        setError("Please select an option")
      }
      else {
        let prevAnswers = activeAssessmentAnswers
        prevAnswers.push(activeQuestionOption)
        setActiveAssessmentAnswers(prevAnswers)

        candidateAnswers.current.push([assessments[activeAssessment][0].assessment_name, activeAssessmentAnswers])

        setActiveAssessmentAnswers([])

        setActiveAssessment(val => val + 1)
      }
    }
    else {
      if (activeQuestionOption === "NULL") {
        setError("Please select an option")
      }
      else {
        let prevAnswers = activeAssessmentAnswers
        prevAnswers.push(activeQuestionOption)
        setActiveAssessmentAnswers(prevAnswers)

        setActiveQuestion(val => val + 1)
      }
    }

    console.log(candidateAnswers.current)
  }

  const handleTimeFinished = () => {
    if (activeAssessment === (assessments.length - 1) && activeQuestion === (assessments[activeAssessment].length - 1)) {
      let prevAnswers = activeAssessmentAnswers
      prevAnswers.push(activeQuestionOption)
      
      setActiveAssessmentAnswers(prevAnswers)

      candidateAnswers.current.push([assessments[activeAssessment][0].assessment_name, activeAssessmentAnswers])
      console.log(candidateAnswers.current)
      navigate("/candidate-main-page")
    }
    else if (activeQuestion === assessments[activeAssessment].length - 1) {
      let prevAnswers = activeAssessmentAnswers
      prevAnswers.push(activeQuestionOption)
      
      setActiveAssessmentAnswers(prevAnswers)
      candidateAnswers.current.push([assessments[activeAssessment][0].assessment_name, activeAssessmentAnswers])

      setActiveAssessmentAnswers([])

      setActiveAssessment(val => val + 1)
    }
    else {
      setActiveQuestion(val => val + 1)
    }

    console.log(candidateAnswers.current)
  }

  return (
    assessments.map((assessment, assessmentIndex) => {
      return (
        assessmentIndex === activeAssessment
        &&
        <div>
          {
            assessment.map((q, questionIndex) => {
              return (
                assessmentIndex === activeAssessment && questionIndex === activeQuestion
                &&
                <div>
                  <div>{formatTime(secondsLeft)}</div>
                  <span className="text-red-500 text-sm">{error}</span>
                  <div className="m-5 flex gap-y-4 flex-col border-[1px] rounded-lg shadow-md">
                    <p className="p-5 border-[1px] m-4 rounded-lg text-center">{q.question}</p>
                    <div className="mx-4 flex items-center">
                      <input type="radio" name="questionOption" onClick={setOption} value={q.option_one} />
                      <p className="px-3 py-2 ml-2 border-[1px] w-full rounded-md shadow-md">{q.option_one}</p>
                    </div>
                    <div className="mx-4 flex items-center">
                      <input type="radio" name="questionOption" onClick={setOption} value={q.option_two} />
                      <p className="px-3 py-2 ml-2 border-[1px] w-full rounded-md shadow-md">{q.option_two}</p>
                    </div>
                    <div className="mx-4 flex items-center">
                      <input type="radio" name="questionOption" onClick={setOption} value={q.option_three} />
                      <p className="px-3 py-2 ml-2 border-[1px] w-full rounded-md shadow-md">{q.option_three}</p>
                    </div>
                    <div className="mx-4 flex items-center">
                      <input type="radio" name="questionOption" onClick={setOption} value={q.option_four} />
                      <p className="px-3 py-2 ml-2 border-[1px] w-full rounded-md shadow-md">{q.option_four}</p>
                    </div>
                    <span className="py-2"></span>
                  </div>

                  <div className="w-full flex justify-center gap-x-3 text-white">
                    <button onClick={handleNextQuestion} className="bg-blue-600 hover:bg-blue-500 px-10 py-2 rounded-md">
                      {questionIndex === assessment.length ? "Finish" : "Next"}
                    </button>
                  </div>
                </div>
              )
            })
          }
        </div>
      )
    })
  )
}

export default TechnicalTest