const express = require("express")
const assessmentsRouter = express.Router()

const userModel = require("../models/user_model")
const assessmentModel = require("../models/assessment_model")

assessmentsRouter.get("/type", (_, res) => {
    assessmentModel.getAssessmentTypes().then(response => {
        res.status(200).send(response)
    }).catch(error => {
        res.status(500).send(error)
    })
})

assessmentsRouter.get("/question/types", (_, res) => {
    assessmentModel.getQuestionTypes().then(response => {
        res.status(200).send(response)
    }).catch(error => {
        res.status(500).send(error)
    })
})

assessmentsRouter.post("/new", (req, res) => {
    let assessmentType = req.body.assessmentType === "GENERAL" ? 1 : 2
    
    assessmentModel.recruiterAssessmentExists(req.body.recruiterEmail, req.body.assessmentName).then(response => {
        if(response) {
           res.status(409).send("Assessment with the same name already exists") 
        }
        else {
            assessmentModel.createRecruiterAssessment(
                req.body.recruiterEmail, 
                req.body.assessmentName, 
                req.body.assessmentDetails, 
                assessmentType
            ).then(response => {
                res.status(200).send(response)
            }).catch(error => {
                res.status(500).send(error)
            })
        }
    }).catch(error => {
        res.status(500).send(error)
    })
})

assessmentsRouter.post("/question/add/mcq", (req, res) => {
    assessmentModel.assessmentQuestionExists(req.body.recruiterEmail, req.body.assessmentName, req.body.assessmentQuestion).then(response => {
        if(response) {
            res.status(409).send("Given question already exists in the assessment")
        }
        else {
            assessmentModel.addMCQ(
                req.body.recruiterEmail,
                req.body.assessmentName, 
                req.body.assessmentQuestion, 
                req.body.optionOne, 
                req.body.optionTwo, 
                req.body.optionThree, 
                req.body.optionFour, 
                req.body.correctOption
            ).then(response => {
                res.status(200).send(response)
            }).catch(error => {
                res.status(500).send(error)
            })
        }
    }).catch(error => {
        res.status(500).send(error)
    })
})

assessmentsRouter.post("/question/add/truefalse", (req, res) => {
    assessmentModel.assessmentQuestionExists(req.body.recruiterEmail, req.body.assessmentName, req.body.assessmentQuestion).then(response => {
        if(response) {
            res.status(409).send("Given question already exists in the assessment")
        }
        else {
            assessmentModel.addTrueFalse(
                req.body.recruiterEmail,
                req.body.assessmentName, 
                req.body.assessmentQuestion, 
                req.body.answer
            ).then(response => {
                res.status(200).send(response)
            }).catch(error => {
                res.status(500).send(error)
            })
        }
    }).catch(error => {
        res.status(500).send(error)
    })
})

assessmentsRouter.post("/iq/questions", (req, res) => {
    userModel.emailExists(req.body.candidateEmail).then(_ => {
        assessmentModel.getIQQuestions().then(response => {
            res.status(200).send(response)
        }).catch(error => {
            res.status(500).send(error)
        })
    }).catch(error => {
        res.status(500).send(error)
    })
})

assessmentsRouter.post("/eq/questions", (req, res) => {
    userModel.emailExists(req.body.candidateEmail).then(_ => {
        assessmentModel.getEQQuestions().then(response => {
            res.status(200).send(response)
        }).catch(error => {
            res.status(500).send(error)
        })
    }).catch(error => {
        res.status(500).send(error)
    })
})

assessmentsRouter.post("/technical/questions", (req, res) => {
    userModel.emailExists(req.body.candidateEmail).then(_ => {
        assessmentModel.getTechnicalQuestions(req.body.recruiterEmail, req.body.assessmentName).then(response => {
            res.status(200).send(response)
        }).catch(error => {
            res.status(500).send(error)
        })
    }).catch(error => {
        res.status(500).send(error)
    })
})

assessmentsRouter.post("/iq/calculate_score", (req, res) => {
    assessmentModel.calculateIQScore(req.body.candidateAnswers).then(response => {
        res.status(200).send({score: response})
    }).catch(error => {
        res.status(500).send(error)
    })
})

assessmentsRouter.post("/eq/calculate_score", (req, res) => {
    assessmentModel.calculateEQScore(req.body.candidateAnswers).then(response => {
        res.status(200).send({score: response})
    }).catch(error => {
        res.status(500).send(error)
    })
})

assessmentsRouter.post("/technical/calculate_score", async (req, res) => {
    let technicalAssessmentsScores = []
    let assessments = req.body.candidateAnswers

    for(let i = 0; i < assessments.length; i++) {
        try {
            const assessmentScore = await assessmentModel.calculateTechnicalScore(
                req.body.recruiterEmail, 
                assessments[i][0], // Assessment Name 
                assessments[i][1] // candidate's answers
            )

            technicalAssessmentsScores.push([assessments[i][0], assessmentScore])
        }
        catch(err) {
            res.status(500).send("CANNOT CALCULATE SCORES, PLEASE TRY AGAIN.")
        }
    }

    res.status(200).send(technicalAssessmentsScores)
})

assessmentsRouter.post("/general/calculate_score", async (req, res) => {
    let generalAssessmentsScores = []
    let assessments = req.body.candidateAnswers

    for(let i = 0; i < assessments.length; i++) {
        try {
            const assessmentScore = await assessmentModel.calculateGeneralScore(
                req.body.recruiterEmail, 
                assessments[i][0], // Assessment Name 
                assessments[i][1] // candidate's answers
            )

            generalAssessmentsScores.push([assessments[i][0], assessmentScore])
        }
        catch(err) {
            res.status(500).send("CANNOT CALCULATE SCORES, PLEASE TRY AGAIN.")
        }
    }

    res.status(200).send(generalAssessmentsScores)
})

assessmentsRouter.post("/recruiter/assessments", (req, res) => {
    assessmentModel.getRecruiterAssessments(req.body.recruiter_email).then(response => {
        res.status(200).send(response)
    }).catch(error => {
        res.status(500).send(error)
    })
})

assessmentsRouter.post("/recruiter/questions", (req, res) => {
    let recruiterQuestions = []

    assessmentModel.getRecruiterAssessmentMCQQuestions(
        req.body.recruiterEmail, 
        req.body.assessmentName
    ).then(response => {
        if(response.length > 0) {
            recruiterQuestions.push(response)
        }
        
        assessmentModel.getRecruiterAssessmentTrueFalseQuestions(
            req.body.recruiterEmail,
            req.body.assessmentName
        ).then(response => {
            if(response.length > 0) {
                recruiterQuestions.push(response)
            }
            
            res.status(200).send(recruiterQuestions)
        }).catch(error => {
            res.status(500).send(error)
        })
    }).catch(error => {
        res.status(500).send(error)
    })
})

module.exports = assessmentsRouter