const express = require("express")
const assessmentsRouter = express.Router()

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
    assessmentModel.assessmentQuestionExists(req.body.assessmentName, req.body.assessmentQuestion).then(response => {
        if(response === false) {
            assessmentModel.addTrueFalse(req.body.assessmentName, req.body.assessmentQuestion, req.body.answer).then(response => {
                res.status(200).send(response)
            }).catch(error => {
                res.status(500).send(error)
            })
        }
        else {
            res.status(409).send("Given question already exists in the assessment")
        }
    }).catch(error => {
        res.status(500).send(error)
    })
})

assessmentsRouter.post("/recruiter/assessments", (req, res) => {
    assessmentModel.getRecruiterAssessments(req.body.recruiter_email).then(response => {
        res.status(200).send(response)
    }).catch(error => {
        res.status(500).send(error)
    })
})

module.exports = assessmentsRouter