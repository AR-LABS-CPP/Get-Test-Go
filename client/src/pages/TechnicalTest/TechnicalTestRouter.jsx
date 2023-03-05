// import axios from "axios"
// import { useEffect, useState } from "react"
// import { useLocation, useNavigate } from "react-router-dom"
// import TechnicalTest from "./TechnicalTest"

// const TechnicalTestRouter = () => {
//     const { state } = useLocation()

//     const [assessments, setAssessments] = useState([])
//     const [activeAssessment, setActiveAssessment] = useState(0)

//     useEffect(() => {
//         axios.post("http://localhost:4321/job/assessments/questions", {
//             recruiterEmail: state.recruiterEmail,
//             jobName: state.jobName
//         }).then(response => {
//             setAssessments(response.data)

//             if(localStorage.getItem("CANDIDATE_ANSWERS")) {
//                 localStorage.removeItem("CANDIDATE_ANSWERS")
//             }

//             if (localStorage.getItem("CANDIDATE_TECHNICAL_TESTS_ANSWERS")) {
//                 localStorage.removeItem("CANDIDATE_TECHNICAL_TESTS_ANSWERS")
//             }
//         }).catch(error => {
//             console.log(error)
//         })
//     }, [])

//     const getCandidateEmail = () => {
//         return jwt.decode(localStorage.getItem("token"))
//             && jwt.decode(localStorage.getItem("token")).email
//     }

//     const handleNextAssessment = () => {
//         if (activeAssessment === (assessments.length - 1)) {
//             if (localStorage.getItem("CANDIDATE_TECHNICAL_TESTS_ANSWERS")) {
//                 axios.post("http://localhost:4321/assessment/technical/calculate_score", {
//                     recruiterEmail: state.recruiterEmail,
//                     candidateAnswers: JSON.parse(localStorage.getItem("CANDIDATE_TECHNICAL_TESTS_ANSWERS"))
//                 }).then(response => {
//                     console.log(response)
//                 }).catch(error => {
//                     console.log(error)
//                 })
//             }
//             else {
//                 console.log("CANDIDATE ASSESSMENTS SOMEHOW GOT DELETED!")
//             }
//         }
//         else {
//             setActiveAssessment((prevValue) => prevValue + 1)
//         }
//     }

//     const storeAnswers = (assessmentName, answers) => {
//         if (localStorage.getItem("CANDIDATE_TECHNICAL_TESTS_ANSWERS")) {
//             let previousTestsAnswers = JSON.parse(localStorage.getItem("CANDIDATE_TECHNICAL_TESTS_ANSWERS"))

//             previousTestsAnswers.push([assessmentName, answers])

//             localStorage.setItem("CANDIDATE_TECHNICAL_TESTS_ANSWERS", JSON.stringify(previousTestsAnswers))
//         }
//         else {
//             let testAnswers = []
//             testAnswers.push([assessmentName, answers])

//             localStorage.setItem("CANDIDATE_TECHNICAL_TESTS_ANSWERS", JSON.stringify(testAnswers))
//         }
//     }

//     return (
//         assessments.length > 0 && assessments.map((assessment, idx) => {
//             return (
//                 <TechnicalTest
//                     key={assessment + idx}
//                     questions={assessment}
//                     visible={idx === activeAssessment}
//                     assessmentName={assessment[0].assessment_name}
//                     totalQuestions={assessment.length}
//                     setActiveAssessmentCB={handleNextAssessment}
//                     storeAnswersCB={storeAnswers}
//                 />
//             )
//         })
//     )
// }

// export default TechnicalTestRouter

import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import TechnicalTest from "./TechnicalTest"

const TechnicalTestRouter = () => {
    const { state } = useLocation()

    const [assessments, setAssessments] = useState([])
    const [activeAssessment, setActiveAssessment] = useState(0)

    const candidateTechnicalTestsAnswers = useRef([])

    useEffect(() => {
        axios.post("http://localhost:4321/job/assessments/questions", {
            recruiterEmail: state.recruiterEmail,
            jobName: state.jobName
        }).then(response => {
            setAssessments(response.data)

            candidateTechnicalTestsAnswers.current = []

        }).catch(error => {
            console.log(error)
        })
    }, [])

    const getCandidateEmail = () => {
        return jwt.decode(localStorage.getItem("token"))
            && jwt.decode(localStorage.getItem("token")).email
    }

    const handleNextAssessment = () => {
        if (activeAssessment === (assessments.length - 1)) {
            if (candidateTechnicalTestsAnswers.current.length > 0) {
                axios.post("http://localhost:4321/assessment/technical/calculate_score", {
                    recruiterEmail: state.recruiterEmail,
                    candidateAnswers: candidateTechnicalTestsAnswers.current
                }).then(response => {
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })
            }
            else {
                console.log("CANDIDATE ASSESSMENTS SOMEHOW GOT DELETED!")
            }
        }
        else {
            setActiveAssessment((prevValue) => prevValue + 1)
        }
    }

    const storeAnswers = (assessmentName, answers) => {
        candidateTechnicalTestsAnswers.current.push([assessmentName, answers])
    }

    return (
        assessments.length > 0 && assessments.map((assessment, idx) => {
            return (
                <TechnicalTest
                    key={assessment + idx}
                    questions={assessment}
                    visible={idx === activeAssessment}
                    assessmentName={assessment[0].assessment_name}
                    totalQuestions={assessment.length}
                    setActiveAssessmentCB={handleNextAssessment}
                    storeAnswersCB={storeAnswers}
                />
            )
        })
    )
}

export default TechnicalTestRouter