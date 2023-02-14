const express = require("express")
const jobRoute = express.Router()

const jobModel = require("../models/job_model.js")

jobRoute.get("/types", (_, res) => {
    jobModel.getJobTypes().then(response => {
        res.status(200).send(response)
    }).catch(error => {
        res.status(500).send(error)
    })
})

jobRoute.post("/new", (req, res) => {
    jobModel.addNewJob(req.body.jobName, req.body.jobDetails, req.body.jobType).then(_ => {
        for(let idx = 0; idx < req.body.requiredAssessments.length; idx++) {
            console.log(req.body.requiredAssessments[idx])
            jobModel.bindJobAndAssessment(req.body.jobName, req.body.requiredAssessments[idx]).catch(error => {
                console.log(error)
            })
        }

        res.status(200).send('Job created successfully')
    }).catch(error => {
        res.status(500).send(error)
    })
})

module.exports = jobRoute